<script>
	export let rssList

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

<form action="" method="POST" on:submit={handleSubmit}>
	<label for="rssFeed">
		RSS Feed:
		<input autocomplete="off" type="text" name="" id="rssFeed" />
	</label>
	<label for="rssUrl">
		RSS Url:
		<input type="text" name="" id="rssUrl" />
	</label>
	<button type="submit">add</button>
</form>

<style lang="scss">
</style>
