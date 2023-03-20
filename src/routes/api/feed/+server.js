import { error, json } from '@sveltejs/kit'
// import { redirect } from '@sveltejs/kit'
import Parser from 'rss-parser'
const options = {}

export async function GET({ url }) {
	const xmlURL = url.searchParams.get('xml')
	const parser = new Parser()

	const data = await parser.parseURL(xmlURL)

	return json(data, {
		headers: {
			//note learn more about cache-control
			//stale-while is not supported in safari/opera (fallback needed?)
			'Cache-Control': 's-maxage=1, stale-while-revalidate=100',
		},
	})
}

// import { graph, parse } from 'rdflib'
// import { rdf, schema } from 'rdf-namespaces'

export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'nice herbal blend' })
}
