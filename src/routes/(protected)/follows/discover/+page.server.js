import {
	getSolidDataset,
	getThing,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	getContainedResourceUrlAll,
} from '@inrupt/solid-client'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

import { getFriends } from '$lib/pod/index.js'

// async function checkContainer(webId) {
// 	let contact = new URL(webId)
// 	let listUrl = `${contact.origin}/public/feedReader/`
// 	let hasLists
// 	try {
// 		const container = await getResourceInfo(listUrl)
// 		hasLists = true
// 	} catch (err) {
// 		hasLists = false
// 	}
// 	return hasLists
// }

// async function fetchProfile(webId) {}

// async function processFriends(webId) {
// 	const friends = await getFriends(webId)
// 	const friendsWithLists = []

// 	for (const friendWebId of friends) {
// 		if (await checkContainer(friendWebId)) {
// 			const profile = await getSolidDataset(friendWebId)
// 			friendsWithLists.push(profile)
// 		}
// 	}
// 	return friendsWithLists
// }

export async function load({ locals, url, parent }) {
	const webId = locals.user.webId
	const followId = `https://${url.searchParams.get('id')}/profile/card#me`

	try {
		const contacts = await getFriends(followId)
		// const parentData = await parent()
		// const contacts = parentData.friends.forEach((f) => {
		// 	if (f.webId === followId) {
		// 		return f.knows
		// 	}
		// })

		// let friends = processFriends(followId).then((friendsWithLists) =>
		// 	console.log(friendsWithLists),
		// )

		const friendPromises = contacts.map(async (contact) => {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`
			if (contact.href === webId) return null

			try {
				const listsDataSet = await getSolidDataset(listUrl)
				const lists = getContainedResourceUrlAll(listsDataSet)
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				const knows = getUrlAll(friendThing, FOAF.knows)

				let follows = knows.includes(webId)
				// let known
				// if (follows) {
				// 	const parentData = await parent()
				// 	known = parentData.user.knows.includes(contact.href)
				// 	// known = parentData.friends.some(
				// 	// 	(profile) => profile.webId === contact.href,
				// 	// )
				// }

				const img = getUrl(friendThing, VCARD.hasPhoto)
				const name = getStringNoLocale(friendThing, VCARD.fn)
				const nick = getStringNoLocale(friendThing, FOAF.nick)

				return {
					img,
					name,
					nick,
					webId: contact.href,
					userId: contact.host,
					knows,
					// known,
					follows,
					lists,
				}
			} catch {
				return null //need to do better here
			}
		})

		let friends = await Promise.all(friendPromises)
		friends = friends.filter((f) => f !== null)

		return { friends }
	} catch (error) {
		console.error(error)
		return { friends: [] }
	}
}
