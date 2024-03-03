<script>
	import { enhance } from '$app/forms'

	export let data
</script>

<main>
	<h1>Friends</h1>
	{#await data.friends}
		looking for friends with lists
	{:then friends}
		{#if friends.length > 0}
			<ul>
				{#each friends as friend}
					<li>
						<a href="/friends/{friend.nick}?id={friend.userId}">
							{friend.nick || friend.name}
						</a>
						<!-- todo need away to pick list -->
						<!-- <ul>
							{#each friend.rssList as list}
								<li>
									<a href="/feed/friend/{list.name}?xml={list.href}">
										{list.name}
									</a>
									<form
										data-loading="false"
										action="/feed?/add"
										method="POST"
										use:enhance
									>
										<input type="hidden" name="feed" value={list.name} />
										<input type="hidden" name="url" value={list.href} />
										<button type="submit" disabled>➕</button>
									</form>
								</li>
							{/each}
						</ul> -->
					</li>
				{/each}
			</ul>
		{:else}
			<p>you have no friends with RSS feed lists</p>
		{/if}
	{/await}

	<form action="/friends?/addFriend" method="POST">
		<label for="friend">
			Add full webId
			<input
				type="text"
				name="friend"
				placeholder="friend.host/profile.card#me"
			/>
		</label>
		<button>add</button>
	</form>
	<slot />
</main>

<style lang="scss">
	main {
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
