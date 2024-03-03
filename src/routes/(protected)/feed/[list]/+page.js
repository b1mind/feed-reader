export async function load({ fetch, params }) {
	const res = await fetch(`/api/feed/${params.list}`)

	return {
		feedStream: res.json(),
	}
}
