import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals }) {
	if (!locals.session.data.sessionId) return

	const session = await getSessionFromStorage(locals.session.data.sessionId)
	locals.session.destroy()
	session.logout()

	return {
		headers: { Location: '/' },
		status: 302,
	}
}
