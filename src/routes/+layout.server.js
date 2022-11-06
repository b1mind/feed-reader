// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals, cookies }) {
	// const sessionCookie = cookies.get('session')
	// const session = await getSessionFromStorage(sessionCookie)

	return {
		// info: session.info,
		info: locals.info,
	}
}
