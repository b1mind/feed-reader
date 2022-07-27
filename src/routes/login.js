import { Session } from '@inrupt/solid-client-authn-node'

export async function GET({ locals, url }) {
	let redirect = ''
	let solidSession = new Session()

	locals.session.set({
		sessionId: solidSession.info.sessionId,
		user: false,
	})

	const handleSolidRedirect = (url) => {
		return (redirect = url)
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
	return Response.redirect(redirect)
}
