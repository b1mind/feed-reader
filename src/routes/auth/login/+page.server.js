import { invalid, redirect } from '@sveltejs/kit'
import { Session } from '@inrupt/solid-client-authn-node'

export async function load({ locals, url, cookies }) {}

export const actions = {
	sendIt: async ({ url, cookies, request }) => {
		const formData = await request.formData()

		console.log('login session')
		let redirectUrl = ''
		let solidSession = new Session()

		cookies.set('seshInfo', JSON.stringify(solidSession.info), {
			path: '/',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24,
		})

		const handleSolidRedirect = (url) => {
			return (redirectUrl = url)
		}

		await solidSession.login({
			redirectUrl: `${url.origin}/auth`,
			// Set to the user's Solid Identity Provider; e.g., "https://inrupt.net/"
			oidcIssuer: formData.get('provider') || 'https://inrupt.net/',
			clientName: 'Feed Reader',
			handleRedirect: handleSolidRedirect,
		})

		//should we set a header with this redirect?
		throw redirect(302, redirectUrl)
	},

	bawls: async () => {
		//testing ground
	},
}
