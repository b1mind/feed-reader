import { invalid, redirect } from '@sveltejs/kit'
import { Session } from '@inrupt/solid-client-authn-node'

export async function load({ locals, url, cookies }) {
	console.log('login session')
	let redirectUrl = ''
	let solidSession = new Session()

	cookies.set('session', solidSession.info.sessionId, {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// secure: true,
		// set cookie to expire after a month
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
		// oidcIssuer: 'https://broker.pod.inrupt.com',
		// Pick an application name that will be shown when asked
		// to approve the application's access to the requested data.
		clientName: 'Feed Reader',
		handleRedirect: handleSolidRedirect,
	})

	//can we set a cookie header with this redirect?
	throw redirect(302, redirectUrl)
}
