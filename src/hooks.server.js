import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	console.log('get cookie')
	const sessionCookie = event.cookies.get('session')

	if (!sessionCookie) {
		return await resolve(event)
	}

	const session = await getSessionFromStorage(sessionCookie)
	if (session) {
		event.locals = session

		console.log('set session')
	}

	return await resolve(event)
}
