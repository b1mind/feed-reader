import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getStringNoLocale,
	getUrlAll,
	getUrl,
	addUrl,
	setThing,
	saveSolidDatasetAt,
	getContainedResourceUrlAll,
} from '@inrupt/solid-client'
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema, dc, rdf } from 'rdf-namespaces'

import { sessionStorage } from '$lib/server/auth'

export async function load({ parent }) {
	// const parentData = await parent()
	// const friendLists = await parentData.friends
	// let rssLists = []
	// try {
	// 	const listsPromise = friendLists.map(async (friend) => {
	// 		friend = new URL(friend.webId)
	// 		let listUrl = `${friend.origin}/public/feedReader/`
	// 		const friendListDataSet = await getSolidDataset(listUrl)
	// 		const list = getContainedResourceUrlAll(friendListDataSet)
	// 		return list
	// 	})
	// 	rssLists = Promise.all(listsPromise)
	// 	return { rssLists }
	// } catch (err) {
	// 	console.error(err)
	// }
}

async function addFriend({ locals, request }) {
	const session = await getSessionFromStorage(locals.session.id, sessionStorage)
	const formData = await request.formData()
	let friend = formData.get('friend')
	friend = friend.includes('https://') ? friend : `https://${friend}`

	const friendUrl = new URL(friend)

	const friendWebId = `https://${friendUrl.hostname}/profile/card#me`
	console.log(friendWebId)

	const webId = locals.user.webId
	let myDataSet = await getSolidDataset(webId)
	let profile = getThing(myDataSet, webId)

	profile = addUrl(profile, FOAF.knows, friendWebId)
	myDataSet = setThing(myDataSet, profile)

	await saveSolidDatasetAt(`${webId}`, myDataSet, {
		fetch: session.fetch,
	})
}

export const actions = { addFriend }
