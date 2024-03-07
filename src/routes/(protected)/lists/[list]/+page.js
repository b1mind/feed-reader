export async function load({ fetch, params, url }) {
	const res = await fetch(`/api/feed/${params.list}${url.search}`)

	return {
		feedStream: res.json(),
	}
}
