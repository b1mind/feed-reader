import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
} from '@inrupt/solid-client-authn-node'

const excludedPaths = ['/login']

export async function handle({ event, resolve }) {
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')
		return await resolve(event)
	}

	const allSession = await getSessionIdFromStorageAll()
	// if (allSession) {
	// 	allSession.forEach(async (sesh) => {
	// 		let user = await getSessionFromStorage(sesh)
	// 		user.logout()
	// 	})
	// }
	console.log('sessions logged in')
	console.log(allSession)

	const sessionCookie = await event.cookies.get('session')
	if (!sessionCookie) return await resolve(event)

	const session = await getSessionFromStorage(sessionCookie)

	if (session) {
		event.locals.session = session

		if (event.url.pathname === '/authorize') {
			await session.handleIncomingRedirect(`${event.url.href}`)
			return Response.redirect(`${event.url.origin}`, 302)
		}
	}

	const response = await resolve(event)
	return response
}
