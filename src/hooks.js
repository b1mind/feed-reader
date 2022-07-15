import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return {}
	return { sessionId: locals.session.data.sessionId }
}

export const handle = handleSession(
	{ secret: 'test' },
	async ({ event, resolve }) => {
		if (event.url.pathname === '/redirected') {
			// 3. If the user is sent back to the `redirectUrl` provided in step 2,
			//    it means that the login has been initiated and can be completed. In
			//    particular, initiating the login stores the session in storage,
			//    which means it can be retrieved as follows.
			const session = await getSessionFromStorage(
				event.locals.session.data.sessionId
			)

			// 4. With your session back from storage, you are now able to
			//    complete the login process using the data appended to it as query
			//    parameters in req.url by the Solid Identity Provider:
			await session.handleIncomingRedirect(`${event.url.href}`)

			// 5. `session` now contains an authenticated Session instance.
			if (session.info.isLoggedIn) {
				return new Response(`Logged in with the WebID ${session.info.webId}.`)
			}
		}

		if (event.url.pathname === '/logout') {
			const session = await getSessionFromStorage(
				event.locals.session.data.sessionId
			)
			session.logout()
			return new Response(`Logged out`)
		}

		const response = await resolve(event)

		return response
	}
)
