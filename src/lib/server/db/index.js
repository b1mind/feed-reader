import sqlite from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqliteDB = sqlite('session.db')
export const db = drizzle(sqliteDB)
