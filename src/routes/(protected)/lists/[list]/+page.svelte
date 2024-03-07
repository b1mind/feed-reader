<script>
	import { page } from '$app/stores'
	import LayoutCards from '$lib/components/LayoutCards.svelte'

	export let data
</script>

{#await data.feedStream}
	gathering from feeds....
{:then posts}
	<a href="{$page.url.pathname}?sort=newest">newest</a>
	<LayoutCards {posts} />
{/await}
