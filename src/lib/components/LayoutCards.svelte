<script>
	import Card from '$lib/components/Card.svelte'
	export let columns
	export let posts
</script>

<div class="wrap-cards" class:columns>
	{#each posts as post}
		<Card {...post}></Card>
	{/each}
</div>

<style lang="scss">
	.columns {
		display: block;
	}
</style>
