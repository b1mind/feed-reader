import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals }) {
	const session = await getSessionFromStorage(locals.session.data.sessionId)
	console.log(session)

	return {
		body: {
			webId: session.info.webId,
		},
	}
}
