<script>
	import { session } from '$app/stores'
	import { enhance } from '$lib/utils/form.js'

	export let friends = []
</script>

{#if $session.user}
	<main>
		<h1>{$session.user.name}: {$session.user.nick}</h1>
		<img src={$session.user.img} width="300px" alt="profile" />
		<p>
			<i>{$session.user.note}</i>
			<i>{$session.user.contacts}</i>
		</p>
	</main>

	Friends
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
