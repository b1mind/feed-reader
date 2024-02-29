<script>
	import { enhance } from '$app/forms'

	export let data

	let names = []

	if (data.lists) {
		data.lists.forEach((list) => {
			names = [...names, list.split('/').pop().split('.').shift()]
			// names.push(list.split('/').pop().split('.').shift())
		})
	}

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
				console.log(xmlString)
				newListName = parseTitle(xmlString)
			},
			false,
		)
	}

	$: required = !files ? true : null
</script>

{#if data.lists}
	<ul>
		{#each names as name}
			<li>
				<a href="/feed/{name}">
					{name}
				</a>
			</li>
		{/each}
	</ul>
{:else}
	no lists, try making one
{/if}

<form
	action="/feed?/addList"
	method="POST"
	autocomplete="off"
	enctype="multipart/form-data"
	use:enhance
>
	<label for="newListName">
		New List Name
		<input
			type="textarea"
			bind:value={newListName}
			name="listName"
			{required}
		/>
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
	<input type="textarea" hidden value={xmlString || null} name="xmlString" />

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
</form>

<style lang="scss">
	label {
		max-width: max-content;
		display: block;
	}
</style>
