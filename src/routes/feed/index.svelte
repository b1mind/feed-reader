<script>
	import { enhance } from '$lib/utils/form.js'
	import { fly, fade, slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	export let error = ''
	export let rssList = []

	let feed = ''
	let url = ''

	//todo need a utils file
	function slugify(string) {
		return string.replace(' ', '-').toLowerCase()
	}
</script>

<main>
	<h1>RssList</h1>

	{#if error}
		<div transition:slide class="error">
			{error}
		</div>
	{/if}

	<ul>
		{#each rssList as { name, href }, dex (name)}
			<li
				animate:flip={{ duration: 350 }}
				transition:fly={{ x: 150, duration: 350 }}
			>
				<a sveltekit:prefetch href="/feed/{slugify(name)}/?xml={href}">
					{name}
				</a>
				<form action="/feed?_method=PUT" method="POST" use:enhance>
					<input type="hidden" name="name" value={name} />
					<input type="hidden" name="url" value={href} />

					<button type="submit" title="edit">📝</button>
				</form>

				<form action="/feed?_method=DELETE" method="POST" use:enhance>
					<input type="hidden" name="name" value={name} />
					<button type="submit" title="remove">❌</button>
				</form>
			</li>
		{/each}
	</ul>

	<form action="/feed" method="post" autocomplete="off" use:enhance>
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
</main>

<style lang="scss">
	li > form {
		display: inline-block;
	}
</style>
