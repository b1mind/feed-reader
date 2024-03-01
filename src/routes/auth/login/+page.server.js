import { invalid, redirect } from '@sveltejs/kit'
import { assets } from '$app/paths'

import { lucia } from '$lib/server/auth'
import { Session } from '@inrupt/solid-client-authn-node'
// import { FileStorage } from '$lib/utils/FileStorage'
import { sessionStorage } from '$lib/server/auth'
//do we even need a load? can this page be a +server?
// export async function load({ locals, url, cookies }) {}

export const actions = {
	sendIt: async ({ locals, url, cookies, request }) => {
		const formData = await request.formData()

		console.log('login session')
		let redirectUrl = ''

		// const sessionStorage = await FileStorage.atPath(`sessionStorage.json`)
		const solidSession = new Session({ storage: sessionStorage })

		// const solidSession = new Session()

		// cookies.set('seshInfo', JSON.stringify(solidSession.info), {
		// 	path: '/',
		// 	httpOnly: true,
		// 	secure: true,
		// 	maxAge: 60 * 60 * 24,
		// })

		const sessionCookie = lucia.createSessionCookie(solidSession.info.sessionId)

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})

		// await locals.session.set({ info: solidSession.info })
		// console.log(await locals.session.data)

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
}
