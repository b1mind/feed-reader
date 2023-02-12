import { fromRDF } from 'jsonld'
import { rdf } from 'rdf-namespaces'

export async function load({ locals, fetch }) {
	const webId = new URL(locals.seshInfo.webId)
	const response = await fetch(
		`${webId.origin}/public/feedReader/rssList.ttl`,
		{
			//headers:
		}
	)

	const rdfData = response.text()

	// const jsonData = fromRDF(response.text())
	// console.log(await response.text())

	//todo figure out how to retrun json from RDF (might require a better save state to pod)
	return {
		list: rdfData,
	}
}
