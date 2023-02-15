import { error, json } from '@sveltejs/kit'

import {
	getSolidDataset,
	getThing,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

export async function GET({ locals }) {
	// do we need to use fetch to get the benifits of catching?
	// session.fetch() is a thing too but would need to getSessionFromStorage
	const webId = locals?.seshInfo?.webId
	if (!webId) return json({ message: 'not logged in' })

	const profileDataSet = await getSolidDataset(`${webId}`)
	const profileThing = getThing(profileDataSet, webId)
	// where is this name FOAF schema
	// const name = getStringNoLocale(profileThing, FOAF.name)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, VCARD.fn)
	const nick = getStringNoLocale(profileThing, FOAF.nick)
	const note = getStringNoLocale(profileThing, VCARD.note)

	// this is a test of local.session vs sessionCookie

	return json(
		{ user: { img, name, nick, note } },
		{
			headers: {
				'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
			},
		}
	)
}

// import { graph, parse } from 'rdflib'
// import { rdf, schema } from 'rdf-namespaces'

export async function POST(event) {
	console.log('default POST')
	// return json({ message: 'butt' }, 418)
	throw error(418, { message: 'nice herbal blend' })
}
