import { redirect } from '@sveltejs/kit'
import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import { generateId } from 'lucia'
import { db } from '$lib/server/db'

import { lucia } from '$lib/server/auth'

//note oauth lucia https://lucia-auth.com/guides/oauth/basics

export async function GET({ locals, url, cookies }) {
	// const seshCookie = await cookies.get('seshInfo')
	// const seshInfo = JSON.parse(seshCookie)

	//fixme storage for session
	console.time('redirected getSesh')
	console.log(locals.sessionId)

	try {
		const solidSession = await getSessionFromStorage(locals.sessionId)

		console.timeEnd('redirected getSesh')

		await solidSession.handleIncomingRedirect(`${url.href}`)
		// console.log(session.info)
		console.log('handled redirect')
		console.log(solidSession.info)
		console.log(db)

		// const existingUser = await db
		// 	.select()
		// 	.from('user')
		// 	.where('web_id', '=', solidSession.info.webId)

		// if (existingUser) {
		// 	const session = await lucia.createSession(existingUser.id, {})
		// 	const sessionCookie = lucia.createSessionCookie(session.id)
		// 	return new Response(null, {
		// 		status: 302,
		// 		headers: {
		// 			Location: '/',
		// 			'Set-Cookie': sessionCookie.serialize(),
		// 		},
		// 	})
		// }

		const userId = generateId(15)
		await db.insert('user').values({
			id: userId,
			web_id: solidSession.info.webId,
		})

		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(solidSession.info.sessionId)
		console.log(session)

		console.log('first session and cookie set')

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': sessionCookie.serialize(),
			},
		})
	} catch (e) {
		console.log(e)
		if (e) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400,
			})
		}
		return new Response(null, {
			status: 500,
		})
	}

	//reset cookie to reflect login and set sameSite
	// cookies.set('seshInfo', JSON.stringify(session.info), {
	// 	path: '/',
	// 	sameSite: 'strict',
	// 	httpOnly: true,
	// 	secure: true,
	// 	maxAge: 60 * 60 * 24,
	// })

	console.log(session.info)
	// await locals.session.set({ info: session.info })
	await lucia.createSession(session.info.webId, {})
	console.log('first session and cookie set')

	// return Response.redirect('/', 302)
	throw redirect(302, `${url.origin}`)
}
