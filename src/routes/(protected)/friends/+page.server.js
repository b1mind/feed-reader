import { redirect } from '@sveltejs/kit'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getUrlAll,
	getStringNoLocale,
	isContainer,
	addUrl,
} from '@inrupt/solid-client'
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

export async function load({ locals }) {
	let friends = []
	const webId = locals.user.webId

	try {
		const profileDataSet = await getSolidDataset(`${webId}`)
		const profileThing = getThing(profileDataSet, webId)
		const contacts = getUrlAll(profileThing, FOAF.knows)

		for (let contact of contacts) {
			let rssList = []

			contact = new URL(contact)
			let listUrl = `${contact.origin}/public/feedReader/`
			//check if friend has feedReader
			// const friendListDataSet = await getSolidDataset(listUrl)
			const friendListDataSet = isContainer(listUrl)
			// let things = getThingAll(friendListDataSet)
			// things.forEach((thing) => {
			// 	let name = getStringNoLocale(thing, schema.name)
			// 	let href = getUrl(thing, schema.url)
			// 	// let feedUrl = getUrl(thing, rdf.type)
			// 	rssList = [...rssList, { name, href }]
			// })

			if (friendListDataSet) {
				const friendUserDataSet = await getSolidDataset(contact.href)
				const friendThing = getThing(friendUserDataSet, contact.href)
				const img = getUrl(friendThing, VCARD.hasPhoto)
				const name = getStringNoLocale(friendThing, VCARD.fn)
				const nick = getStringNoLocale(friendThing, FOAF.nick)

				friends = [
					...friends,
					{ img, name, nick, webId: contact.href, rssList },
				]
			}
		}
	} catch (error) {
		console.error(error)
		return { friends: [{ nick: 'No friends with rss lists' }] }
	}

	return { friends }
}

async function addFriend({ locals, request }) {
	const formData = await request.formData()
	const friendWebId = formData.get('friend')

	const webId = locals.user.webId
	const myDataSet = await getSolidDataset(webId)
	let profile = getThing(myDataSet, webId)

	profile = addUrl(profile, FOAF.knows, friendWebId)
	//todo actually add to back to pod
}

export const actions = { addFriend }
