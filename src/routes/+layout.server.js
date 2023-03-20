// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals, cookies, url }) {
	if (!locals.session.data) return {}

	// we can get the session from storage one time for session.info / cookie prob better.
	// const sessionId = locals.seshInfo.sessionId
	// const session = await getSessionFromStorage(sessionId)

	return {
		session: locals.session.data,
		// allSessions: locals?.allSessions,
		info: locals?.session?.data?.info || locals?.seshInfo,
	}
}
