import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getThingAll,
	getSolidDataset,
	getPodUrlAll,
	getThing,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

export async function GET({ locals }) {
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = session.info.webId
	// const myPods = await getPodUrlAll(webId, {
	// 	fetch: session.fetch,
	// })

	//have to pass session.fetch to gain access as logged in
	const profileDataSet = await getSolidDataset(`${webId}`, {
		fetch: session.fetch,
	})
	console.log(profileDataSet)

	const profileThing = getThing(profileDataSet, webId)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, FOAF.name)
	const note = getStringNoLocale(profileThing, VCARD.note)

	return {
		body: {
			img,
			name,
			note,
			// profileThing,
		},
	}
}

export async function POST({ locals }) {
	//do post stuffs here
}
