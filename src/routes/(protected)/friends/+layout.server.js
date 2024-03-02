import { redirect } from '@sveltejs/kit'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	isContainer,
} from '@inrupt/solid-client'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

export async function load({ locals }) {
	const webId = locals.user.webId

	try {
		const profileDataSet = await getSolidDataset(`${webId}`)
		const profileThing = getThing(profileDataSet, webId)
		const contacts = getUrlAll(profileThing, FOAF.knows)

		const friendPromises = contacts.map(async (contact) => {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`

			// Check if friend has feedReader
			const friendListDataSet = isContainer(listUrl)

			if (friendListDataSet) {
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				const img = getUrl(friendThing, VCARD.hasPhoto)
				const name = getStringNoLocale(friendThing, VCARD.fn)
				const nick = getStringNoLocale(friendThing, FOAF.nick)

				return { img, name, nick, webId: contact.href }
			}
		})

		const friends = Promise.all(friendPromises)

		// 	let rssList = []
		//check if friend has feedReader
		// const friendListDataSet = await getSolidDataset(listUrl)
		// let things = getThingAll(friendListDataSet)
		// things.forEach((thing) => {
		// 	let name = getStringNoLocale(thing, schema.name)
		// 	let href = getUrl(thing, schema.url)
		// 	// let feedUrl = getUrl(thing, rdf.type)
		// 	rssList = [...rssList, { name, href }]
		// })

		return { friends }
	} catch (error) {
		console.error(error)
		return { friends: [{ nick: 'No friends with rss lists' }] }
	}
}
