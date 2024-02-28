import { redirect } from '@sveltejs/kit'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

import { FileStorage } from '$lib/utils/FileStorage'
import { lucia } from '$lib/server/auth'

// /** @type {import('@sveltejs/kit').Actions} */
// export const actions = {
// 	default: async ({ locals }) => {
// 		const session = await getSessionFromStorage(
// 			await locals.session.data?.info?.sessionId
// 		)
// 		console.log(await locals.session.data)

// 		if (session) {
// 			session.logout()
// 		}

// 		await locals.session.destroy()

// 		return {}
// 	},
// }

export async function POST({ locals, cookies }) {
	// const sessionCookie = await cookies.get('seshInfo')
	// const sessionId = JSON.parse(sessionCookie).sessionId
	console.time('logout getSesh')
	const sessionId = locals.session.id
	const sessionStorage = await FileStorage.atPath(`sessionStorage.json`)
	const session = await getSessionFromStorage(sessionId, sessionStorage)
	console.log(session)
	console.timeEnd('logout getSesh')

	if (session) {
		session.logout()
	}

	if (sessionId) {
		await lucia.invalidateSession(sessionId)
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
