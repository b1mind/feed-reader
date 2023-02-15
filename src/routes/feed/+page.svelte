<script>
	import { fly, slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { enhance } from '$app/forms'

	import { slugify } from '$lib/utils'

	export let data

	let feed = ''
	let url = ''
</script>

<main>
	<h1>RssList</h1>

	<ul>
		{#each data.rssList as { name, href } (name)}
			<li
				animate:flip={{ duration: 350 }}
				transition:fly|local={{ x: 150, duration: 350 }}
			>
				<!-- to preload / client parse or what how taxing is it? -->
				<!-- <a data-sveltekit-preload-data href="/feed/{slugify(name)}/?xml={href}"> -->
				<a href="/feed/{slugify(name)}/?xml={href}">
					{name}
				</a>
				<form method="POST" use:enhance>
					<input type="hidden" name="name" value={name} />
					<input type="hidden" name="url" value={href} />

					<button formaction="/feed?/edit" title="edit"> 📝 </button>
					<button formaction="/feed?/remove" title="remove"> ❌ </button>
				</form>
			</li>
		{/each}
	</ul>

	<form action="/feed?/add" method="POST" autocomplete="off" use:enhance>
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
</main>

<style lang="scss">
	li > form {
		display: inline-block;
	}
</style>
