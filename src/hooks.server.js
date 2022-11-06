import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function handle({ event, resolve }) {
	const sessionCookie = event.cookies.get('session')

	if (!sessionCookie) {
		return await resolve(event)
	}

	const session = await getSessionFromStorage(sessionCookie)
	if (session) {
		await session.handleIncomingRedirect(`${event.url.href}`)
		event.locals.info = session.info
	}

	return await resolve(event)
}
