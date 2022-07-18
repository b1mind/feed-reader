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
	const session = await locals.session.data.solidSession
	// const session = await getSessionFromStorage(locals.session.data.sessionId)

	if (!session.info.isLoggedIn) return console.log('not loggedIn')
	const webId = session.info.webId

	const profileDataSet = await getSolidDataset(`${webId}`, {
		fetch: session.fetch,
	})

	const profileThing = getThing(profileDataSet, webId)
	// where is this name FOAF schema
	// const name = getStringNoLocale(profileThing, FOAF.name)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, VCARD.fn)
	const nick = getStringNoLocale(profileThing, FOAF.nick)
	const note = getStringNoLocale(profileThing, VCARD.note)

	// this is a test of local.session vs sessionCookie

	await locals.session.update(() => ({
		info: { ...session.info, img, name, nick, note },
	}))

	return {
		headers: { Location: '/' },
		status: 302,
	}
}
