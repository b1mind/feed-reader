<script>
	import { page } from '$app/stores'
	export let data
</script>

<a href="{$page.url.pathname}?sort=newest">newest</a>

{#await data.feedStream}
	loading....
{:then stream}
	<ul>
		{#each stream as { title, link, snippet, published, ogImage, feedTitle }}
			<li>
				<a href={link}>
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

	/* not working? */
	li:has(a:visited) {
		background: blue;
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
