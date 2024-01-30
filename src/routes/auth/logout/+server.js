import { redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function POST({ locals, cookies }) {
	// const sessionCookie = await cookies.get('seshInfo')
	// const sessionId = JSON.parse(sessionCookie).sessionId
	console.time('logout getSesh')
	const session = await getSessionFromStorage(
		locals.session.data?.info?.sessionId
	)
	console.log(session)
	console.timeEnd('logout getSesh')

	if (session) {
		session.logout()
		await locals.session.destroy()
	}
	//should I even keep this cookie or wipe when we created sesh

	// cookies.set('seshInfo', '', {
	// 	path: '/',
	// 	expires: new Date(0),
	// })
	// console.log('cookies destroyed')

	throw redirect(302, '/')
	//issues with session destroy and login
}
