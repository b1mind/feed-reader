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
	// export let post
	// const { title, link, published, feedTitle, snippet, ogImage } = post
</script>

<li class:seen={lastSeen.includes(title)}>
	<a href={link} on:click={(e) => saveSeen(e, title)}>
		{title}
	</a>
	<time>{published}</time>
	<b>{feedTitle}{categories}</b>

	{#if snippet}
		<p>{snippet}</p>
	{/if}
	<img src={ogImage.url} alt={ogImage.alt} loading="lazy" />
</li>

<style>
	.seen {
		color: red;
	}

	li {
		padding: 0.5rem;
		background: var(--clr-primary-bg-alt);
	}

	a:visited {
		color: blue;
	}

	img {
		max-width: 100%;
	}
</style>
