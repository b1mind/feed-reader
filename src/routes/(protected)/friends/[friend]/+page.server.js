import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getUrlAll,
	getContainedResourceUrlAll,
} from '@inrupt/solid-client'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

import { getFriends } from '$lib/pod/index.js'

export async function load({ url, params, parent }) {
	let friend = url.searchParams.get('id')

	try {
		let listUrl = `https://${friend}/public/feedReader/`

		const listDataSet = await getSolidDataset(listUrl)
		const lists = getContainedResourceUrlAll(listDataSet)

		return { lists, friend: params.friend }
	} catch (err) {
		console.error(err)
	}
}
