import { invalid, redirect } from '@sveltejs/kit'
import { Session } from '@inrupt/solid-client-authn-node'

export async function load({ locals, url, cookies }) {
	console.log('login session')
	let redirectUrl = ''
	let solidSession = new Session()

	cookies.set('session', solidSession.info.sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30,
	})

	const handleSolidRedirect = (url) => {
		return (redirectUrl = url)
	}

	await solidSession.login({
		// After login, the Solid Identity Provider will send the user back to the following
		// URL, with the data necessary to complete the authentication process
		// appended as query parameters:
		redirectUrl: `${url.origin}/redirected`,
		// redirectUrl: `${url.href}`,
		// Set to the user's Solid Identity Provider; e.g., "https://login.inrupt.com"
		oidcIssuer: 'https://inrupt.net/',
		// oidcIssuer: 'https://solidcommunity.net/',
		// oidcIssuer: 'https://broker.pod.inrupt.com',
		// Pick an application name that will be shown when asked
		// to approve the application's access to the requested data.
		clientName: 'Feed Reader',
		handleRedirect: handleSolidRedirect,
	})

	//can we set a cookie header with this redirect?
	throw redirect(302, redirectUrl)
}

// export const actions = {
// 	async default({ locals, cookies }) {
// 		if (!locals.session) throw redirect(302, '/')

// 		throw redirect(302, '/')
// 	},
// }
