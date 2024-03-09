<script>
	import { enhance } from '$app/forms'
	import { splitName, parseTitle, safeSpace } from '$lib/utils'

	export let data

	let newListName
	let feedName
	let feedUrl
	let files
	let xmlString
	let select

	function makeXmlString(e) {
		if (!files) return
		const [file] = files
		let reader = new FileReader()
		reader.readAsText(file)
		reader.addEventListener(
			'load',
			() => {
				xmlString = reader.result
				// console.log(xmlString)
				newListName = parseTitle(xmlString)
			},
			false,
		)
	}

	$: required = !files ? true : null
</script>

<main>
	<h1>Your Lists</h1>
	{#if data.lists}
		<ul>
			{#each data.lists as name}
				<li>
					<form action="/lists/?/removeList" method="POST">
						<a href="/lists/{splitName(name)}">
							{splitName(name)}
						</a>
						<input type="hidden" name="listName" value={name} />
						<button title="remove"> ❌ </button>
					</form>
				</li>
			{/each}
		</ul>
	{:else}
		no lists, try making one
	{/if}

	{#if data.xml}
		<form
			action="/lists/{select}?/add"
			method="POST"
			autocomplete="off"
			use:enhance
		>
			<label for="feed">
				Feed Name:
				<input type="text" name="feed" bind:value={data.title} {required} />
			</label>
			<label for="url">
				RSS Url:
				<input type="text" name="url" value={data.xml} />
			</label>

			<label for="selectList">
				Select List

				<select id="selectList" bind:value={select}>
					{#each data.lists as name}
						<option value={splitName(name)}>
							{splitName(name)}
						</option>
					{/each}
					<option value="addList"> -New List- </option>
				</select>
			</label>

			{#if select === 'addList'}
				<label for="newListName">
					New List Name
					<input
						type="textarea"
						bind:value={newListName}
						name="listName"
						{required}
					/>
				</label>
				<button formaction="/lists?/addList" title="addlist">add List</button>
			{:else}
				<button type="submit">add</button>
			{/if}
		</form>
	{:else}
		<form
			action="/lists?/addList"
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
			<input
				type="textarea"
				hidden
				value={xmlString || null}
				name="xmlString"
			/>

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
</main>

<style lang="scss">
	label {
		max-width: max-content;
		display: block;
	}
</style>
