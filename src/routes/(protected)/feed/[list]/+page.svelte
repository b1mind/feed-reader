<script>
	import { page } from '$app/stores'
	import Card from '$lib/components/Card.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'

	export let data
</script>

<a href="{$page.url.pathname}?sort=newest">newest</a>
<SeenButton></SeenButton>

{#await data.feedStream}
	loading....
{:then stream}
	<ul>
		{#each stream as post}
			<Card {...post}></Card>
		{/each}
	</ul>
{/await}

<style>
	ul {
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		list-style: none;
	}
</style>
