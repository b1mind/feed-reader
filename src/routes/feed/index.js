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

export async function GET({ locals, url }) {
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = session.info.webId

	const profileDataSet = await getSolidDataset(`${webId}`, {
		fetch: session.fetch,
	})

	const profileThing = getThing(profileDataSet, webId)
	console.log(profileThing)

	return {
		body: {
			rssList: [
				{ name: 'Space Porn', href: 'https://www.reddit.com/r/spaceporn.rss' },
			],
		},
	}
}
