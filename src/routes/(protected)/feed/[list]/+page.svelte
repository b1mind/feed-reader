<script>
	import { page } from '$app/stores'
	import LayoutCards from '$lib/components/LayoutCards.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'
	import ViewButton from '$lib/components/ViewButton.svelte'

	export let data
	let columns = true
</script>

<a href="{$page.url.pathname}?sort=newest">newest</a>
<SeenButton></SeenButton>
<ViewButton on:toggleView={() => (columns = !columns)} {columns} />

{#await data.feedStream}
	gathering from feeds....
{:then posts}
	<LayoutCards {posts} {columns} />
{/await}
