import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, fetch }) {
	const response = await fetch('/api/profile')

	const data = await response.json()

	return { user: data.user }
}
