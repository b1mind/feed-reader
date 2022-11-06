import { redirect } from '@sveltejs/kit'
// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({}) {
	throw redirect(302, '/')
}

export const actions = {
	async default({ locals, cookies }) {
		// const sessionCookie = cookies.get('session')
		// const session = await getSessionFromStorage(sessionCookie)

		// session.logout()
		locals.logout()
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0),
		})

		throw redirect(302, '/')
		//issues with session destroy and login
	},
}
