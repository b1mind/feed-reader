import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals }) {
	let msg = 'Logged Out'
	if (!locals.session.data.sessionId) return

	try {
		const session = await getSessionFromStorage(locals.session.data.sessionId)
		locals.session.destroy()
		session.logout()
		return {
			headers: { Location: '/' },
			status: 302,
			//how can we return a prop with the redirect header?
			// body: {
			// 	msg,
			// },
		}
	} catch (error) {
		//issues with session destroy and login
		locals.session.destroy()

		return {
			headers: { Location: '/' },
			status: 302,
		}
	}
}
