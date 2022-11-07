import { redirect } from '@sveltejs/kit'
import { safeSpace } from '$lib/utils'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getThingAll,
	getUrl,
	getStringNoLocale,
	createSolidDataset,
	saveSolidDatasetAt,
	createThing,
	buildThing,
	setThing,
	removeThing,
} from '@inrupt/solid-client'

//need to figure out if I need both or can just use namespaces
// import { SCHEMA_INRUPT, XSD } from '@inrupt/vocab-common-rdf'
import { schema, dc, rdf } from 'rdf-namespaces'
// console.log(dc)
// console.log(XSD)
// console.log(rdf)

export async function load({ locals }) {
	if (!locals.session) {
		throw redirect(302, '/')
	}

	let rssList = []
	let rssThing
	let rssDataSet

	// by not getting session to read public its way way faster
	// but right now the hook gets session from cookie every server.js
	// look into using a api /fetch/ from server.fetch()
	// const session = await getSessionFromStorage(locals.session.data.sessionId)
	// const webId = new URL(locals.info.webId)
	const webId = new URL(locals.session.info.webId)
	let listUrl = `${webId.origin}/public/feedReader/rssList.ttl`

	try {
		rssDataSet = await getSolidDataset(listUrl)
		let things = getThingAll(rssDataSet)
		things.forEach((thing) => {
			let name = getStringNoLocale(thing, schema.name)
			let href = getUrl(thing, schema.url)
			// let feedUrl = getUrl(thing, rdf.type)
			rssList = [...rssList, { name, href }]
		})
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			let name = 'RedditKeyboards'
			let href = 'https://www.reddit.com/r/keyboards.rss'
			//should this return an option to create vs just doing it?
			rssDataSet = createSolidDataset()
			const session = await getSessionFromStorage(locals.session.info.sessionId)

			// need to figure out what kinda Thing to make, want a good list for urls/names/params
			// must have created date to check and get newest/oldest order
			rssThing = buildThing(createThing({ name: name }))
				.addUrl(rdf.type, schema.DataFeed)
				.addStringNoLocale(schema.name, name)
				.addUrl(schema.url, href)
				.build()

			rssDataSet = setThing(rssDataSet, rssThing)
			await saveSolidDatasetAt(`${listUrl}`, rssDataSet, {
				fetch: session.fetch,
			})
			rssList = [...rssList, { name, href }]
		} else {
			console.error(error.message)
		}
	}

	return {
		rssList,
		// error: '',
	}
}

async function add({ locals, request, url }) {
	const formData = await request.formData()
	const name = formData.get('feed')
	const formUrl = formData.get('url')

	//need util classes for abstraction
	const webId = new URL(locals.session.info.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	let rssDataSet
	let rssThing

	try {
		rssDataSet = await getSolidDataset(listUrl)
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = buildThing(createThing({ name: name }))
			.addUrl(rdf.type, schema.DataFeed)
			.addStringNoLocale(schema.name, name)
			.addUrl(schema.url, formUrl)
			// .addUrl(rdf.type, feedUrl)
			.build()

		rssDataSet = setThing(rssDataSet, rssThing)
		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: locals.fetch })
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
	throw redirect(302, url)
}

export async function remove({ locals, request }) {
	const formData = await request.formData()
	const name = safeSpace(formData.get('name'))

	//need util classes for abstraction
	const webId = new URL(locals.info.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	let rssDataSet
	let rssThing

	try {
		rssDataSet = await getSolidDataset(listUrl)
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
		rssDataSet = removeThing(rssDataSet, rssThing)

		// rssDataSet = setThing(rssDataSet, rssThing)
		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: locals.fetch })
		//should we return here or let it escape out to the main return?
		console.log('deleted')
	} catch (error) {
		error = error
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			console.log('no Thing to del')
			//need a proper return
		} else {
			throw new Error(
				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
			)
		}
	}

	//all is good in the hood return
	throw redirect(302, '/feed')
}

export async function edit({ locals, request }) {
	const formData = await request.formData()
	const name = formData.get('name').replace(' ', '%20')
	// const name = formData.get('name').split(' ').join('%20')
	console.log(name)

	//need util classes for abstraction
	const webId = new URL(locals.session.info.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
	let rssDataSet
	let rssThing

	try {
		rssDataSet = await getSolidDataset(listUrl, { fetch: locals.session.fetch })
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
		//update Thing
		console.log(rssThing)
		if (rssThing) {
			throw new Error(
				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
			)
		}

		// rssDataSet = setThing(rssDataSet, rssThing)
		// await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
		//should we return here or let it escape out to the main return?
		//
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			console.log('no Thing to del')
			//need a proper return
		} else {
			throw new Error(
				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
			)
			return {
				status: 400,
				body: { error: error },
			}
		}
	}

	//all is good in the hood return
	throw redirect(302, '/feed')
}

export const actions = { add, remove, edit }
