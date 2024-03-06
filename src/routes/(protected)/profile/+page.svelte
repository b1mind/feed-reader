<script>
	import { localSettings } from '$lib/stores'
	import Icon from '$lib/components/Icon.svelte'

	let target = $localSettings.settings.target
	let layout = $localSettings.settings.layout
	let order = $localSettings.settings.order
	let hidden = $localSettings.settings.hidden
	let saved = false

	function handleSettings() {
		$localSettings.settings.target = target
		$localSettings.settings.layout = layout
		$localSettings.settings.order = order
		$localSettings.settings.hidden = hidden
		saved = true
	}

	export let data
</script>

{#if !data.user}
	<p>not logged in</p>
{:else}
	<main>
		<h1>{data.user.name}: {data.user.nick}</h1>
		<img src={data.user.img} width="300px" alt="profile" />
		<p>
			<i>{data.user.note || ``}</i>
			<i>{data.user.contacts || ``}</i>
		</p>

		<h2>Settings:</h2>
		{saved ? 'Saved' : ''}

		<form action="" on:submit|preventDefault={handleSettings}>
			<label for="target">
				<input name="target" type="checkbox" bind:checked={target} />
				Open new tab for posts
			</label>

			<label for="layout">
				<input name="layout" type="checkbox" bind:checked={layout} />
				Columns Layout
			</label>

			<label for="order">
				<input name="order" type="checkbox" bind:checked={order} />
				Order by Newest
			</label>

			<label for="hidden">
				<input name="hidden" type="checkbox" bind:checked={hidden} />
				Hide Seen Posts
			</label>
			<button type="submit">save</button>
		</form>

		<br />

		<form action="/auth/logout" method="POST">
			<button class="btn" type="submit">
				Logout
				<Icon name="logout" width="16px" height="16px" />
			</button>
			<!-- <button formaction="/api/feed?/test">test</button> -->
		</form>
	</main>
{/if}

<style>
	form {
		display: grid;
	}

	button {
		justify-self: start;
	}
</style>
