import Parser from 'rss-parser'
let parser = new Parser()

export async function GET({ url, params }) {
	let xmlUrl = url.searchParams.has('xml') ? url.searchParams.get('xml') : false

	let feed = await parser.parseURL(xmlUrl)
	let items = []

	feed.items.forEach((item) => {
		let newItem = { title: item.title, link: item.link }
		items = [newItem, ...items]
	})

	return {
		body: { title: feed.title, items },
	}
}
