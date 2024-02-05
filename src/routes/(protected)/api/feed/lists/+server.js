import { error, json } from '@sveltejs/kit'

import {
	getContainedResourceUrlAll,
	getSolidDataset,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'
// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals }) {
	// do we need to use fetch to get the benifits of catching?
	// session.fetch() is a thing too but would need to getSessionFromStorage
	const { webId, sessionId } = locals.session?.data?.info
	const url = new URL(webId)

	// console.time('profile')
	// const session = await getSessionFromStorage(sessionId)
	// console.log(session)
	// console.timeEnd('profile')

	if (!webId) return json({ message: 'not logged in' })

	const listDataSet = await getSolidDataset(`${url.origin}/public/feedReader`)

	const data = getContainedResourceUrlAll(listDataSet)
	console.log(data)

	return json(data, {
		headers: {
			'Cache-Control': 'maxage=1, stale-while-revalidate=59',
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
