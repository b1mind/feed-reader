// import {
// 	getSessionFromStorage,
// 	getSessionIdFromStorageAll,
// 	Session,
// } from '@inrupt/solid-client-authn-node'

// import cookie from 'cookie'
// const session = new Session()

// export const getSession = ({ locals }) => {
// 	// if (!locals.session) return {}

// 	return {
// 		session: {
// 			sessionId: session.info.sessionId,
// 		},
// 	}
// }

// export const handle = async ({ event, resolve }) => {
// 	if (event.url.pathname === '/login') {
// 		session.login({
// 			// After login, the Solid Identity Provider will send the user back to the following
// 			// URL, with the data necessary to complete the authentication process
// 			// appended as query parameters:
// 			redirectUrl: `http://localhost:3000/redirected`,
// 			// Set to the user's Solid Identity Provider; e.g., "https://login.inrupt.com"
// 			oidcIssuer: 'https://login.inrupt.com',
// 			// Pick an application name that will be shown when asked
// 			// to approve the application's access to the requested data.
// 			clientName: 'Demo app',
// 			handleRedirect: (url) => {
// 				return console.log(url)
// 			},
// 		})
// 	}

// 	if (event.url.pathname === '/redirected') {
// 		console.log('loggin in')
// 	}

// 	return await resolve(event)
// }
