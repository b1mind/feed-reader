import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getUrl,
	getStringNoLocale,
	createSolidDataset,
	saveSolidDatasetAt,
	createThing,
	buildThing,
	setThing,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF, SCHEMA_INRUPT } from '@inrupt/vocab-common-rdf'
import { getThingAll } from '@inrupt/solid-client'

export async function GET({ locals, url }) {
	let rssList = [
		{ name: 'Space Porn', href: 'https://www.reddit.com/r/spaceporn.rss' },
		{ name: 'Sara Soueidan', href: 'https://www.sarasoueidan.com/feed.xml' },
		{
			name: 'Test Newsletter',
			href: 'https://kill-the-newsletter.com/feeds/e3etd1qk7rz90re8.xml',
		},
	]

	// by not getting session to read public its way way faster
	// const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.session.data.info.webId)
	let listUrl = `${webId.origin}/public/rssList`

	try {
		const rssDataSet = await getSolidDataset(listUrl)

		let things = getThingAll(rssDataSet)
		things.forEach((thing) => {
			let feedName = getStringNoLocale(thing, SCHEMA_INRUPT.name)
			let feedUrl = getUrl(thing, RDF.type)
			rssList = [{ name: feedName, href: feedUrl }, ...rssList]
		})

		return {
			body: {
				rssList,
			},
		}
	} catch (error) {
		if (typeof error.statusCode === 'number' && error.statusCode === 404) {
			//should this return an option to create vs just doing it?
			rssDataSet = createSolidDataset()
			const session = await getSessionFromStorage(locals.session.data.sessionId)

			// need to figure out what kinda Thing to make, want a good list for urls/names/params
			rssThing = buildThing(createThing({ name: 'RedditKeyboards' }))
				.addStringNoLocale(SCHEMA_INRUPT.name, 'RedditKeyboards')
				.addUrl(RDF.type, 'https://www.reddit.com/r/keyboards.rss')
				.build()

			rssDataSet = setThing(rssDataSet, rssThing)
			saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
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
	const feedName = formData.get('feed')
	const feedUrl = formData.get('url')

	//need util classes for abstraction
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.session.data.info.webId)
	const listUrl = `${webId.origin}/public/rssList`
	let rssDataSet

	try {
		rssDataSet = await getSolidDataset(listUrl, { fetch: session.fetch })
		// let rssThing = getThing(rssDataSet, `${listUrl}#NewList`)
		rssThing = buildThing(createThing({ name: feedName }))
			.addStringNoLocale(SCHEMA_INRUPT.name, feedName)
			.addUrl(RDF.type, feedUrl)
			.build()

		rssDataSet = setThing(rssDataSet, rssThing)
		saveSolidDatasetAt(`${listUrl}`, rssDataSet, { fetch: session.fetch })
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

	return { status: 201 }
}
