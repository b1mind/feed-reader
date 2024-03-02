<script>
	import Card from '$lib/components/Card.svelte'

	export let data

	$: hidden = false

	function hideSeen() {
		const allSeen = document.querySelectorAll('.seen')
		for (const post of allSeen) {
			post.classList.toggle('hidden')
		}
		hidden = !hidden
	}
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<button type="button" on:click={hideSeen}>
	{hidden ? 'showSeen' : 'hideSeen'}
</button>

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
