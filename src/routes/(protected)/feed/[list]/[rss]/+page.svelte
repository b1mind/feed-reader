<script>
	import { actionLocalStorage } from '$lib/utils'
	import { afterUpdate } from 'svelte'

	export let data

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

	function hideSeen() {
		const allSeen = document.querySelectorAll('.seen')
		for (const post of allSeen) {
			post.classList.toggle('hidden')
		}
	}
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<button type="button" on:click={hideSeen}> hideSeen</button>
<ul>
	{#each data.rss.items as { title, link, snippet, published, ogImage }}
		<li class:seen={lastSeen.includes(title)}>
			<a href={link} on:click={(e) => saveSeen(e, title)}>
				<!-- <a href="/feed/read/?link={link}"> -->
				{title}
			</a>
			<time>{published}</time>

			{#if snippet}
				<p>{snippet}</p>
			{/if}
			<img src={ogImage.url} alt={ogImage.alt} loading="lazy" />
		</li>
	{/each}
</ul>

<style lang="scss">
	a {
		color: var(--clr-primary);
	}

	ul {
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		list-style: none;
	}

	.seen {
		color: red;
	}

	li {
		padding: 0.5rem;
		background: var(--clr-primary-bg-alt);
	}

	time {
		font-size: 0.9rem;
	}

	img {
		max-width: 300px;
	}
</style>
