// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getUrl,
	getUrlAll,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

export async function load({ locals, cookies, url, fetch }) {
	// if (!locals.session.data) return {}
	// we can get the session from storage one time for session.info / cookie prob better.
	// const sessionId = locals.seshInfo.sessionId
	// const session = await getSessionFromStorage(sessionId)

	// not working from api?
	// const response = await fetch('/api/profile')
	// const data = await response.json()

	const webId = locals?.user?.webId
	let user

	if (webId) {
		const profileDataSet = await getSolidDataset(`${webId}`)
		const profileThing = getThing(profileDataSet, webId)
		// where is this name FOAF schema
		// const name = getStringNoLocale(profileThing, FOAF.name)
		const img = getUrl(profileThing, VCARD.hasPhoto)
		const name = getStringNoLocale(profileThing, VCARD.fn)
		const nick = getStringNoLocale(profileThing, FOAF.nick)
		const note = getStringNoLocale(profileThing, VCARD.note)
		const knows = getUrlAll(profileThing, FOAF.knows)

		user = { info: { ...locals.user }, name, nick, img, note, knows }
	}

	return {
		user,
	}
}
