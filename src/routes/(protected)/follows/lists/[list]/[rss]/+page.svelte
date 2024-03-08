<script>
	import { page } from '$app/stores'
	import LayoutCards from '$lib/components/LayoutCards.svelte'

	export let data
</script>

<section>
	<header>
		<h2>{data.rss.title}</h2>
		<p>{data.rss?.description || 'no description'}</p>
		<a href="/lists/{$page.url.search}&title={data.rss.title}">Add Feed</a>
	</header>

	<LayoutCards posts={data.rss.items} />
</section>
