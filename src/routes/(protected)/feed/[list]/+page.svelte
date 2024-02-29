<script>
	import { flattenItemsIntoObjects, compareDates } from '$lib/utils'

	export let data
</script>

{#await data.feedStream}
	loading....
{:then stream}
	{@const sortedStream = flattenItemsIntoObjects(stream).sort(
		() => Math.random() - 0.5,
	)}

	<ul>
		{#each sortedStream as { title, link, snippet, published, ogImage, feedTitle }}
			<li>
				<a href={link}>
					{title}
				</a>
				<time>{published}</time>
				<b>{feedTitle}</b>

				{#if snippet}
					<p>{snippet}</p>
				{/if}
				<img src={ogImage} alt={title} loading="lazy" />
			</li>
		{/each}
	</ul>
{/await}

<style>
	ul {
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
