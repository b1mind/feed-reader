import { invalid, redirect } from '@sveltejs/kit'
import { Session } from '@inrupt/solid-client-authn-node'

//do we even need a load? can this page be a +server?
// export async function load({ locals, url, cookies }) {}

export const actions = {
	sendIt: async ({ locals, url, cookies, request }) => {
		const formData = await request.formData()

		console.log('login session')
		let redirectUrl = ''
		let solidSession = new Session()

		// cookies.set('seshInfo', JSON.stringify(solidSession.info), {
		// 	path: '/',
		// 	httpOnly: true,
		// 	secure: true,
		// 	maxAge: 60 * 60 * 24,
		// })

		await locals.session.set({ info: solidSession.info })
		console.log(await locals.session.data)

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
