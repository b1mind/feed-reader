import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET({ locals, url, cookies }) {
	const seshCookie = await cookies.get('seshInfo')
	const seshInfo = JSON.parse(seshCookie)
	const session = await getSessionFromStorage(seshInfo.sessionId)
	await session.handleIncomingRedirect(`${url.href}`)
	console.log('handled redirect')
	console.log(session.info)
	//reset cookie to reflect login and set sameSite
	cookies.set('seshInfo', JSON.stringify(session.info), {
		path: '/',
		// sameSite: 'strict',
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60 * 24,
	})

	console.log(cookies.get('seshInfo'))

	locals.seshInfo = session.info
	console.log('first session and cookie set')

	// return Response.redirect('/', 302)
	throw redirect(302, `${url.origin}`)
}
