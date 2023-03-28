<script>
	export let data
</script>

<article>
	<h1>RDF testing</h1>

	<p>
		{data.rdf}
	</p>

	<h2>Friends</h2>
	<ul>
		{#each data.friends as friend}
			<li>{friend}</li>
		{/each}
	</ul>
</article>

<style lang="scss">
</style>
