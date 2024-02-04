export async function load({ url, fetch }) {
	const res = await fetch(`/api/feed${url.search}`)
	const rss = await res.json()

	return {
		rss: {
			title: rss.title,
			description: rss.description,
			items: rss.items,
		},
	}
}
