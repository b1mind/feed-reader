import { assets } from '$app/paths'

import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import { generateId } from 'lucia'

import { lucia } from '$lib/server/auth'
import { db } from '$lib/server/db'
import { userTable, sessionTable } from '$lib/server/db/schema'
import { sessionStorage } from '$lib/server/auth'

//note oauth lucia https://lucia-auth.com/guides/oauth/basics

export async function GET({ locals, url, cookies }) {
	//fixme storage for session
	const sessionId = cookies.get(lucia.sessionCookieName)
	console.log(sessionId)
	console.time('redirected getSesh')

	try {
		const solidSession = await getSessionFromStorage(
			// sessionId,
			locals.sessionId,
			sessionStorage,
		)

		console.timeEnd('redirected getSesh')
		await solidSession.handleIncomingRedirect(`${url.href}`)
		// console.log(session.info)
		console.log('handled redirect')
		console.log(solidSession.info)

		//fixme check existing user
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
		await db.insert(userTable).values({
			id: userId,
			webId: solidSession.info.webId,
		})

		const session = await lucia.createSession(
			userId,
			{
				webId: solidSession.info.webId,
			},
			{
				sessionId: solidSession.info.sessionId,
			},
		)

		const sessionCookie = await lucia.createSessionCookie(session.id)

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})

		console.log('first session and cookie set')

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				// 'Set-Cookie': sessionCookie.serialize(),
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
}
