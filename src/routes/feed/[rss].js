import Parser from 'rss-parser'
let parser = new Parser()

export async function get(res) {
	let feed = await parser.parseURL('https://www.reddit.com/r/spaceporn.rss')
	console.dir(feed)
	let body = []

	feed.items.forEach((item) => {
		let newItem = { title: item.title, link: item.link }
		body = [newItem, ...body]
	})

	return {
		body: { body, res },
	}
}
