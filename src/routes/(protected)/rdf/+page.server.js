import * as rdflib from 'rdflib'
import solidNamespace from 'solid-namespace'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

const ns = solidNamespace(rdflib)
const store = rdflib.graph()
const fetcher = new rdflib.Fetcher(store)

// not working?
// function list(folder, indent) {
// 	indent = indent || ''
// 	fetcher.load(folder).then(
// 		(res) => {
// 			let files = store.any(folder, ns.ldp('contains'))
// 			console.log(files)
// 			for (const file of files) {
// 				console.log(indent + folder + ' contains ' + file)
// 				if (store.holds(file, ns.rdf('type'), ns.ldp('Container'))) {
// 					list(file, indent + '   ')
// 				}
// 			}
// 		},
// 		(err) => {
// 			console.log('Load failed', err)
// 		}
// 	)
// }

export async function load({ locals }) {
	//fixme auth fetch still takes forever...
	// console.time('rdf getSesh')
	// const session = await getSessionFromStorage(
	// 	locals.session.data?.info.sessionId
	// )
	// console.timeEnd('rdf getSesh')
	// const fetcher = new rdflib.Fetcher(store, { fetch: session.fetch })

	const webId = locals.session.data?.info.webId
	const userUrl = new URL(webId)

	const user = store.sym(`${webId}`)
	const profile = user.doc()
	const publicFolder = store.sym(`${userUrl.origin}/public`)
	const privateFolder = store.sym(`${userUrl.origin}/private`)

	// const res = await fetcher.load(folder)
	// console.log(res)

	let allFriends = []

	fetcher.load(user).then(
		(response) => {
			// let friends = store.each(user, ns.foaf('knows'))
			// let friends = store.statementsMatching(
			let friends = store.each(user, ns.foaf('knows'), undefined)
			for (const friend of friends) {
				console.log(friend.uri)
				// console.log(friend.object.uri)
				allFriends = [...allFriends, friend.uri]
			}
			// for (let i = 0; i < friends.length; i++) {
			// 	friend = friends[i]
			// 	console.log(friend.uri) // the WebID of a friend
			// }

			let name = store.any(user, ns.vcard('fn'))
			console.log(`Loaded ${name || 'nothing'}`)
		},
		(err) => {
			console.log('Load failed ' + err)
		}
	)

	// console.log(rssNode())
	// console.log(ns.ldp())

	const data = 'filler for data'
	return { list: data }
}
