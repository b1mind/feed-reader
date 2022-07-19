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

export async function GET({ locals }) {
	let rssList = [
		// { name: 'Space Porn', href: 'https://www.reddit.com/r/spaceporn.rss' },
		// { name: 'Sara Soueidan', href: 'https://www.sarasoueidan.com/feed.xml' },
		// {
		// 	name: 'Frontend Horse',
		// 	href: 'https://kill-the-newsletter.com/feeds/5te3foxx135wx2ai.xml',
		// },
	]

	// by not getting session to read public its way way faster
	// const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.session.data.info.webId)
	let listUrl = `${webId.origin}/public/feedReader/rssList`

	try {
		const rssDataSet = await getSolidDataset(listUrl)

		let things = getThingAll(rssDataSet)
		things.forEach((thing) => {
			let name = getStringNoLocale(thing, schema.name)
			let href = getUrl(thing, schema.url)
			// let feedUrl = getUrl(thing, rdf.type)
			rssList = [...rssList, { name, href }]
		})

		//return here or in the end?
		return {
			body: {
				rssList,
			},
		}
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
			saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
			rssList = [...rssList, { name, href }]
		} else {
			console.error(error.message)
		}
	}

	return {
		body: {
			//should we add defaults here if no feeds?
			rssList,
		},
	}
}

export async function POST({ locals, request }) {
	//fix not getting formData... wtf
	const formData = await request.formData()
	const name = formData.get('feed')
	const url = formData.get('url')

	//need util classes for abstraction
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(session.info.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList`
	let rssDataSet

	try {
		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = buildThing(createThing({ name: name }))
			.addUrl(rdf.type, schema.DataFeed)
			.addStringNoLocale(schema.name, name)
			.addUrl(schema.url, url)
			// .addUrl(rdf.type, feedUrl)
			.build()

		rssDataSet = setThing(rssDataSet, rssThing)
		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
		//should we return here or let it escape out to the main return?
		//
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			//need to create the list name
		} else {
			return {
				status: 400,
				body: { error: error.message },
			}
		}
	}

	//all is good in the hood return
	return { status: 201 }
}

export async function DELETE({ locals, request }) {
	const formData = await request.formData()
	const name = formData.get('name')

	//need util classes for abstraction
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(session.info.webId)
	const listUrl = `${webId.origin}/public/feedReader/rssList`
	let rssDataSet

	try {
		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = getThing(rssDataSet, `${listUrl}#${name}`)
		rssDataSet = removeThing(rssDataSet, rssThing)

		// rssDataSet = setThing(rssDataSet, rssThing)
		await saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
		//should we return here or let it escape out to the main return?
		//
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			console.log('no Thing to del')
			//need a proper return
		} else {
			return {
				status: 400,
				body: { error: error.message },
			}
		}
	}

	//all is good in the hood return
	return {
		status: 303,
		headers: { location: '/feed' },
	}
}
