<script>
	export let error
	export let rssList
	let feed = ''
	let url = ''

	//todo need a utils file
	function slugify(string) {
		return string.split(' ').join('-').toLowerCase()
	}
</script>

<h1>RssList</h1>

<ul>
	{#each rssList as { name, href }}
		<li>
			<a sveltekit:prefetch href="/feed/{slugify(name)}/?xml={href}">
				{name}
			</a>
			<form action="/feed?_method=delete" method="POST">
				<input type="hidden" name="name" value={name} />
				<button title="remove" type="submit">x</button>
			</form>
		</li>
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
	li > form {
		display: inline-block;
	}
</style>
