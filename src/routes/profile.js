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

	try {
		const profileDataSet = await getSolidDataset(`${webId}`)
		const profileThing = getThing(profileDataSet, webId)
		const contacts = getUrlAll(profileThing, FOAF.knows)

		for (let contact of contacts) {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/rssList.ttl`
			//check if friend has feedReader
			const friendListDataSet = await getSolidDataset(listUrl)

			if (friendListDataSet) {
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				const img = getUrl(friendThing, VCARD.hasPhoto)
				const name = getStringNoLocale(friendThing, VCARD.fn)
				const nick = getStringNoLocale(friendThing, FOAF.nick)

				friends = [...friends, { img, name, nick, webId: contact.href }]
			}
		}
	} catch (error) {
		console.error(error)
		return { body: { friends: [{ nick: 'No friends with pods' }] } }
	}

	return { body: { friends } }
}
