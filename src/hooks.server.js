import { error, redirect } from '@sveltejs/kit'

import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
} from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	const excludedPaths = ['/hookOut', '/login']
	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')

		// throw or just return the event with no hooks the choice is yours
		return await resolve(event)
		// throw error(404, { message: 'hook level out' })
	}

	//testing away to not have to getSessionFromStorage everytime? or figure out if use is proper
	const sesh = await event.cookies.get('seshInfo')

	//nope out no cookies here
	if (!sesh) return await resolve(event)
	const seshInfo = JSON.parse(sesh)

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

		event.locals.seshInfo = seshInfo
		console.log('session and locals set')

		return await resolve(event)
	}

	// just for nuking ghost sessions if needed during dev
	// clearSessionFromStorageAll()

	if (!seshInfo.isLoggedIn) {
		console.log('not logged in')
		const session = await getSessionFromStorage(seshInfo.sessionId)

		if (session) {
			//is this needed still?
			event.locals.seshInfo = session.info

			//reset cookie to reflect login and set sameSite
			event.cookies.set('seshInfo', JSON.stringify(session.info), {
				path: '/',
				sameSite: 'strict',
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24,
			})
			console.log('first session and cookie set')

			if (event.url.pathname === '/authorize') {
				await session.handleIncomingRedirect(`${event.url.href}`)
				console.log('handled redirect')

				throw redirect(302, `${event.url.origin}`)
			}
		}
	}

	//fixme learn sequencing or clean up all these await resolves
	const response = await resolve(event)
	//set headers?
	return response
}
