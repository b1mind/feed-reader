<script>
	export let data
</script>

{#await data.feedStream}
	loading....
{:then stream}
	<ul>
		{#each stream as feed}
			{#each feed.items as { title, link, snippet, published, ogImage }}
				<li>
					<a href={link}>
						<!-- <a href="/feed/read/?link={link}"> -->
						{title}
					</a>
					<time>{published}</time>
					<b>{feed.title}</b>

					{#if snippet}
						<p>{snippet}</p>
					{/if}
					<img src={ogImage} alt={title} loading="lazy" />
				</li>
			{/each}
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

	li {
		padding: 0.5rem;
		background: var(--clr-primary-bg-alt);
	}

	img {
		max-width: 100%;
	}
</style>
