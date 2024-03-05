<script>
	import { createEventDispatcher } from 'svelte'
	export let columns

	const dispatch = createEventDispatcher()

	function toggleView() {
		dispatch('toggleView')
		columns = !columns
	}
</script>

<button type="button" class="mobile-only" on:click={toggleView}>
	{columns ? 'grid' : 'columns'}
</button>
