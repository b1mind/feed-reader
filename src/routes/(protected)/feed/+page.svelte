<script>
	import { enhance } from '$app/forms'

	export let data

	let newListName
	let feedName
	let feedUrl
	let files
	let xmlString
	let select

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
		{#each data.lists as name}
			{@const splitName = name.split('/').pop().split('.').shift()}
			<li>
				<a href="/feed/{splitName}">
					{splitName}
				</a>
			</li>
		{/each}
	</ul>
{:else}
	no lists, try making one
{/if}

{#if data.xml}
	<form
		action="/feed/{select}?/add"
		method="POST"
		autocomplete="off"
		use:enhance
	>
		<label for="selectList">Select List</label>
		<select id="selectList" bind:value={select}>
			{#each data.lists as name}
				{@const splitName = name.split('/').pop().split('.').shift()}
				<option value={splitName}>
					{splitName}
				</option>
			{/each}
		</select>

		<label for="feed">
			Feed Name:
			<input type="text" name="feed" bind:value={feedName} />
		</label><br />
		<label for="url">
			RSS Url:
			<input type="text" name="url" value={data.xml} />
		</label>
		<button type="submit">add</button>
	</form>
{:else}
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
{/if}

<style lang="scss">
	label {
		max-width: max-content;
		display: block;
	}
</style>
