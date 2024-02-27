import { dev } from '$app/environment'

import { Lucia, TimeSpan } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'

import { db } from '../db'
import { sessionTable, userTable } from '../db/schema'

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev,
		},
	},
	// getUserAttributes: (attributes) => {
	// 	return {
	// 		webId: attributes.webId,
	// 		username: attributes.username
	// 	};
	// },
	sessionExpiresIn: new TimeSpan(2, 'd'), // 2 days
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}
