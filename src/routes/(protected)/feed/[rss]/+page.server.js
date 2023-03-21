// const isValidImageUrl = (url) => {
// 	if ((!url && typeof url !== 'string') || url.length === 0) return

// 	const allowedExtensions = /\.(jpe?g|png|gif)$/i
// 	if (url.match(allowedExtensions)) return true
// }

function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str
	return str.substr(0, str.lastIndexOf(separator, maxLen))
}

export async function load({ url, fetch }) {
	// const xmlURL = url.searchParams.get('xml')
	const res = await fetch(`/api/feed${url.search}`)
	const rss = await res.json()
	// console.log(rss.items[0])

	let items = []

	for (const item of rss.items.slice(0, 15)) {
		const snippet = item.contentSnippet ? shorten(item.contentSnippet, 300) : ''
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
			published,
			snippet,
		}

		// // would love to grab an img each item or least the list
		// const imgElement = /src\s*=\s*"(.+?)"/g
		// if (!item?.content?.includes('img')) return
		// let imgs = item.content.match(imgElement)
		// imgs = imgs.filter((img) => {
		// 	if (!isValidImageUrl(img)) {
		// 		return img
		// 	}
		// })
		// console.log(imgs[0])
		// // let img = imgs[0].replace('src=', '').replaceAll('"', '')
		// // newItem = { ...newItem, img: img }

		items = [...items, newItem]
	}

	// 		const published = new Date(item?.pubDate).toLocaleDateString('en-US', {
	// 			year: 'numeric',
	// 			month: 'long',
	// 			day: 'numeric',
	// 		})

	// console.log(dataJSON)
	return {
		rss: { title: rss.title, description: rss.description, items },
	}
}
