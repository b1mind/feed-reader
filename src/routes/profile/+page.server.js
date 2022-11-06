import { redirect } from '@sveltejs/kit'
import {
	getSolidDataset,
	getThing,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

export async function load({ locals, url }) {
	if (!locals.info) {
		throw redirect(302, '/')
	}
	// const session = await getSessionFromStorage(locals.info.sessionId)
	const webId = locals.info.webId
	const profileDataSet = await getSolidDataset(`${webId}`)

	const profileThing = getThing(profileDataSet, webId)
	// where is this name FOAF schema
	// const name = getStringNoLocale(profileThing, FOAF.name)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, VCARD.fn)
	const nick = getStringNoLocale(profileThing, FOAF.nick)
	const note = getStringNoLocale(profileThing, VCARD.note)

	// this is a test of local.session vs sessionCookie

	return {
		user: { img, name, nick, note },
	}
}