import { error, redirect } from '@sveltejs/kit'

import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
} from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	//todo refactor logic for (protected) and routes (auth) routes
	const sesh = await event.cookies.get('seshInfo')
	//nope out no cookies here
	if (!sesh) return await resolve(event)
	const seshInfo = JSON.parse(sesh)
	event.locals.seshInfo = seshInfo
	console.log('locals set')

	const excludedPaths = ['/hookOut', '/auth', '/auth/logout']
	console.log(event.url.pathname)
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')

		return await resolve(event)
		// throw error(418, { message: 'hook level out' })
	}

	if (!seshInfo.isLoggedIn) {
		console.log('not logged in')
		//could also check for (protected) path and redirect here
	}

	// server sessions
	// clearSessionFromStorageAll()
	const allSessions = await getSessionIdFromStorageAll()
	event.locals.allSessions = allSessions
	console.log(allSessions)
	console.log('sessionOnServer:', allSessions.includes(seshInfo.sessionId))

	if (seshInfo.isLoggedIn) {
		//todo clean this mess up: if no matching session on sever clear cookies/logout

		if (!allSessions.includes(seshInfo.sessionId)) {
			console.log('cookies need cleared')

			//this is so garbo need to use form action from /logout? or have it handle it
			event.cookies.set('seshInfo', '', {
				path: '/',
				expires: new Date(0),
			})
			return await resolve(event)
		}

		console.log('all checks good')
		return await resolve(event)
	}

	//fixme learn sequencing or clean up all these await resolves
	const response = await resolve(event)
	return response
}
