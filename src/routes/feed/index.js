import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getSolidDataset,
	getThing,
	getUrl,
	getStringNoLocale,
	createSolidDataset,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

let rssList = [
	{ name: '5t3ph Eckles', href: 'https://thinkdobecreate.com/feed' },
	{ name: 'Space Porn', href: 'https://www.reddit.com/r/spaceporn.rss' },
	{ name: 'Sara Soueidan', href: 'https://www.sarasoueidan.com/feed.xml' },
]

export async function GET({ locals, url }) {
	// by not getting session to read public its way way faster
	// const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.session.data.info.webId)

	//is this a better way to fetch data?
	// const testData = await session.fetch(webId)
	// console.log(testData)

	const profileDataSet = await getSolidDataset(`${webId.origin}/public/`, {
		// fetch: session.fetch,
	})

	return {
		body: {
			rssList,
		},
	}
}

export async function POST({ locals }) {
	console.log(locals.session.data.sessionId)
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const webId = new URL(locals.session.data.info.webId)

	console.log(session.info)

	return {
		body: {
			rssList,
		},
	}
}
