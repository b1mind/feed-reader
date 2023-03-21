import { redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function POST({ locals, cookies }) {
	// const sessionCookie = await cookies.get('seshInfo')
	// const sessionId = JSON.parse(sessionCookie).sessionId
	console.time('logout getSesh')
	const session = await getSessionFromStorage(
		locals.session.data.info.sessionId
	)
	console.timeEnd('logout getSesh')

	await locals.session.destroy()
	session.logout()
	//should I even keep this cookie or wipe when we created sesh

	// cookies.set('seshInfo', '', {
	// 	path: '/',
	// 	expires: new Date(0),
	// })
	// console.log('cookies destroyed')

	throw redirect(302, '/')
	//issues with session destroy and login
}
