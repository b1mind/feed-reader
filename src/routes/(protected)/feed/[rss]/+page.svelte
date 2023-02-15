<script>
	export let data
</script>

<h1>{data.rss.title}</h1>

<ul>
	{#each data.rss.items as { title, link, snippet, published }}
		<li>
			<a href={link}>
				{title}
			</a>
		</li>
		<time>{published}</time>

		{#if snippet}
			<p>{snippet}</p>
		{/if}
	{/each}
</ul>

<style lang="scss">
	a {
		color: var(--clr-primary);
	}

	time {
		font-size: 0.9rem;
	}
</style>
