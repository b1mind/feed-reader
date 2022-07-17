import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return
	//passing in both cookieSession and event below
	return { ...locals.session.data, user: locals.session.user }
}

export const handle = handleSession(
	// should probably make a real secret sumday
	// no sensitive data being passed atm.
	{ secret: 'SUPER_NOTSECRET_SECRET_32_CHARATERS_OR_MORE' },
	async ({ event, resolve }) => {
		// const session = await getSessionFromStorage(
		// 	event.locals.session.data.sessionId
		// )

		//should I check for session here and set user stuffs?
		event.locals.session.user = { test: 'test' }
		const response = await resolve(event)

		return response
	}
)
