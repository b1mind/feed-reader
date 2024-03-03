<script>
	import { actionLocalStorage } from '$lib/utils'
	import { afterUpdate } from 'svelte'

	let lastSeen = ''

	afterUpdate(() => {
		let hasSeenJson = localStorage.getItem('hasSeen')
		if (!hasSeenJson) return
		lastSeen = JSON.parse(hasSeenJson)
	})

	function saveSeen(e, title) {
		e.target.closest('li').classList.add('seen')
		actionLocalStorage('save', 'hasSeen', title, false)
	}

	export let title = ''
	export let link = ''
	export let published = ''
	export let categories = ''
	export let feedTitle = ''
	export let snippet = ''
	export let ogImage = {}
</script>

<li class:seen={lastSeen.includes(title)}>
	<a href={link} on:click={(e) => saveSeen(e, title)}>
		{title}
	</a>
	<time>{published}</time>
	<b>{feedTitle}</b>

	{#if snippet}
		<p>{snippet}</p>
	{/if}

	<div class="img">
		{#if ogImage.url}
			<img src={ogImage.url} alt={ogImage.alt} loading="lazy" />
		{:else}
			<img
				src="https://picsum.photos/500/350?random={Math.random()}"
				loading="lazy"
				alt="random from picsum photos"
			/>
		{/if}
	</div>
	<footer>
		{#if categories}
			{#each categories as tag}
				<b>{tag}</b>
			{/each}
		{/if}
	</footer>
</li>

<style lang="scss">
	.seen {
		color: red;
	}

	li {
		padding: 0.5rem;
		display: grid;
		background: var(--clr-primary-bg-alt);
	}

	a {
		font-size: 1.5rem;
		font-weight: bold;
	}

	a:visited {
		color: var(--clr-primary-dark);
	}

	.img {
		max-height: 250px;
		display: grid;
		overflow: hidden;
	}

	img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;

		& > b {
			padding: 2px 5px;
			background-color: var(--clr-primary-bg);
			border-radius: 10px;
		}
	}
</style>
