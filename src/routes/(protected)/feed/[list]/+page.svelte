<script>
	import LayoutCards from '$lib/components/LayoutCards.svelte'

	export let data
</script>

{#await data.feedStream}
	gathering from feeds....
{:then posts}
	<LayoutCards {posts} />
{/await}
