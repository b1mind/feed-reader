<script>
	import Icon from '$lib/components/Icon.svelte'
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

						<a href="/follows/{friend.nick}?id={friend.userId}">
							{friend.nick || friend.name}
						</a>

						{#if friend.known}
							<Icon name="friendship" aria="hidden" />
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p>you have no friends with RSS feed lists</p>
			<p>You can start by following the</p>
			<ul>
				<li>podrss.solidcommunity.net</li>
				<li>b1mind.inrupt.net</li>
			</ul>
		{/if}
	{/await}

	<form action="/follows?/addFriend" method="POST">
		<label for="friend">
			Add full webId or name.domain
			<br />
			<input
				type="text"
				name="friend"
				placeholder="name.solidcommunity.net"
				required
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
