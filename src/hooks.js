// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
// look at using Cookie vs session coookie?
import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return
	return locals.session.data
}

export const handle = handleSession(
	// should probably make a real secret sumday
	// no sensitive data being passed atm.
	{ secret: 'SUPER_NOTSECRET_SECRET_32_CHARATERS_OR_MORE' },
	async ({ event, resolve }) => {
		// const excludedPaths = ['/login', '/logout', 'redirected']
		// if (!excludedPaths.includes(event.url.pathname)) {

		// 	the return visit for this just takes too long to have in a hook?

		// 	const session = await getSessionFromStorage(
		// 		event.locals.session.data.sessionId
		// 	)
		// 	await event.locals.session.update(() => ({
		// 		info: {
		// 			...session.info,
		// 		},
		// 	}))
		// }

		// console.log(session.info.isLoggedIn)

		//should I check for session here and set user stuffs?
		// event.locals.session.user = { test: 'test' }
		const response = await resolve(event)

		return response
	}
)
