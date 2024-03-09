import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getStringNoLocale,
	getUrlAll,
	getContainedResourceUrlAll,
} from '@inrupt/solid-client'

import { FOAF, VCARD } from '@inrupt/vocab-common-rdf'
import { schema } from 'rdf-namespaces'

export async function load({ url, params, parent }) {
	console.log(params.list)
	console.log(await parent())
	let list = url.searchParams.get('id')
	let rssList = []

	try {
		let listUrl = `${list}`
		// let listUrl = `https://${friend}/public/feedReader/${params.friend.list}`

		let rssDataSet = await getSolidDataset(listUrl)
		let things = getThingAll(rssDataSet)
		things.forEach((thing) => {
			let name = getStringNoLocale(thing, schema.name)
			let href = getUrl(thing, schema.url)
			rssList.push({ name, href })
		})

		return { rssList }
	} catch (err) {
		console.error(err)
	}
}
