import Parser from 'rss-parser'

let parser = new Parser()

// const isValidImageUrl = (url) => {
// 	if ((!url && typeof url !== 'string') || url.length === 0) return

// 	const allowedExtensions = /\.(jpe?g|png|gif)$/i
// 	if (url.match(allowedExtensions)) return true
// }
function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str
	return str.substr(0, str.lastIndexOf(separator, maxLen))
}

export async function load({ url, params }) {
	const xmlUrl = url.searchParams.has('xml')
		? url.searchParams.get('xml')
		: false

	//todo XMLparser with options for RSS or better limit and blob options
	const feed = await parser.parseURL(xmlUrl)

	// is there away to check against build and return updated?
	let items = []

	feed.items.forEach((item) => {
		const snippet = item.contentSnippet ? shorten(item.contentSnippet, 250) : ''
		//fixme regex to match data
		// const matchDate = /^((?:\S+\s+){3}\S+)*/g
		// const published = item?.pubDate.match(matchDate)

		// this is so much more readable than regex lol
		const published = item?.pubDate.split(' ').slice(0, 4).join(' ')

		let newItem = {
			title: item.title,
			link: item.link,
			published,
			// .replace('00:00', '')
			// .replace(':', '')
			// .replace('00', '')
			// .replace('GMT', ''),
			snippet,
		}

		// // would love to grab an img each item or least the list
		// const imgElement = /src\s*=\s*"(.+?)"/g
		// if (!item.content.includes('img')) return
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
	})

	return { rss: { title: feed.title, items } }
}
