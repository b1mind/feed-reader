<script>
	import Icon from '$lib/components/Icon.svelte'
	import { splitName } from '$lib/utils'

	export let data
</script>

<aside>
	<h2>Follow List</h2>
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
							<b>
								{friend.nick || friend.name}
							</b>
							<!-- </a> -->

							{#if friend.known}
								<Icon name="friendship" aria="hidden" />
							{:else if friend.follows}
								<Icon name="follows" aria="hidden" />
							{/if}
						</summary>
						<ul>
							<a href="/follows/discover?id={friend.userId}">follows</a>
							{#each friend.lists as list}
								<li>
									<a
										href="/follows/{friend.userId}/{splitName(list)}/?id={list}"
									>
										{splitName(list)}
									</a>
								</li>
							{/each}
						</ul>
					</details>
				{/if}
			{/each}
		{:else}
			<b>not following anyone</b>
		{/if}
	{/await}
</aside>

<div>
	<h1>Following</h1>
	<slot />
</div>

<style lang="scss">
	img {
		width: 32px;
		aspect-ratio: 1;
	}
</style>
