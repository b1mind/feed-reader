import { error, json } from '@sveltejs/kit'
// import { redirect } from '@sveltejs/kit'

import Parser from 'rss-parser'
import ogs from 'open-graph-scraper'

function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str
	return str.substr(0, str.lastIndexOf(separator, maxLen))
}

export async function GET({ url, fetch }) {
	const xmlURL = url.searchParams.get('xml')
	const parser = new Parser()

	//todo testing if fetch can cache the res
	const data = await parser.parseURL(xmlURL)

	let items = []

	for (const item of data.items.slice(0, 15)) {
		const snippet = item.contentSnippet ? shorten(item.contentSnippet, 300) : ''

		const options = { url: item.link }
		const meta = await ogs(options).then((data) => data.result)

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
			ogImage: meta.ogImage ? meta.ogImage[0].url : '',
			published,
			snippet,
		}

		items = [...items, newItem]
	}

	return json(
		{ data, items },
		{
			headers: {
				//note learn more about cache-control
				//stale-while is not supported in safari/opera (fallback needed?)
				'Cache-Control': 's-maxage=60, stale-while-revalidate=100',
			},
		}
	)
}

export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'nice herbal blend' })
}
