import {
	getContainedResourceUrlAll,
	getSolidDataset,
	createSolidDataset,
	buildThing,
	createThing,
	setThing,
	saveSolidDatasetAt,
} from '@inrupt/solid-client'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import { schema, dc, rdf } from 'rdf-namespaces'
import xml2js from 'xml2js'

import { slugify, keepOnlyLetters } from '$lib/utils'
import { sessionStorage } from '$lib/server/auth'

/** @type {import('./$types').PageLoad} */
export async function load({ locals, url, fetch }) {
	const webId = locals.user.webId
	const urlWebId = new URL(webId)
	const xml = url.searchParams.get('xml')
	const res = await fetch(`/api/feed${url.search}`)
	const data = await res.json()
	const title = data.title

	// const sessionId = locals.session.id
	// console.time('profile')
	// const session = await getSessionFromStorage(sessionId)
	// console.log(session)
	// console.timeEnd('profile')

	if (!webId) return json({ message: 'not logged in' })

	try {
		const listDataSet = await getSolidDataset(
			`${urlWebId.origin}/public/feedReader`,
		)

		const lists = getContainedResourceUrlAll(listDataSet)

		return {
			lists,
			xml,
			title,
		}
	} catch {
		return { lists: null }
	}
}

async function addList({ locals, request }) {
	const formData = await request.formData()
	let name = formData.get('feed')
	let href = formData.get('url')
	let listName = slugify(formData.get('listName'))
	const xmlString = formData.get('xmlString')

	const webId = new URL(locals.user.webId)
	let listUrl = `${webId.origin}/public/feedReader/${listName}`
	let rssDataSet = createSolidDataset()

	if (xmlString) {
		let parser = new xml2js.Parser()
		parser.parseString(xmlString, function (err, result) {
			if (err) {
				return console.log(err)
			}

			//todo better check for nested outlines?
			let outlines
			if (result.opml.body[0].outline.length > 1) {
				outlines = result.opml.body[0].outline
			} else {
				outlines = result.opml.body[0].outline[0].outline
			}

			outlines.forEach((outline) => {
				if (outline.$.type === 'rss') {
					//todo solidDataset with things
					//really need to make a helper function for this
					name = outline.$.text
					href = outline.$.xmlUrl
					let feedThing = buildThing(createThing({ name: encodeURI(name) }))
						.addUrl(rdf.type, schema.DataFeed)
						.addStringNoLocale(schema.name, name)
						.addUrl(schema.url, href)
						.build()

					rssDataSet = setThing(rssDataSet, feedThing)

					// console.log('RSS Feed:', {
					// 	url: outline.$.xmlUrl,
					// 	name: encodeURI(outline.$.text),
					// })
				} else {
					console.log('unknown:', outline.$.name)
				}
			})
		})

		const session = await getSessionFromStorage(
			locals.session.id,
			sessionStorage,
		)
		console.log(session)
		await saveSolidDatasetAt(listUrl, rssDataSet, { fetch: session.fetch })
		console.log('success')

		return null
	}

	// const form = formidable({ multiples: true })
	// form.parse(request, (error, fields, files) => {
	// 	if (error) {
	// 		reject(error)
	// 		return
	// 	}
	// 	resolve({ ...fields, ...files })
	// })
	// console.log(form)

	// need to figure out what kinda Thing to make, want a good list for urls/names/params
	// must have created date to check and get newest/oldest order
	let rssThing = buildThing(createThing({ name: encodeURI(name) }))
		.addUrl(rdf.type, schema.DataFeed)
		.addStringNoLocale(schema.name, name)
		.addUrl(schema.url, href)
		.build()

	rssDataSet = setThing(rssDataSet, rssThing)

	const session = await getSessionFromStorage(locals.session.id, sessionStorage)
	await saveSolidDatasetAt(`${listUrl}`, rssDataSet, {
		fetch: session.fetch,
	})
}

export const actions = { addList }
