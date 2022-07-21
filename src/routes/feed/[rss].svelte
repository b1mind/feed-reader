<script>
	export let items
	export let title
</script>

<h1>{title}</h1>

<ul>
	{#each items as { title, link }}
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
