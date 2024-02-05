<script>
	import { enhance } from '$app/forms'
	export let data

	const names = []
	data.lists.forEach((list) => {
		names.push(list.split('/').pop().split('.').shift())
	})

	let newListName
	let feedName
	let feedUrl
	let files
	let xmlString

	// function parseTitle(str) {
	// 	const regex = /<title>(.*?)<\/title>/
	// 	const match = str.match(regex)
	// 	return match ? match[1] : null
	// }

	//cleaner than regex? xD
	function parseTitle(str) {
		return str.split('<title>')[1].split('</title>')[0]
	}

	function makeXmlString(e) {
		if (!files) return
		const [file] = files
		let reader = new FileReader()
		reader.readAsText(file)
		reader.addEventListener(
			'load',
			() => {
				xmlString = reader.result
				newListName = parseTitle(xmlString)
			},
			false,
		)
	}

	$: required = !files ? true : null
</script>

<ul>
	{#each names as name}
		<li>
			<a href="/feed/{name}">
				{name}
			</a>
		</li>
	{/each}
</ul>

<form
	action="/feed/{newListName}?/addList"
	method="POST"
	autocomplete="off"
	enctype="multipart/form-data"
	use:enhance
>
	<label for="newListName">
		New List Name
		<input type="text" bind:value={newListName} {required} />
	</label>

	<label>
		Upload OPML
		<input
			bind:files
			on:change={makeXmlString}
			type="file"
			id="opml"
			name="file"
			accept=".xml, .opml"
		/>
	</label>

	<br />

	<label for="feed">
		Feed Name:
		<input
			type="text"
			name="feed"
			bind:value={feedName}
			{required}
			disabled={!required}
		/>
	</label>
	<label for="url">
		RSS Url:
		<input
			type="text"
			name="url"
			bind:value={feedUrl}
			{required}
			disabled={!required}
		/>
	</label>

	<button type="submit">create</button>
	<input type="text" value={xmlString || null} name="xmlString" />
</form>

<style lang="scss">
	label {
		display: block;
	}
</style>
