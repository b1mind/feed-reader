<script>
	import { localSettings } from '$lib/stores'
	import { onMount } from 'svelte'

	$: hidden = false

	onMount(() => {
		if ($localSettings.settings.hidden) {
			hideSeen()
		}
	})

	function hideSeen() {
		const allSeen = document.querySelectorAll('.seen')
		for (const post of allSeen) {
			post.classList.toggle('hidden')
		}

		hidden = !hidden
	}
</script>

<button type="button" on:click={hideSeen}>
	{hidden ? 'showSeen' : 'hideSeen'}
</button>
