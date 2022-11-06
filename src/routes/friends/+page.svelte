<script>
	import { enhance } from '$app/forms'

	export let data
</script>

<main>
	<h1>Friends</h1>
	<ul>
		{#each data.friends as friend}
			<li>
				<a href={friend.webId}> {friend.nick} </a>
				<ul>
					{#each friend.rssList as list}
						<li>
							<a href="/feed/{list.name}?xml={list.href}"> {list.name} </a>
							<form
								data-loading="false"
								action="/feed?/add"
								method="POST"
								use:enhance
							>
								<input type="hidden" name="feed" bind:value={list.name} />
								<input type="hidden" name="url" bind:value={list.href} />
								<button type="submit">➕</button>
							</form>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
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
