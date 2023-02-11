import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

const excludedPaths = ['/login']

export async function handle({ event, resolve }) {
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')
		return await resolve(event)
	}

	// just for nuking session if needed during dev
	// const allSession = await getSessionIdFromStorageAll()
	// if (allSession) {
	// 	allSession.forEach(async (sesh) => {
	// 		let user = await getSessionFromStorage(sesh)
	// 		user.logout()
	// 	})
	// }

	const sessionCookie = await event.cookies.get('session')
	if (!sessionCookie) return await resolve(event)

	const session = await getSessionFromStorage(sessionCookie)

	if (session) {
		event.locals.session = session
		console.log('session and locals set')

		if (event.url.pathname === '/authorize') {
			await session.handleIncomingRedirect(`${event.url.href}`)
			return Response.redirect(`${event.url.origin}`, 302)
		}
	}

	const response = await resolve(event)
	//set headers?
	return response
}
