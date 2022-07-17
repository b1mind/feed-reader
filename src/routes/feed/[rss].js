import Parser from 'rss-parser'
// import txml from 'txml'

let parser = new Parser()

export async function GET({ url, params }) {
	let xmlUrl = url.searchParams.has('xml') ? url.searchParams.get('xml') : false

	// txml wants a string of xml only ...
	// let feed = await txml.toContentString(txml.parse(xmlUrl))
	let feed = await parser.parseURL(xmlUrl)
	let items = []

	feed.items.forEach((item) => {
		let newItem = { title: item.title, link: item.link }
		items = [...items, newItem]
	})

	return {
		body: { title: feed.title, items },
	}
}
