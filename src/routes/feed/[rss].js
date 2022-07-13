import Parser from 'rss-parser'
let parser = new Parser()

export async function get(res) {
	// let feed = await parser.parseURL('https://www.reddit.com/r/spaceporn.rss')
	let feed = await parser.parseURL('https://www.sarasoueidan.com/feed.xml')
	console.dir(feed)
	let items = []

	feed.items.forEach((item) => {
		let newItem = { title: item.title, link: item.link }
		items = [newItem, ...items]
	})

	return {
		body: { title: feed.title, items, res },
	}
}
