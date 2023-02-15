import { error, json } from '@sveltejs/kit'

// import { graph, parse } from 'rdflib'
// import { rdf, schema } from 'rdf-namespaces'

//todo test getting pod data with endpoint / RDF converter
export async function GET(event) {
	const webId = new URL(event.locals.seshInfo.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	const rdfData = await event.fetch(listUrl)
	const data = await rdfData.text()

	return json(data)
}

export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'butt' })
}
