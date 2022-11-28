import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ cookies, locals, url }) {
	const sessionCookie = await cookies.get('session')
	const session = await getSessionFromStorage(sessionCookie)
	session.handleIncomingRedirect(`${url.href}`)
	console.log('session good')

	throw redirect(302, '/')
}
