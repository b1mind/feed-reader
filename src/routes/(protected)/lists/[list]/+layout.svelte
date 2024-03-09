<script>
	import { fly, slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { enhance } from '$app/forms'

	import { slugify, safeSpace } from '$lib/utils'

	export let data

	let feed = ''
	let url = ''
	let open = false

	function toggleMenu(e) {
		open = !open

		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'initial'
		}
	}

	function saveFile() {
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

		const blob = new Blob([opml], { type: 'text/plain;charset=utf-8' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = 'data.opml' // Name of the file to be saved
		link.click()
		URL.revokeObjectURL(url)
	}
</script>

<aside class:open>
	<ul>
		<nav>
			{#each data.rssList as { name, href } (name)}
				<li
					animate:flip={{ duration: 350 }}
					transition:fly|local={{ x: 150, duration: 350 }}
				>
					<!-- to preload / client parse or what how taxing is it? -->
					<a
						data-sveltekit-preload-data
						href="/lists/{data.listName}/{slugify(name)}/?xml={href}"
						on:click={open ? toggleMenu : null}
					>
						{name}
					</a>

					<!-- <form method="POST" use:enhance>
						<input type="hidden" name="name" value={safeSpace(name)} />
						<input type="hidden" name="url" value={href} />

						<button formaction="/lists/{data.listName}?/edit" title="edit">
							📝
						</button>
						<button formaction="/lists/{data.listName}?/remove" title="remove">
							❌
						</button>
					</form> -->
				</li>
			{/each}
		</nav>

		<form
			action="/lists/{data.listName}?/add"
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
	</ul>
</aside>

<div class="content">
	<h1>{data.listName}</h1>
	<section>
		<slot />
	</section>
</div>

<button class="menu" type="button" on:click={toggleMenu}>
	{open ? '✖️' : 'list'}
</button>

<style lang="scss">
	aside {
		/*position: sticky;
			top: 1px;
			align-self: start; */
		display: grid;
		font-size: 1.2rem;

		@media (max-width: 460px) {
			padding-block: 10px 30px;
			padding-inline: 10px 30px;
			display: none;
			position: fixed;
			max-height: 95svh;
			bottom: 5px;
			right: 0;
			background-color: var(--clr-secondary-bg);
			overflow-y: scroll;
			z-index: 999;
		}
	}

	.open {
		display: grid;
	}

	.menu {
		padding: 0.5rem 0.75rem;
		display: none;
		border-radius: 10px;
		z-index: 9999;

		@media (max-width: 460px) {
			display: flex;
			position: fixed;
			bottom: 10px;
			right: 10px;
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		padding-block: 3px;
		list-style: none;
	}

	label {
		display: grid;
	}
</style>
