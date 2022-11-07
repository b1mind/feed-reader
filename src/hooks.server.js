import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	console.log('get cookie')
	const sessionCookie = event.cookies.get('session')

	if (!sessionCookie) {
		console.log('noz cookie')
		//need to invalidate locals?
		return await resolve(event)
	}

	console.log('haz cookie')

	const session = await getSessionFromStorage(sessionCookie)
	if (session) {
		event.locals.session = session
		console.log('sendit lets session')
	}

	return await resolve(event)
}
