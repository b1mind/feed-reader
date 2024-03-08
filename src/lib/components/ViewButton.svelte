<script>
	import { createEventDispatcher } from 'svelte'
	import Icon from '$lib/components/Icon.svelte'

	export let columns

	const dispatch = createEventDispatcher()

	function toggleView() {
		dispatch('toggleView')
		// columns = !columns
	}
</script>

<button type="button" class="btn mobile-only" on:click={toggleView}>
	{#if columns}
		<Icon name="grid" />
	{:else}
		<Icon name="columns" />
	{/if}
</button>
