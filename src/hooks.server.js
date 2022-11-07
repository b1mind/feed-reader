import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	event.locals = await getSessionFromStorage(event.cookies.get('session'))
	// const sessionCookie = event.cookies.get('session')

	// if (!sessionCookie) {
	// 	return await resolve(event)
	// }
	console.log('good cookie')

	// const session = await getSessionFromStorage(sessionCookie)
	// if (session) {
	// 	event.locals = session
	// 	console.log('session')
	// }

	return await resolve(event)
}
