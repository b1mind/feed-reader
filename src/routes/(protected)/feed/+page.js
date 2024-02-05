/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	const res = await fetch(`/api/feed/lists`)
	const lists = await res.json()

	return {
		lists,
	}
}
