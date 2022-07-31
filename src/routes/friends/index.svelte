<script>
	import { session } from '$app/stores'
	import { enhance } from '$lib/utils/form.js'

	export let friends = []
</script>

<main>
	{#if $session.user}
		<h1>Friends</h1>
		<ul>
			{#each friends as friend}
				<li>
					<a href={friend.webId}> {friend.nick} </a>
					<ul>
						{#each friend.rssList as list}
							<li>
								<a href="/feed/{list.name}?xml={list.href}"> {list.name} </a>
								<form
									data-loading="false"
									action="/feed"
									method="POST"
									use:enhance
								>
									<input type="hidden" name="feed" bind:value={list.name} />
									<input type="hidden" name="url" bind:value={list.href} />
									<button type="submit">➕test</button>
								</form>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		<p>nothing to display <a href="/login">login</a></p>
	{/if}
</main>

<style lang="scss">
	:root {
		--color: var(--clr-primary);
	}

	a,
	button {
		color: var(--color);
	}

	li > form {
		display: inline-block;
	}

	[data-loading='false'] > button {
		color: black;
	}
</style>
