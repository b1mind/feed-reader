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
					{#if friend}
						<li>
							{#if friend.img}
								<img src={friend.img} alt={friend.nick} />
							{/if}

							<a href="/follows/lists?id={friend?.userId}">
								{friend.nick || friend.name}
							</a>

							<a href="/follows/discover?id={friend.userId}">follows</a>

							{#if friend.known}
								<Icon name="friendship" aria="hidden" />
							{:else if friend.follows}
								<Icon name="follows" aria="hidden" />
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<p>This person has no friends with lists</p>
		{/if}
	{/await}
</main>

<style>
	img {
		width: 32px;
		aspect-ratio: 1;
	}
</style>
