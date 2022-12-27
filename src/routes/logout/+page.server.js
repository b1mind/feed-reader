import { redirect } from '@sveltejs/kit'

export async function load({ locals, cookies }) {
	throw redirect(302, '/')
}

export const actions = {
	async default({ locals, cookies }) {
		console.log(locals)
		if (!locals.session) throw redirect(302, '/')

		locals.session.logout()
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0),
		})

		throw redirect(302, '/')
		//issues with session destroy and login
	},
}
