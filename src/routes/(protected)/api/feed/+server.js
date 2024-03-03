import { error, json } from '@sveltejs/kit'

import Parser from 'rss-parser'
// import ogs from 'open-graph-scraper'

const cleanUrl = function (link, origin) {
	const isUrl = link.includes('http')
	if (isUrl) {
		return link
	} else {
		const newUrl = new URL(origin)
		return newUrl.origin + link
	}
}

function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str
	return str.substr(0, str.lastIndexOf(separator, maxLen))
}

function sortByDateDescending(feedItemA, feedItemB) {
	const itemADate = new Date(feedItemA.isoDate)
	const itemBDate = new Date(feedItemB.isoDate)
	return itemBDate - itemADate
}

export async function GET({ url, setHeaders }) {
	console.log('fresh GET')
	const xmlURL = url.searchParams.get('xml')
	const limit = url.searchParams.get('limit')
	const parser = new Parser()

	//fixme this is insane right?
	// async function getMetaImage(link) {
	// 	const options = { url: link }
	// 	const meta = await ogs(options)
	// 		.catch((err) => {
	// 			console.error(err)
	// 			return null
	// 		})
	// 		.then((data) => {
	// 			if (data) {
	// 				const img = data.result.ogImage ? data.result.ogImage[0].url : ''
	// 				return img
	// 			}
	// 		})
	// 	return meta
	// }

	//order items in the fetch/parser like https://benmyers.dev/blog/eleventy-blogroll/
	const data = await parser
		.parseURL(xmlURL)
		.catch((err) => {
			console.error(err)
			//fixme better err needed
			return { feed: 'none', items: 'none', images: 'none' }
		})
		.then(async (feed) => {
			if (!feed || !feed.items || !feed.items.length) {
				return null
			}

			let orderedItems = [...feed.items]
				.sort(sortByDateDescending)
				.slice(0, limit)

			let media = []
			//todo match alt text for images/media
			let matchImg = /<img[^>]*src="([^"]*)"[^>]*>/i
			// /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/i,

			//todo refactor this ugly shit
			for (let item of orderedItems) {
				if (
					item['content:encoded'] &&
					item['content:encoded'].includes('<img')
				) {
					const imgTag = item['content:encoded'].match(matchImg)
					if (imgTag && imgTag[1]) {
						media.push({
							url: cleanUrl(imgTag[1], xmlURL),
							alt: imgTag[2] || '',
						})
					}
				} else if (item['enclosure']) {
					const video = item['enclosure']
					media.push({ url: video.url, alt: '', type: video.type })
				} else if (item.content) {
					const hasImg = item.content.includes('<img')
					if (hasImg) {
						const imgTag = item.content.match(matchImg)
						if (imgTag) {
							media.push({
								url: cleanUrl(imgTag[1], xmlURL),
								alt: imgTag[2] || '',
							})
						}
					} else {
						media.push({ url: '', alt: '' })
					}
				} else {
					media.push({ url: '', alt: '' })
				}
			}
			//I regret nothing and everthing..

			return { feed, items: orderedItems, media }
		})

	let items = []

	for (const [i, item] of data.items.entries()) {
		const snippet = item.contentSnippet ? shorten(item.contentSnippet, 300) : ''

		const published = new Date(item?.pubDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		let newItem = {
			title: item.title,
			link: item.link,
			categories: item.categories,
			media: data.media[i] || '',
			published,
			snippet,
		}

		items.push(newItem)
	}

	setHeaders({
		//note learn more about cache-control
		//stale-while is not supported in safari/opera (fallback needed?)
		// 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=6000',
		'Cache-Control': 'public, s-maxage=6000, max-age=12000',
	})

	return json({
		title: data.feed.title,
		description: data.feed.description,
		items,
	})
}

//testing error templates
export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'nice herbal blend' })
}
