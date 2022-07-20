<script>
	export let items
	export let title
</script>

<h1>{title}</h1>

<ul>
	{#each items as { title, link, img }}
		<a href={link}>
			<li>{title}</li>
		</a>

		<!-- <img src={img} alt={title} /> -->
	{/each}
</ul>

<style lang="scss">
</style>
