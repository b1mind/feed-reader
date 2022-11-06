import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	const sessionCookie = event.cookies.get('session')

	if (!sessionCookie) {
		return await resolve(event)
	}

	console.log('ran session hook')
	const session = await getSessionFromStorage(sessionCookie)
	if (session) {
		event.locals = session
	}

	return await resolve(event)
}
