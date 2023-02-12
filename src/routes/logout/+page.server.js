import { redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals, cookies }) {
	throw redirect(302, '/')
}

export const actions = {
	async default({ locals, cookies }) {
		const sessionCookie = await cookies.get('session')
		const session = await getSessionFromStorage(sessionCookie)

		session?.logout()
		//should I even keep this cookie or wipe when we created sesh
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0),
		})

		cookies.set('seshInfo', '', {
			path: '/',
			expires: new Date(0),
		})
		console.log('cookies destroyed')

		throw redirect(302, '/')
		//issues with session destroy and login
	},
}
