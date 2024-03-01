<script>
	import { fly, slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { enhance } from '$app/forms'

	import { slugify } from '$lib/utils'

	export let data

	let feed = ''
	let url = ''
	$: open = false

	let opmlList = ``
	data.rssList.forEach(({ name, href }) => {
		opmlList += `<outline text="${name}" type="rss" xmlUrl="${href}"/>`
	})

	const opml = `
		<?xml version="1.0"?>
		<opml version="2.0">
		  <head>
		    <title>My Feeds</title>
		  </head>
		  <body>
				<outline text="rssList">
					${opmlList}
				</outline>
		  </body>
		</opml>
		`

	function saveFile() {
		const blob = new Blob([opml], { type: 'text/plain;charset=utf-8' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = 'data.opml' // Name of the file to be saved
		link.click()
		URL.revokeObjectURL(url)
	}
</script>

<main>
	<aside class:open>
		<ul>
			{#each data.rssList as { name, href } (name)}
				<li
					animate:flip={{ duration: 350 }}
					transition:fly|local={{ x: 150, duration: 350 }}
				>
					<!-- to preload / client parse or what how taxing is it? -->
					<!-- <a data-sveltekit-preload-data href="/feed/{slugify(name)}/?xml={href}"> -->
					<a href="/feed/{data.listName}/{slugify(name)}/?xml={href}">
						{name}
					</a>
					<form method="POST" use:enhance>
						<input type="hidden" name="name" value={name} />
						<input type="hidden" name="url" value={href} />

						<button formaction="/feed/{data.listName}?/edit" title="edit">
							📝
						</button>
						<button formaction="/feed/{data.listName}?/remove" title="remove">
							❌
						</button>
					</form>
				</li>
			{/each}
		</ul>

		<form
			action="/feed/{data.listName}?/add"
			method="POST"
			autocomplete="off"
			use:enhance
		>
			<label for="feed">
				Feed Name:
				<input type="text" name="feed" bind:value={feed} />
			</label><br />
			<label for="url">
				RSS Url:
				<input type="text" name="url" bind:value={url} />
			</label>
			<button type="submit">add</button>
		</form>
		<button on:click={saveFile}>Save Opml</button>
	</aside>

	<div class="content">
		<h1>{data.listName}</h1>
		<section>
			<slot />
		</section>
	</div>

	<button class="menu" type="button" on:click={() => (open = !open)}>
		Menu
	</button>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: [aside] minmax(300px, 1fr) [content] 5fr;
		@media (max-width: 460px) {
			grid-template-columns: 1fr;
			& > aside {
				display: none;
				position: fixed;
				max-height: 90svh;
				bottom: 1rem;
				right: 0;
				background-color: var(--clr-primary-bg);
				overflow-y: scroll;
			}
		}
	}

	.open {
		display: grid;
	}

	.menu {
		display: none;
		z-index: 9999;
		@media (max-width: 460px) {
			display: flex;
			position: fixed;
			bottom: 0;
			right: 0;
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li > form {
		display: inline-block;
	}
</style>
