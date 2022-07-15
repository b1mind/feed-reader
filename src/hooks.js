import {
	getSessionFromStorage,
	getSessionIdFromStorageAll,
	Session,
} from '@inrupt/solid-client-authn-node'

import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return {}
	return { sessionId: locals.session.data.sessionId }
}

export const handle = handleSession(
	{ secret: 'test' },
	async ({ event, resolve }) => {
		console.log(event.locals.session.data)
		let redirect = ''
		let solidSession = new Session()

		event.locals.session.set({
			name: 'session',
			sessionId: solidSession.info.sessionId || '',
			keys: [
				'Required, but value not relevant for this demo - key1',
				'Required, but value not relevant for this demo - key2',
			],
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		})

		// if (event.url.pathname === '/login') {
		// 	const handleSolidRedirect = (url) => {
		// 		return (redirect = url)
		// 	}

		// 	await solidSession.login({
		// 		// After login, the Solid Identity Provider will send the user back to the following
		// 		// URL, with the data necessary to complete the authentication process
		// 		// appended as query parameters:
		// 		redirectUrl: `http://localhost:3000/redirected`,
		// 		// Set to the user's Solid Identity Provider; e.g., "https://login.inrupt.com"
		// 		oidcIssuer: 'https://login.inrupt.com',
		// 		// Pick an application name that will be shown when asked
		// 		// to approve the application's access to the requested data.
		// 		clientName: 'Feed Reader',
		// 		handleRedirect: handleSolidRedirect,
		// 	})

		// 	//can we set a cookie header with this redirect?
		// 	return Response.redirect(redirect)
		// }

		if (event.url.pathname === '/redirected') {
			console.log(event.locals.session.data)
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
			await session.handleIncomingRedirect(
				`http://localhost:${port}${event.url.href}`
			)

			// 5. `session` now contains an authenticated Session instance.
			if (session.info.isLoggedIn) {
				console.lot(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
			}
		}

		const response = await resolve(event)

		return response
	}
)
