import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getThingAll,
	getSolidDataset,
	getPodUrlAll,
} from '@inrupt/solid-client'

export async function GET({ locals }) {
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	const myPods = await getPodUrlAll(session.info.webId, {
		fetch: session.fetch,
	})
	const profile = await getSolidDataset(`${myPods[0]}profile/card#me`)
	const items = getThingAll(profile)
	console.log(session.info.webId)
	console.log(profile)
	console.dir(items)

	return {
		body: {
			webId: session.info.webId,
		},
	}
}
