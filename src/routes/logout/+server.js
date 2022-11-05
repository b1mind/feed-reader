import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals }) {
	let msg = 'Logged Out'
	if (!locals.session.data.sessionId) return

	try {
		const session = await getSessionFromStorage(locals.session.data.sessionId)
		locals.session.destroy()
		session.logout()
		return new Response(undefined, { status: 302, headers: { Location: '/' } })
	} catch (error) {
		//issues with session destroy and login
		locals.session.destroy()

		return new Response(undefined, { status: 302, headers: { Location: '/' } })
	}
}
