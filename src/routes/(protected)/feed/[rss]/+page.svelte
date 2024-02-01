<script>
	export let data
</script>

<hgroup>
	<h1>{data.rss.title}</h1>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<ul>
	{#each data.rss.items as { title, link, snippet, published, ogImage }}
		<li>
			<a href={link}>
				{title}
			</a>
			<time>{published}</time>

			{#if snippet}
				<p>{snippet}</p>
			{/if}
			<img src={ogImage} alt={title} loading="lazy" />
		</li>
	{/each}
</ul>

<style lang="scss">
	a {
		color: var(--clr-primary);
	}

	time {
		font-size: 0.9rem;
	}

	img {
		max-width: 300px;
	}
</style>
