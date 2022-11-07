import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	console.log('get cookie')
	const sessionCookie = event.cookies.get('session')

	if (!sessionCookie) {
		console.log('bad cookie')
		return await resolve(event)
	}
	console.log('good cookie')

	const session = await getSessionFromStorage(sessionCookie)
	if (session) {
		event.locals.session = session

		console.log('set session')
	}

	return await resolve(event)
}
