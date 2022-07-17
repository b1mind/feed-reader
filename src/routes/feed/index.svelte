<script>
	export let rssList

	//todo need a utils file
	function slugify(string) {
		return string.split(' ').join('-').toLowerCase()
	}
</script>

<h1>RssList</h1>

<ul>
	{#each rssList as { name, href }}
		<a href="/feed/{slugify(name)}/?xml={href}">
			<li>{name}</li>
		</a>
	{/each}
</ul>

<style lang="scss">
</style>
