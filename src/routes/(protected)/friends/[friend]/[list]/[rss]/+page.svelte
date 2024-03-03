<script>
	import { page } from '$app/stores'
	import Card from '$lib/components/Card.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'

	export let data
	console.log($page)
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<SeenButton></SeenButton>
<a href="/feed/{$page.url.search}">Add Feed</a>

<ul>
	{#each data.rss.items as post}
		<Card {...post}></Card>
	{/each}
</ul>

<style lang="scss">
	ul {
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		list-style: none;
	}
</style>
