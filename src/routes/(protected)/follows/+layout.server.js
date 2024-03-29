import {
	getSolidDataset,
	getThing,
	getThingAll,
	getProfileAll,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	getContainedResourceUrlAll,
} from '@inrupt/solid-client'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

import { getFriends } from '$lib/pod/index.js'

export async function load({ locals, parent }) {
	try {
		const webId = locals.user.webId
		const parentData = await parent()

		const contacts = parentData.user.knows
		// const contacts = await getFriends(webId)

		const friendPromises = contacts.map(async (contact) => {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`

			try {
				const listsDataSet = await getSolidDataset(listUrl)
				const lists = getContainedResourceUrlAll(listsDataSet)
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
					lists,
					knows,
				}
			} catch {
				console.log('failed')
				return null
			}
		})

		const friends = Promise.all(friendPromises)

		return { friends }
	} catch (error) {
		console.error(error)
		return { friends: [] }
	}
}
