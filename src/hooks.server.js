import { getSessionIdFromStorageAll } from '@inrupt/solid-client-authn-node'
import { lucia } from '$lib/server/auth'
import { sessionStorage } from '$lib/server/auth'

export async function handle({ event, resolve }) {
	//remove auth for api routes?
	if (event.route.id === '/(protected)/api/feed') {
		return resolve(event)
	}

	if (event.route.id === '/') {
		const allSessions = await getSessionIdFromStorageAll(sessionStorage)
		event.locals.allSessions = allSessions
		console.log('allSessions', allSessions)
	}

	const sessionId = event.cookies.get(lucia.sessionCookieName)
	console.log('seshId', sessionId)
	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	//fixme this is only for the redirect
	event.locals.sessionId = sessionId

	const { session, user } = await lucia.validateSession(sessionId)
	// console.log('lucia', session, user)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})
	}

	if (!session) {
		console.log('noSession', session)
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})
	}

	event.locals.user = user
	event.locals.session = session
	return resolve(event)
}
