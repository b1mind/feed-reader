import { getSessionIdFromStorageAll } from '@inrupt/solid-client-authn-node'
import { lucia } from '$lib/server/auth'
import { FileStorage } from '$lib/utils/FileStorage'

export async function handle({ event, resolve }) {
	//remove auth for api routes?
	if (event.route.id === '/(protected)/api/feed') {
		return resolve(event)
	}
	// const sessionStorage = await FileStorage.atPath(`sessionStorage.json`)
	const allSessions = await getSessionIdFromStorageAll()
	event.locals.allSessions = allSessions

	const sessionId = event.cookies.get(lucia.sessionCookieName)
	console.log('seshId', sessionId)
	console.log('allSessions', allSessions)
	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	//fixme this is only for the redirect
	event.locals.sessionId = sessionId

	const { session, user } = await lucia.validateSession(sessionId)
	console.log('lucia', session, user)
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
