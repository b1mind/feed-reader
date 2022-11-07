<script>
	export let data
</script>

<h1>{data.rss.title}</h1>

<ul>
	{#each data.rss.items as { title, link }}
		<a href={link}>
			<li>{title}</li>
		</a>
	{/each}
</ul>

<style lang="scss">
	a {
		color: var(--clr-primary);
	}
</style>
