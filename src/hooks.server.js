import { getSessionIdFromStorageAll } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	//todo refactor logic for (protected) and routes (auth) routes
	const sesh = await event.cookies.get('seshInfo')
	//nope out no cookies here
	if (!sesh) return await resolve(event)
	const seshInfo = JSON.parse(sesh)
	event.locals.seshInfo = seshInfo
	console.log('locals set')

	const excludedPaths = ['/hookOut', '/auth', '/auth/logout']
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')

		return await resolve(event)
		// throw error(418, { message: 'hook level out' })
	}

	if (!seshInfo.isLoggedIn) {
		console.log('not logged in')
		//could also check for (protected) path and redirect here
	}

	// console.time('hook sesh')
	// const sessionTest = await getSessionFromStorage(seshInfo.sessionId)
	// console.log(sessionTest)
	// console.timeEnd('hook sesh')

	const allSessions = await getSessionIdFromStorageAll()
	const sessionOnServer = allSessions.includes(seshInfo.sessionId)

	event.locals.allSessions = allSessions
	console.log(allSessions)
	console.log('sessionOnServer:', sessionOnServer)

	if (seshInfo.isLoggedIn) {
		if (!sessionOnServer) {
			console.log('cookies need cleared')

			//todo refactor this to be better?
			event.cookies.set('seshInfo', '', {
				path: '/',
				expires: new Date(0),
			})

			//how to return the event cookie with a redirect or set header ourself?
			// throw redirect(302, '/auth/login')
			// return Response.redirect(`${event.url.origin}/auth/login`, 302)
		}
	}

	//todo sequencing or clean up all these await resolves
	console.log('all checks good')
	const response = await resolve(event)
	return response
}
