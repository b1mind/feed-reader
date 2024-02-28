import { redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

import { lucia } from '$lib/server/auth'

export async function POST({ locals }) {
	console.time('logout getSesh')
	const sessionId = locals.session.id
	const session = await getSessionFromStorage(sessionId)
	console.log(session)
	console.timeEnd('logout getSesh')

	if (session) {
		session.logout()
	}

	if (sessionId) {
		await lucia.invalidateSession(sessionId)
	}

	//should this be a return new Response?
	throw redirect(302, '/')
}
