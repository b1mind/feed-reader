import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
} from '@inrupt/solid-client-authn-node'

const excludedPaths = ['/redirected', '/login']

export async function handle({ event, resolve }) {
	console.log(excludedPaths.includes(event.url.pathname))
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')
		return await resolve(event)
	}

	console.log('get cookie')
	const sessionCookie = await event.cookies.get('session')

	if (!sessionCookie) {
		console.log('noz cookie')
		//need to invalidate locals?
		return await resolve(event)
	}

	console.log('haz cookie')

	const session = await getSessionFromStorage(sessionCookie)
	console.log(await getSessionIdFromStorageAll())

	if (session) {
		event.locals.session = session
		console.log('sendit lets session')
	}

	return await resolve(event)
}
