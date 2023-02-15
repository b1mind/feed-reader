import { error, json } from '@sveltejs/kit'
// import { redirect } from '@sveltejs/kit'

export async function GET(event) {
	throw error(404, { message: 'no jedi here' })
}

// import { graph, parse } from 'rdflib'
// import { rdf, schema } from 'rdf-namespaces'

export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'nice herbal blend' })
}
