<script>
	export let body
</script>

<ul>
	{#each body as { title, link }}
		<a href={link}>
			<li>{title}</li>
		</a>
	{/each}
</ul>

<style lang="scss">
</style>
