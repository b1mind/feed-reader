import { redirect } from '@sveltejs/kit'

export async function load({ locals, url }) {
	await locals.session.handleIncomingRedirect(`${url.href}`)

	throw redirect(302, '/')
}
