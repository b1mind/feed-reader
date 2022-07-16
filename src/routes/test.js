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
	const myPods = await getPodUrlAll(webId, {
		fetch: session.fetch,
	})

	//have to pass session.fetch to gain access as logged in
	const profileDataSet = await getSolidDataset(`${myPods[0]}profile/card`, {
		fetch: session.fetch,
	})

	const profileThing = getThing(profileDataSet, webId)
	const img = getUrl(profileThing, VCARD.hasPhoto)

	console.log(img)

	// const img = items.forEach((i) =>
	// 	console.log(getUrl(i, RDF.type) === VCARD.hasPhoto)
	// )

	// const img = getUrl(items, VCARD.hasPhoto)
	console.log(session.info.webId)

	return {
		body: {
			img,
		},
	}
}
