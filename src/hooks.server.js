import { error } from '@sveltejs/kit'

import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
	clearSessionFromStorageAll,
} from '@inrupt/solid-client-authn-node'

const excludedPaths = ['/login']

export async function handle({ event, resolve }) {
	if (event.url.href.includes('test')) {
		throw error(404, { message: 'hook level' })
	}

	if (excludedPaths.includes(event.url.pathname)) {
		console.log('nope out hook')
		return await resolve(event)
	}

	// const allSession = await getSessionIdFromStorageAll()
	// console.log(allSession)
	// just for nuking ghost sessions if needed during dev
	// clearSessionFromStorageAll()

	//testing away to not have to getSessionFromStorage everytime? or figure out if use is proper
	const seshInfo = await event.cookies.get('seshInfo')
	if (seshInfo) {
		event.locals.seshInfo = JSON.parse(seshInfo)
		return await resolve(event)
	}

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
