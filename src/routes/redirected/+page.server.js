import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ cookies, url }) {
	const sessionCookie = cookies.get('session')
	const session = await getSessionFromStorage(sessionCookie)
	await session.handleIncomingRedirect(`${url.href}`)

	throw redirect(302, '/')
}
