import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals, cookies }) {
	throw redirect(302, '/')
}

export const actions = {
	async default({ locals, cookies }) {
		if (!locals.info.sessionId) return

		locals.logout()
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0),
		})

		throw redirect(302, '/')
		//issues with session destroy and login
	},
}
