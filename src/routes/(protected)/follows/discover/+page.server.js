import {
	getSolidDataset,
	getThing,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	getResourceInfo,
	isRawData,
	getProfileAll,
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

export async function load({ parent, locals, url, setHeaders }) {
	try {
		const parentData = await parent()
		const webId = locals.user.webId
		const followId = `https://${url.searchParams.get('id')}/profile/card#me`
		const contacts = await getFriends(followId)

		// let friends = processFriends(followId).then((friendsWithLists) =>
		// 	console.log(friendsWithLists),
		// )

		const friendPromises = contacts.map(async (contact) => {
			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`

			try {
				const lists = await getResourceInfo(listUrl)
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				// Check if they are also a friend
				const knows = getUrlAll(friendThing, FOAF.knows)

				//fixme Follows but not known
				let follows = knows.includes(webId)
				let known
				if (follows) {
					known = parentData.friends.some(
						(profile) => profile.webId === contact.href,
					)
				}

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
				}
			} catch {
				console.log('failed')
				return null
			}
		})

		const friends = await Promise.all(friendPromises)
		return { friends }
	} catch (error) {
		console.error(error)
		return { friends: [{ nick: 'No friends with rss lists' }] }
	}
}
