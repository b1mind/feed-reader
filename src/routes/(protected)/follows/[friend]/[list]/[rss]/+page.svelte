<script>
	import { page } from '$app/stores'
	import { safeSpace } from '$lib/utils'
	import Card from '$lib/components/Card.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'

	export let data
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<SeenButton></SeenButton>
<a href="/feed/{$page.url.search}&title={data.rss.title}">Add Feed</a>

<div class="wrap-cards">
	{#each data.rss.items as post}
		<Card {...post}></Card>
	{/each}
</div>
