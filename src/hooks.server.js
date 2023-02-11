import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
} from '@inrupt/solid-client-authn-node'

const excludedPaths = ['/login']

export async function handle({ event, resolve }) {
	console.log('check cookie')
	const sessionCookie = await event.cookies.get('session')
	console.log(sessionCookie)
	if (!sessionCookie) return await resolve(event)

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

	console.log(allSession)
	console.log('get session hook')
	const session = await getSessionFromStorage(sessionCookie)
	// await session.handleIncomingRedirect(`${event.url.href}`)

	if (session) {
		if (event.url.pathname === '/authorize') {
			console.log('redirected')
			await session.handleIncomingRedirect(`${event.url.href}`)
			console.log('handled')
			event.locals.session = session

			return Response.redirect(`${event.url.origin}`, 302)
		}

		event.locals.session = session
		console.log('sendit hook session')
	}

	const response = await resolve(event)
	return response
}
