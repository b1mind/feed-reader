<script>
	// import { localSettings } from '$lib/stores'
	import { onMount, beforeUpdate } from 'svelte'

	export let hidden

	//fixme this logic should be handled in the posts object really then we can flip and shit
	onMount(() => {
		if (hidden === true) {
			hideSeen()
		}
	})

	function handleClick() {
		hideSeen()
		hidden = !hidden
	}

	function hideSeen() {
		const allSeen = document.querySelectorAll('.seen')
		for (const post of allSeen) {
			post.classList.toggle('hidden')
		}
	}
</script>

<button type="button" on:click={handleClick}>
	{hidden ? 'showSeen' : 'hideSeen'}
</button>
