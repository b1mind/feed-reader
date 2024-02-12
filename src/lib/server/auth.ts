import { dev } from '$app/environment'

import { Lucia } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'

import sqlite from 'better-sqlite3'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqliteDB = sqlite('session.db')
const db = drizzle(sqliteDB)

const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
})

const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull(),
})

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev,
		},
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}
