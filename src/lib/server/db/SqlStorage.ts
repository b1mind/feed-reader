import sqlite3 from 'better-sqlite3'
import type { IStorage } from '@inrupt/solid-client-authn-node'

/**
 * Simple key-value SQLite storage using better-sqlite3.
 */
export class SqlStorage implements IStorage {
	private db: sqlite3.Database

	constructor(path: string) {
		this.db = new sqlite3(path)
		// Initialize the database with a table for storage if it doesn't exist
		this.db.exec(
			`CREATE TABLE IF NOT EXISTS storage (key TEXT PRIMARY KEY, value TEXT)`,
		)
	}

	async get(key: string): Promise<string | undefined> {
		const row = this.db
			.prepare(`SELECT value FROM storage WHERE key = ?`)
			.get(key)
		return row ? row.value : undefined
	}

	async set(key: string, value: string): Promise<void> {
		const stmt = this.db.prepare(
			`INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?)`,
		)
		stmt.run(key, value)
	}

	async delete(key: string): Promise<void> {
		const stmt = this.db.prepare(`DELETE FROM storage WHERE key = ?`)
		stmt.run(key)
	}
}
