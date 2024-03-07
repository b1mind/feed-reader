<script>
	import { localSettings } from '$lib/stores'
	import { afterUpdate } from 'svelte'

	import Card from '$lib/components/Card.svelte'
	// import SeenButton from '$lib/components/SeenButton.svelte'
	import ViewButton from '$lib/components/ViewButton.svelte'

	export let posts
	$: sortedPosts = posts

	let columns = $localSettings.settings.layout

	afterUpdate(() => {
		if ($localSettings.settings.hidden) {
			hideSeen()
		}
	})

	function toggleSeen() {
		$localSettings.settings.hidden = !$localSettings.settings.hidden
		hideSeen()
	}

	function hideSeen() {
		// this really does not work when switching feeds data gets jumbled
		//fixme need key.id in posts
		let seenPosts = document.querySelectorAll('.seen')
		// seenPosts = $localSettings.seenPosts
		if ($localSettings.settings.hidden) {
			seenPosts.forEach((post) => {
				sortedPosts = sortedPosts.filter((key) => {
					return key.id != post.dataset.id
				})
			})
		} else {
			sortedPosts = posts
		}

		// const allSeen = document.querySelectorAll('.seen')
		// for (const post of allSeen) {
		// 	if ($localSettings.settings.hidden) {
		// 		post.classList.add('hidden')
		// 	} else {
		// 		post.classList.remove('hidden')
		// 	}
		// }
	}
</script>

<button type="button" on:click={toggleSeen}>
	{$localSettings.settings.hidden ? 'showSeen' : 'hideSeen'}
</button>

<!-- <SeenButton on:toggleSeen={() => (hidden = !hidden)} {hidden} /> -->
<ViewButton on:toggleView={() => (columns = !columns)} {columns} />

<div class="wrap-cards" class:columns>
	{#each sortedPosts as post, id}
		<Card {id} {...post}></Card>
	{/each}
</div>

<style lang="scss">
	.columns {
		display: block;
	}
</style>
