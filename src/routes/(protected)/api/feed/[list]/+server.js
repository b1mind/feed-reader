import { error, json } from '@sveltejs/kit'

import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
// import { Blob } from 'buffer'
import { schema, dc, rdf } from 'rdf-namespaces'

import {
	flattenItemsIntoObjects,
	compareDates,
	getRandomItems,
} from '$lib/utils'

export async function GET({ fetch, locals, url, params, setHeaders }) {
	let rssList = []
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
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			return { listName: 'No list by that name' }
		} else {
			console.error(error.message)
		}
	}

	const urls = rssList.map((obj) => obj.href)
	const feedLimit = urls.length < 5 ? urls.length : 5
	const randomUrls = getRandomItems(urls, feedLimit)
	const sort = url.searchParams.get('sort')
	const sortMethod = sort === 'newest' ? false : () => Math.random() - 0.5

	const feedStreamPromise = Promise.all(
		randomUrls.map((feedUrl) =>
			fetch(`/api/feed?xml=${feedUrl}&limit=99`).then((response) =>
				response.json(),
			),
		),
	)
		.then((responses) => {
			const sortedStream = flattenItemsIntoObjects(responses).sort(
				sortMethod ? sortMethod : compareDates,
			)
			return sortedStream
		})
		.catch((error) => {
			// Handle any errors
			console.error('Error fetching data:', error)
		})

	setHeaders({
		//note learn more about cache-control
		//stale-while is not supported in safari/opera (fallback needed?)
		// 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=6000',
		'Cache-Control': 'private, max-age=6000',
	})

	return json(await feedStreamPromise)
}
