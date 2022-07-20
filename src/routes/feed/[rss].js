import Parser from 'rss-parser'
// import txml from 'txml'

let parser = new Parser()

// const isValidImageUrl = (url) => {
// 	if ((!url && typeof url !== 'string') || url.length === 0) return

// 	const allowedExtensions = /\.(jpe?g|png|gif)$/i
// 	if (url.match(allowedExtensions)) return true
// }

export async function GET({ url, params }) {
	const xmlUrl = url.searchParams.has('xml')
		? url.searchParams.get('xml')
		: false

	// txml wants a string of xml only ...
	// let feed = await txml.toContentString(txml.parse(xmlUrl))
	//
	const feed = await parser.parseURL(xmlUrl)
	let items = []

	feed.items.forEach((item) => {
		let newItem = { title: item.title, link: item.link }

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

	return {
		body: { title: feed.title, items },
	}
}
