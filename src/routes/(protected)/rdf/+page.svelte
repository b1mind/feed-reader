<script>
	export let data
	let dataString = data.opml

	function saveFile() {
		const blob = new Blob([dataString], { type: 'text/plain;charset=utf-8' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = 'data.opml' // Name of the file to be saved
		link.click()
		URL.revokeObjectURL(url)
	}
</script>

<button on:click={saveFile}>Save File</button>

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
