import { invalid, redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getThingAll,
	getSolidDataset,
	getThing,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

export async function load({ locals, url }) {
	const session = await getSessionFromStorage(locals.data.sessionId)

	await session.handleIncomingRedirect(`${url.href}`)

	if (!session.info.isLoggedIn)
		throw new Error(
			'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)'
		)
	const webId = session.info.webId

	const profileDataSet = await getSolidDataset(`${webId}`, {
		fetch: session.fetch,
	})

	const profileThing = getThing(profileDataSet, webId)
	console.log(profileThing)
	// where is this name FOAF schema
	// const name = getStringNoLocale(profileThing, FOAF.name)
	const img = getUrl(profileThing, VCARD.hasPhoto)
	const name = getStringNoLocale(profileThing, VCARD.fn)
	const nick = getStringNoLocale(profileThing, FOAF.nick)
	const note = getStringNoLocale(profileThing, VCARD.note)

	// this is a test of local.session vs sessionCookie

	await locals.session.update(() => ({
		user: { ...session.info, img, name, nick, note },
	}))

	console.log(locals.session)

	throw redirect(302, '/')
}
