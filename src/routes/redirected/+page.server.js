import { redirect } from '@sveltejs/kit'

export async function load({ parent, url, locals }) {
	if (locals.session) {
		console.log('redirected')
		await locals.session.handleIncomingRedirect(`${url.href}`)
		console.log('handled')
		throw redirect(302, `${url.origin}`)
	}
}
