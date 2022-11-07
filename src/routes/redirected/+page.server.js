import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function load({ locals, cookies, url }) {
	await locals.handleIncomingRedirect(`${url.href}`)

	throw redirect(302, '/')
}
