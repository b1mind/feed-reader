<script>
	import Icon from '$lib/components/Icon.svelte'
	import { splitName } from '$lib/utils'

	export let data
</script>

<main>
	<aside>
		<h2>Following</h2>
		{#await data.friends}
			looking for friends with lists
		{:then friends}
			{#if friends.length > 0}
				{#each friends as friend}
					{#if friend}
						<details>
							{#if friend.img}
								<img src={friend.img} alt={friend.nick} />
							{/if}

							<summary>
								<!-- <a href="/follows/lists?id={friend.userId}"> -->
								{friend.nick || friend.name}
								<!-- </a> -->

								<a href="/follows/discover?id={friend.userId}">follows</a>

								{#if friend.known}
									<Icon name="friendship" aria="hidden" />
								{/if}
							</summary>
							<ul>
								{#each friend.lists as list}
									<li>
										<a href="/follows/lists/{friend.name}/?id={list}">
											{splitName(list)}
										</a>
									</li>
								{/each}
							</ul>
						</details>
					{/if}
				{/each}
			{:else}
				<p>you have no friends with RSS feed lists</p>
				<p>You can start by following:</p>
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
	</aside>
	<slot />
</main>

<style lang="scss">
	main {
		--color: var(--clr-primary);
		display: grid;
		grid-template-columns: auto 1fr;
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
