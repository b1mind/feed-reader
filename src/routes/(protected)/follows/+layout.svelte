<script>
	export let data
</script>

<main>
	<h1>Following</h1>
	{#await data.friends}
		looking for friends with lists
	{:then friends}
		{#if friends.length > 0}
			<ul>
				{#each friends as friend}
					<li>
						{#if friend.img}
							<img src={friend.img} alt={friend.nick} />
						{/if}

						<a
							data-sveltekit-preload-data
							href="/follows/{friend.nick}?id={friend.userId}"
						>
							{friend.nick || friend.name}
						</a>

						{friend.known ? '⭐' : ''}
					</li>
				{/each}
			</ul>
		{:else}
			<p>you have no friends with RSS feed lists</p>
		{/if}
	{/await}

	<form action="/follows?/addFriend" method="POST">
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

	img {
		width: 32px;
		aspect-ratio: 1;
	}
</style>
