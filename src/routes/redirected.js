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

	await session.handleIncomingRedirect(`${url.href}`)

	if (!session.info.isLoggedIn) return console.log('not loggedIn')
	const webId = session.info.webId

	const profileDataSet = await getSolidDataset(`${webId}`, {
		fetch: session.fetch,
	})

	const profileThing = getThing(profileDataSet, webId)
	console.log(profileThing)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, FOAF.name)
	const note = getStringNoLocale(profileThing, VCARD.note)

	// this is a test of local.session vs sessionCookie
	locals.session.user = { ...session.info, img, name, note }

	await locals.session.update(() => ({
		info: { ...session.info, img, name, note },
	}))

	return {
		headers: { Location: '/' },
		status: 302,
	}
}