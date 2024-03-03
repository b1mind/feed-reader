import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
// import { Blob } from 'buffer'
import { schema, dc, rdf } from 'rdf-namespaces'

export async function load({ fetch, locals, params }) {
	let rssList = []
	let rssThing
	let rssDataSet

	const webId = new URL(locals.user.webId)
	let listUrl = `${webId.origin}/public/feedReader/${params.list}`

	try {
		rssDataSet = await getSolidDataset(listUrl)
		let things = getThingAll(rssDataSet)
		things.forEach((thing) => {
			let name = getStringNoLocale(thing, schema.name)
			let href = getUrl(thing, schema.url)
			rssList.push({ name, href })
		})

		// //fixme cleanup: testing new way to save dataset for better rdf to json convertion
		// const listJSON = JSON.stringify(rssList)
		// const blob = new Blob([listJSON], { type: 'application/json' })
		// console.log(blob)
		// const session = await getSessionFromStorage(locals.seshInfo.sessionId)
		// overwriteFile(`${webId}/public/feedReader/testList.json`, blob, {
		// 	fetch: session.fetch,
		// }).catch((err) => console.log(err))
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			return { listName: 'No list by that name' }
		} else {
			console.error(error.message)
		}
	}

	//note just for fun but would like to generate a feed...
	// for (const feed of rssList) {
	// 	const res = await fetch(`/api/feed?xml=${feed.href}&limit=1`)
	// 	const data = await res.json()
	// 	console.log(data)
	// }

	return {
		rssList,
		listName: params.list,
		// error: '',
	}
}
