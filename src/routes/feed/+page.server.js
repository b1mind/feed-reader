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
	if (!locals.info) {
		throw redirect(302, '/')
	}

	let rssList = []
	let rssThing
	let rssDataSet

	// by not getting session to read public its way way faster
	// look into using a api /fetch/ from server.fetch()
	// const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.info.webId)
	console.log(webId)
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
			const session = await getSessionFromStorage(locals.session.data.sessionId)

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

// export async function POST({ locals, request }) {
// 	const formData = await request.formData()
// 	const name = formData.get('feed')
// 	const url = formData.get('url')

// 	//need util classes for abstraction
// 	const session = await getSessionFromStorage(locals.session.data.sessionId)
// 	const webId = new URL(session.info.webId)
// 	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
// 	let rssDataSet
// 	let rssThing

// 	try {
// 		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
// 		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
// 		rssThing = buildThing(createThing({ name: name }))
// 			.addUrl(rdf.type, schema.DataFeed)
// 			.addStringNoLocale(schema.name, name)
// 			.addUrl(schema.url, url)
// 			// .addUrl(rdf.type, feedUrl)
// 			.build()

// 		rssDataSet = setThing(rssDataSet, rssThing)
// 		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
// 		//should we return here or let it escape out to the main return?
// 		//
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			// console.log(error.message)
// 		}

// 		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
// 			//need to create the list name
// 		} else {
// 			throw new Error(
// 				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 			)
// 			return {
// 				status: 400,
// 				body: { error },
// 			}
// 		}
// 	}

// 	//all is good in the hood return
// 	throw new Error(
// 		'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 	)
// 	return {
// 		status: 303,
// 		headers: { location: '/feed' },
// 	}
// }

// export async function DELETE({ locals, request }) {
// 	const formData = await request.formData()
// 	const name = safeSpace(formData.get('name'))

// 	//need util classes for abstraction
// 	const session = await getSessionFromStorage(locals.session.data.sessionId)
// 	const webId = new URL(session.info.webId)
// 	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
// 	let rssDataSet
// 	let rssThing

// 	try {
// 		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
// 		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
// 		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
// 		rssDataSet = removeThing(rssDataSet, rssThing)

// 		// rssDataSet = setThing(rssDataSet, rssThing)
// 		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
// 		//should we return here or let it escape out to the main return?
// 		console.log('deleted')
// 	} catch (error) {
// 		error = error
// 		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
// 			console.log('no Thing to del')
// 			//need a proper return
// 		} else {
// 			throw new Error(
// 				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 			)
// 			return {
// 				status: 400,
// 				body: { error },
// 			}
// 		}
// 	}

// 	//all is good in the hood return
// 	throw new Error(
// 		'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 	)
// 	return {
// 		status: 303,
// 		headers: { location: '/feed' },
// 	}
// }

// export async function PATCH({ locals, request }) {
// 	const formData = await request.formData()
// 	const name = formData.get('name').replace(' ', '%20')
// 	// const name = formData.get('name').split(' ').join('%20')
// 	console.log(name)

// 	//need util classes for abstraction
// 	const session = await getSessionFromStorage(locals.session.data.sessionId)
// 	const webId = new URL(session.info.webId)
// 	const listUrl = `${webId.origin}/public/feedReader/rssList.ttl`
// 	let rssDataSet
// 	let rssThing

// 	try {
// 		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
// 		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
// 		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
// 		//update Thing
// 		console.log(rssThing)
// 		if (rssThing) {
// 			throw new Error(
// 				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 			)
// 			return { status: 200, body: { error: 'Worked but not implemented' } }
// 		}

// 		// rssDataSet = setThing(rssDataSet, rssThing)
// 		// await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
// 		//should we return here or let it escape out to the main return?
// 		//
// 	} catch (error) {
// 		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
// 			console.log('no Thing to del')
// 			//need a proper return
// 		} else {
// 			throw new Error(
// 				'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 			)
// 			return {
// 				status: 400,
// 				body: { error: error },
// 			}
// 		}
// 	}

// 	//all is good in the hood return
// 	throw new Error(
// 		'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
// 	)
// 	return {
// 		status: 303,
// 		headers: { location: '/feed' },
// 	}
// }
