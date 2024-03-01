<script>
	import { page } from '$app/stores'
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

<a href="{$page.url.pathname}?sort=newest">newest</a>
<button type="button" on:click={hideSeen}> hideSeen</button>

{#await data.feedStream}
	loading....
{:then stream}
	<ul>
		{#each stream as { title, link, snippet, published, ogImage, feedTitle }}
			<li class:seen={lastSeen.includes(title)}>
				<a href={link} on:click={(e) => saveSeen(e, title)}>
					{title}
				</a>
				<time>{published}</time>
				<b>{feedTitle}</b>

				{#if snippet}
					<p>{snippet}</p>
				{/if}
				<img src={ogImage.url} alt={ogImage.alt} loading="lazy" />
			</li>
		{/each}
	</ul>
{/await}

<style>
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

	a:visited {
		color: blue;
	}

	img {
		max-width: 100%;
	}
</style>
