<script>
	import LayoutCards from '$lib/components/LayoutCards.svelte'

	export let data
</script>

<header>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</header>

<LayoutCards posts={data.rss.items} />
