<script>
	import { afterUpdate } from 'svelte'
	import { fade } from 'svelte/transition'
	import { localSettings } from '$lib/stores'
	import { compareDates } from '$lib/utils'

	import Card from '$lib/components/Card.svelte'
	// import SeenButton from '$lib/components/SeenButton.svelte'
	import ViewButton from '$lib/components/ViewButton.svelte'

	export let posts
	let columns = $localSettings.settings.layout
	let recent = false
	let randomPosts = posts

	$: hiddenPosts = posts

	afterUpdate(() => {
		if ($localSettings.settings.hidden) {
			hideSeen()
		}
	})

	function toggleSeen() {
		$localSettings.settings.hidden = !$localSettings.settings.hidden
		hideSeen()
	}

	function sortRandom() {
		posts = [...randomPosts]
		console.log(randomPosts === posts)
		recent = false
	}

	function sortRecent() {
		randomPosts = [...posts]
		posts = posts.sort((a, b) => compareDates(a, b))
		recent = true
	}

	function hideSeen() {
		let seenPosts = document.querySelectorAll('.seen')
		if ($localSettings.settings.hidden) {
			seenPosts.forEach((post) => {
				hiddenPosts = hiddenPosts.filter((key) => {
					const id = Number(post.dataset.id)
					return key.id !== id
				})
			})
		} else {
			hiddenPosts = posts
		}
	}
</script>

{#if !recent}
	<button type="button" on:click={sortRecent}>Recent</button>
{:else}
	<button type="button" on:click={sortRandom}>Random</button>
{/if}

<button type="button" on:click={toggleSeen}>
	{$localSettings.settings.hidden ? 'showSeen' : 'hideSeen'}
</button>

<!-- could jus make this a button here.. -->
<ViewButton on:toggleView={() => (columns = !columns)} {columns} />

{#key posts}
	<div class="wrap-cards" class:columns transition:fade={{ duration: 300 }}>
		{#each hiddenPosts as post (post.id)}
			<Card id={post.id} {...post} />
		{/each}
	</div>
{/key}

<style lang="scss">
	.columns {
		display: block;
	}
</style>
