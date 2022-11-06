import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals }) {
	let msg = 'Logged Out'
	if (!locals.session.data.sessionId) return

	try {
		const session = await getSessionFromStorage(locals.session.data.sessionId)
		locals.session.destroy()
		session.logout()
		return redirect(302, '/')
	} catch (error) {
		//issues with session destroy and login
		locals.session.destroy()

		return redirect(302, '/')
	}
}
