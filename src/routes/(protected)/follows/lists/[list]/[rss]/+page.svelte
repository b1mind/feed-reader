<script>
	import { page } from '$app/stores'
	import LayoutCards from '$lib/components/LayoutCards.svelte'

	export let data
</script>

<header>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</header>

<a href="/feed/{$page.url.search}&title={data.rss.title}">Add Feed</a>
<LayoutCards posts={data.rss.items} />
