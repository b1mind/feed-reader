<script>
	export let error
	export let rssList
	let feed = ''
	let url = ''

	//todo need a utils file
	function slugify(string) {
		return string.split(' ').join('-').toLowerCase()
	}

	function handleSubmit(e) {
		console.log(e)
	}
</script>

<h1>RssList</h1>

<ul>
	{#each rssList as { name, href }}
		<a sveltekit:prefetch href="/feed/{slugify(name)}/?xml={href}">
			<li>{name}</li>
		</a>
	{/each}
</ul>

<form action="/feed" method="post" autocomplete="off">
	{#if error}
		{error}
	{/if}

	<label for="feed">
		Feed Name:
		<input type="text" name="feed" bind:value={feed} />
	</label>
	<label for="url">
		RSS Url:
		<input type="text" name="url" bind:value={url} />
	</label>
	<button type="submit">add</button>
</form>

<style lang="scss">
</style>
