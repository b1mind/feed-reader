<script>
	import Card from '$lib/components/Card.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'

	export let data
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<SeenButton></SeenButton>

<div class="wrap-cards">
	{#each data.rss.items as post}
		<Card {...post}></Card>
	{/each}
</div>
