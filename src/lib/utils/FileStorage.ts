import type { IStorage } from '@inrupt/solid-client-authn-node'
import fs from 'fs/promises'

/**
 * Simple key-value file storage. Not safe to concurrent updates.
 */
export class FileStorage implements IStorage {
	constructor(
		private path: string,
		private store: Record<string, string>,
	) {}

	static async atPath(path: string) {
		if (await fileExists(path)) {
			const data = await readJsonFile(path)
			return new FileStorage(path, data)
		}
		return new FileStorage(path, {})
	}

	async get(key: string): Promise<string | undefined> {
		return this.store[key]
	}

	async set(key: string, value: string): Promise<void> {
		this.store[key] = value
		await this.save()
	}

	async delete(key: string): Promise<void> {
		delete this.store[key]
		await this.save()
	}

	private async save(): Promise<void> {
		await writeJsonFile(this.path, this.store)
	}
}

async function readJsonFile(path: string) {
	const content = await fs.readFile(path, { encoding: 'utf-8' })
	return JSON.parse(content)
}

async function writeJsonFile(path: string, data: object) {
	const json = JSON.stringify(data, undefined, 2)
	await fs.writeFile(path, json)
}

async function fileExists(path: string) {
	try {
		await fs.access(path)
		return true
	} catch {
		return false
	}
}
