import { lucia } from '$lib/server/auth'
import { handle } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName)
	console.log(sessionId)
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
