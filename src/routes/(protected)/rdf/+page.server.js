import * as rdflib from 'rdflib'
import solidNamespace from 'solid-namespace'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

const ns = solidNamespace(rdflib)

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

	const store = rdflib.graph()
	// const fetcher = new rdflib.Fetcher(store, { fetch: session.fetch })
	const fetcher = new rdflib.Fetcher(store)
	const updater = new rdflib.UpdateManager(store)

	const webId = locals.session.data?.info.webId
	const userUrl = new URL(webId)

	const user = store.sym(`${webId}`)
	const profile = user.doc()
	const publicFolder = `${userUrl.origin}/public/`
	const privateFolder = `${userUrl.origin}/private`
	const channel = store.sym(`${publicFolder}socialFeed`)
	const feedFolder = store.sym(`${publicFolder}feedReader/rssList.ttl`)

	const items = [
		{ title: 'Item1', link: 'http://example.com/item1' },
		{ title: 'Item2', link: 'http://example.com/item2' },
		{ title: 'Item3', link: 'http://example.com/item3' },
	]

	// fixme figure out how .add RSS to store proper.
	// store.add(user, ns.rss(), ns.rss('channel'), channel)
	// store.add(ns.rss(), ns.rss('title'), 'Social RSS')
	// store.add(ns.rss(), ns.rss('description'), 'share your feeds!')

	// items.forEach((item, index) => {
	// 	const itemNode = rdflib.sym(`${channel}/item${index + 1}`)
	// 	store.add(channel, ns.rss('items'), itemNode)
	// 	store.add(itemNode, ns.rss('title'), item.title)
	// 	store.add(itemNode, ns.rss('description'), 'first feed')
	// 	store.add(itemNode, ns.rss('data'), new Date().toISOString())
	// 	store.add(itemNode, ns.rss('type'), 'text/html')
	// 	store.add(itemNode, ns.rss('identifier'), item.link)
	// })

	// const del = []
	// updater.update(del, store, (uri, ok, message) => {
	// 	if (ok) console.log('updated ' + uri)
	// 	else console.log(message)
	// })

	// testing creating a container (works, need to figure out how to build in it)
	// const req = await fetcher.createContainer(publicFolder, 'socialFeed')

	//working test of getting feeds (slower than solid libs?)
	// let feeds = []
	// const req = await fetcher.load(feedFolder).then((response) => {
	// 	// console.log(response)
	// 	const socialFeeds = store.each(null, ns.schema('name'))
	// 	for (const feed of socialFeeds) {
	// 		const url = store.any(feed, ns.schema('url'))
	// 		const name = store.any(feed, ns.schema('name'))
	// 		let saveFeed = {
	// 			name: name.value,
	// 			url: url.uri,
	// 		}
	// 		feeds = [...feeds, saveFeed]
	// 	}
	// 	console.log(feeds)
	// 	return response
	// })
	let allFriends = []

	const allFriendsData = await fetcher.load(user).then(
		async (response) => {
			let friends = store.each(user, ns.foaf('knows'), null)
			for (const friend of friends) {
				const friendUrl = new URL(friend.uri)
				const friendsWithFeeds = await fetcher
					.load(`${friendUrl.origin}/public/feedReader`)
					.then(
						async (response) => {
							const hasFeeds = store.each(null, ns.ldp('contains'))
							for (let feed of hasFeeds) {
								console.log(feed.uri)
							}

							allFriends = [...allFriends, friend.uri]
						},
						(err) => {}
					)

				// console.log(friend.object.uri)
			}

			return response
		},
		(err) => {
			console.log('Load failed ' + err)
		}
	)

	// console.log(rssNode())
	// console.log(ns.ldp())

	return { rdf: allFriendsData.responseText, friends: allFriends }
}
