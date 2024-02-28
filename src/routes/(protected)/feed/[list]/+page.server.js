import { redirect } from '@sveltejs/kit'
import { getRandomItems } from '$lib/utils/index.js'

// import rdfExt from 'rdf-ext'
import $rdf from 'rdflib'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getStringNoLocale,
	addStringNoLocale,
	createSolidDataset,
	saveSolidDatasetAt,
	createThing,
	buildThing,
	setThing,
	removeThing,
	overwriteFile,
	addUrl,
} from '@inrupt/solid-client'
// import { Blob } from 'buffer'
import { schema, dc, rdf } from 'rdf-namespaces'
//need to figure out if I need both or can just use namespaces
// console.log(dc)
// console.log(XSD)
// console.log(rdf)

export async function load({ parent, fetch, setHeaders }) {
	const feeds = await parent()
	const urls = feeds.rssList.map((obj) => obj.href)
	const randomUrls = getRandomItems(urls, 12)

	const feedStream = Promise.all(
		randomUrls.map((url) =>
			fetch(`/api/feed?xml=${url}&limit=1`).then((response) => response.json()),
		),
	)
		.then((responses) => responses)
		.catch((error) => {
			// Handle any errors
			console.error('Error fetching data:', error)
		})

	const feed = 'some shit'
	return {
		feed,
		feedStream,
	}
}

async function add({ locals, request, params }) {
	const formData = await request.formData()
	const name = formData.get('feed')
	const formUrl = formData.get('url')

	//need util classes for abstraction
	const webId = new URL(locals.user.webId)
	const listUrl = `${webId.origin}/public/feedReader/${params.list}`
	let rssDataSet
	let rssThing

	try {
		const session = await getSessionFromStorage(locals.session.id)
		rssDataSet = await getSolidDataset(listUrl)
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = buildThing(createThing({ name: name }))
			.addUrl(rdf.type, schema.DataFeed)
			.addStringNoLocale(schema.name, name)
			.addUrl(schema.url, formUrl)
			// .addUrl(rdf.type, feedUrl)
			.build()

		rssDataSet = setThing(rssDataSet, rssThing)

		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, {
			fetch: session.fetch,
		})
		//should we return here or let it escape out to the main return?
		//
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message)
		}

		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			//need to create the list name
			console.log(error.message)
		} else {
			//need to throw out error
			console.log(error.message)
		}
	}

	//all is good in the hood return
	// throw redirect(302, url)
}

async function remove({ locals, request, params }) {
	const formData = await request.formData()
	const name = formData.get('name')

	//need util classes for abstraction
	const webId = new URL(locals.user.webId)
	const listUrl = `${webId.origin}/public/feedReader/${params.list}`
	let rssDataSet
	let rssThing

	try {
		const session = await getSessionFromStorage(locals.session.id)
		rssDataSet = await getSolidDataset(listUrl)
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
		rssDataSet = removeThing(rssDataSet, rssThing)

		// rssDataSet = setThing(rssDataSet, rssThing)
		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, {
			fetch: session.fetch,
		})
		//should we return here or let it escape out to the main return?
		console.log('deleted')
	} catch (error) {
		error = error
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			console.log('no Thing to del')
			//need a proper return
		} else {
			//else something ..
		}
	}

	//all is good in the hood return
	throw redirect(302, '/feed/' + params.list)
}

//todo proper edit this is just the request
async function edit({ locals, request, params }) {
	const formData = await request.formData()
	const name = formData.get('name').replace(' ', '%20')
	// const name = formData.get('name').split(' ').join('%20')
	console.log(name)

	//need util classes for abstraction
	const webId = new URL(locals.user.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	let rssDataSet
	let rssThing

	try {
		// const session = await getSessionFromStorage(locals.seshInfo.sessionId)
		rssDataSet = await getSolidDataset(listUrl)
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
		//update Thing
		if (rssThing) {
			console.log(rssThing)
		}

		// rssDataSet = setThing(rssDataSet, rssThing)
		// await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
		//should we return here or let it escape out to the main return?
		//
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			console.log('no Thing to edit')
			//need a proper return
		} else {
		}
	}

	//all is good in the hood return
	throw redirect(302, '/feed/' + params.list)
}

export const actions = { add, remove, edit }
