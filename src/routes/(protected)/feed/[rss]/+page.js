export async function load({ url, fetch }) {
	const res = await fetch(`/api/feed${url.search}`)
	const rss = await res.json()

	return {
		rss: {
			title: rss.data.title,
			description: rss.data.description,
			items: rss.items,
		},
	}
}
