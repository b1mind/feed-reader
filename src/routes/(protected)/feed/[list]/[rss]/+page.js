export async function load({ url, fetch }) {
	const res = await fetch(`/api/feed${url.search}&limit=99`)
	const rss = await res.json()

	return {
		rss: {
			title: rss.title,
			description: rss.description,
			items: rss.items,
		},
	}
}
