import { redirect } from '@sveltejs/kit'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getProfileAll,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	isContainer,
} from '@inrupt/solid-client'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import { sessionStorage } from '$lib/server/auth'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

import { getFriends } from '$lib/pod/index.js'

export async function load({ locals }) {
	try {
		const webId = locals.user.webId
		const contacts = await getFriends(webId)

		//fixme Auth for fetching contacts from https://b1mind.datapod.igrant.io/contacts/
		// if (contacts.length < 1) {
		// 	const url = new URL(webId)
		// 	const session = await getSessionFromStorage(
		// 		locals.session.id,
		// 		sessionStorage,
		// 	)
		// 	contacts = await getFriends(url.origin + '/contacts/', {
		// 		fetch: session.fetch,
		// 	})
		// 	console.log(contacts)
		// }

		const friendPromises = contacts.map(async (contact) => {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`

			// Check if friend has feedReader
			const friendListDataSet = isContainer(listUrl)

			if (friendListDataSet) {
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				// Check if they are also a friend
				const knows = getUrlAll(friendThing, FOAF.knows)
				const known = knows.includes(webId)

				const img = getUrl(friendThing, VCARD.hasPhoto)
				const name = getStringNoLocale(friendThing, VCARD.fn)
				const nick = getStringNoLocale(friendThing, FOAF.nick)

				return {
					img,
					name,
					nick,
					webId: contact.href,
					userId: contact.host,
					known,
				}
			}
		})

		const friends = Promise.all(friendPromises)

		return { friends }
	} catch (error) {
		console.error(error)
		return { friends: [{ nick: 'No friends with rss lists' }] }
	}
}
