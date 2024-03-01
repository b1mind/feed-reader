<script>
	export let data
</script>

<hgroup>
	<h2>{data.rss.title}</h2>
	<p>{data.rss?.description || 'no description'}</p>
</hgroup>

<ul>
	{#each data.rss.items as { title, link, snippet, published, ogImage }}
		<li>
			<a href={link}>
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
		margin: 0;
		padding: 0;
	}

	time {
		font-size: 0.9rem;
	}

	img {
		max-width: 300px;
	}
</style>
