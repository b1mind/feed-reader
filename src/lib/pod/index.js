import { getSolidDataset, getThing, getUrlAll } from '@inrupt/solid-client'
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'

export async function getFriends(webId) {
	const profileDataSet = await getSolidDataset(webId)
	const profileThing = getThing(profileDataSet, webId)
	const contacts = getUrlAll(profileThing, FOAF.knows)
	return contacts
}
