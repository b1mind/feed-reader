<script>
	import { localSettings } from '$lib/stores'

	import Card from '$lib/components/Card.svelte'
	import SeenButton from '$lib/components/SeenButton.svelte'
	import ViewButton from '$lib/components/ViewButton.svelte'

	export let posts

	let columns = $localSettings.settings.layout
	let hidden = $localSettings.settings.hidden
</script>

<SeenButton {hidden} />
<ViewButton on:toggleView={() => (columns = !columns)} {columns} />

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
