// import { graph, parse } from 'rdflib'
// import { rdf, schema } from 'rdf-namespaces'
// import { json } from '@sveltejs/kit'

//todo test getting pod data with endpoint / RDF converter
export async function GET(event) {
	const webId = new URL(event.locals.seshInfo.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	const rdfData = await event.fetch(listUrl)
	const data = await rdfData.text()
	console.log(data)

	// return json(data)
	return new Response(data)
}

// export async function POST(event) {
// 	console.log('default POST')
// }
