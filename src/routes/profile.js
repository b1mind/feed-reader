import {
	getSolidDataset,
	getThing,
	getUrl,
	getUrlAll,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'

export async function GET({ locals }) {
	let friends = []
	const webId = locals.session.data.user.webId

	const profileDataSet = await getSolidDataset(`${webId}`, {})
	const profileThing = getThing(profileDataSet, webId)
	const contacts = getUrlAll(profileThing, FOAF.knows)

	for (const contact of contacts) {
		const friendDataSet = await getSolidDataset(contact)
		const friendThing = getThing(friendDataSet, contact)
		const img = getUrl(friendThing, VCARD.hasPhoto)
		const name = getStringNoLocale(friendThing, VCARD.fn)
		const nick = getStringNoLocale(friendThing, FOAF.nick)

		friends = [...friends, { img, name, nick, webId: contact }]
	}

	console.log(friends)

	return { body: { friends } }
}
