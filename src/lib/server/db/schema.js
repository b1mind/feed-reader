import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	webId: text('web_id').notNull(),
})

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull(),
})

//note need Key for Oauth info?
