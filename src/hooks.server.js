import { error, redirect } from '@sveltejs/kit'

import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
	clearSessionFromStorageAll,
} from '@inrupt/solid-client-authn-node'

// const excludedPaths = ['/login']

export async function handle({ event, resolve }) {
	if (event.url.href.includes('test')) {
		throw error(404, { message: 'hook level' })
	}

	// if (excludedPaths.includes(event.url.pathname)) {
	// 	console.log('nope out hook')
	// 	return await resolve(event)
	// }

	const allSession = await getSessionIdFromStorageAll()
	console.log(allSession)

	//testing away to not have to getSessionFromStorage everytime? or figure out if use is proper
	const seshInfo = await event.cookies.get('seshInfo')
	if (seshInfo) {
		const seshParsed = JSON.parse(seshInfo)
		event.locals.seshInfo = seshParsed

		//todo clean this mess up: if no matching session on sever clear cookies/logout
		console.log('sessionOnServer:', allSession.includes(seshParsed.sessionId))
		if (!allSession.includes(seshParsed.sessionId)) {
			console.log('cookies need cleared')

			//this is so garbo need to use form action from /logout? or have it handle it
			event.cookies.set('session', '', {
				path: '/',
				expires: new Date(0),
			})
			event.cookies.set('seshInfo', '', {
				path: '/',
				expires: new Date(0),
			})

			// return new Response(null, {
			// 	status: 302,
			// 	headers: { location: '/' },
			// })

			return await resolve(event)
		}

		return await resolve(event)
	}

	// just for nuking ghost sessions if needed during dev
	// clearSessionFromStorageAll()

	const sessionCookie = await event.cookies.get('session')
	if (!sessionCookie) return await resolve(event)

	console.time('test')
	const session = await getSessionFromStorage(sessionCookie)
	console.timeEnd('test')

	if (session) {
		event.locals.session = session
		console.log('session and locals set')
		event.cookies.set('seshInfo', JSON.stringify(session.info), {
			path: '/',
			sameSite: 'strict',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24,
		})

		if (event.url.pathname === '/authorize') {
			console.log('redirected')
			await session.handleIncomingRedirect(`${event.url.href}`)
			console.log(session)
			console.log('handled')

			return Response.redirect(`${event.url.origin}`, 302)
		}
	}

	const response = await resolve(event)
	//set headers?
	return response
}
