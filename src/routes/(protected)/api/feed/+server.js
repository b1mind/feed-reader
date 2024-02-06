import { error, json } from '@sveltejs/kit'

import Parser from 'rss-parser'
import ogs from 'open-graph-scraper'

const cleanUrl = function (link) {
	const url = new URL(link)
	return url.origin + url.pathname
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

export async function GET({ url, setHeaders, fetch }) {
	console.log('fresh GET')
	const xmlURL = url.searchParams.get('xml')
	const parser = new Parser()

	//todo refactor for faster res/mutations
	//order items in the fetch/parser like https://benmyers.dev/blog/eleventy-blogroll/
	const data = await parser
		.parseURL(xmlURL)
		.catch((err) => console.log(err))
		.then((feed) => {
			if (!feed || !feed.items || !feed.items.length) {
				return null
			}

			let orderedItems = [...feed.items].sort(sortByDateDescending).slice(0, 15)
			// orderedItems = orderedItems

			return { feed, items: orderedItems }
		})

	let items = []

	for (const item of data.items) {
		const snippet = item.contentSnippet ? shorten(item.contentSnippet, 300) : ''

		const options = { url: item.link }
		const meta = await ogs(options)
			.catch((err) => {
				console.error(err)
				return null
			})
			.then((data) => {
				if (data) return data.result
			})

		//fixme regex to match data
		// const matchDate = /^((?:\S+\s+){3}\S+)*/g
		// const published = item?.pubDate.match(matchDate)

		const published = new Date(item?.pubDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		let newItem = {
			title: item.title,
			link: item.link,
			categories: item.categories,
			ogImage: meta?.ogImage ? meta.ogImage[0].url : '',
			published,
			snippet,
		}

		items = [...items, newItem]
	}

	setHeaders({
		//note learn more about cache-control
		//stale-while is not supported in safari/opera (fallback needed?)
		'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=6000',
		// 'Cache-Control': 'public, s-maxage=6000, maxage=6000',
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
