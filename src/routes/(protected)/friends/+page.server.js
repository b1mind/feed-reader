import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrlAll,
	getStringNoLocale,
	isContainer,
	addUrl,
} from '@inrupt/solid-client'
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'

export async function load({}) {
	//load lists
	return { test: 'test load' }
}

async function addList({}) {
	//add from list
}

async function addFriend({ locals, request }) {
	const formData = await request.formData()
	const friendWebId = formData.get('friend')

	const webId = locals.user.webId
	const myDataSet = await getSolidDataset(webId)
	let profile = getThing(myDataSet, webId)

	profile = addUrl(profile, FOAF.knows, friendWebId)
	const contacts = getUrlAll(profile, FOAF.knows)
	console.log(contacts)
	//todo actually add to back to pod
}

export const actions = { addFriend }
