import type { Config } from 'drizzle-kit'

export default {
	schema: './src/lib/server/db/schema.js',
	out: './src/lib/server/db/migrations',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'session.db',
	},
} satisfies Config
