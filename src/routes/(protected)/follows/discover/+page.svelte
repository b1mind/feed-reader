<script>
	import Icon from '$lib/components/Icon.svelte'
	import { splitName } from '$lib/utils'

	export let data
</script>

{#await data.friends}
	looking for friends with lists
{:then friends}
	{#if friends.length > 0}
		<b>Discover</b>
		{#each friends as friend}
			{#if friend}
				{@const known = data.user.knows.includes(friend.webId)}
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

						{#if known}
							<Icon name="friendship" aria="hidden" />
						{:else if friend.follows}
							<Icon name="follows" aria="hidden" />
						{/if}

						<a href="/follows/discover?id={friend.userId}">follows</a>
					</summary>
					<ul>
						{#each friend.lists as list}
							<li>
								<a href="/follows/{friend.userId}/{splitName(list)}/?id={list}">
									{splitName(list)}
								</a>
							</li>
						{/each}
					</ul>
				</details>
			{/if}
		{/each}
	{:else}
		<p>Not following anyone with RSS lists</p>
	{/if}
{/await}

<style>
	img {
		width: 32px;
		aspect-ratio: 1;
	}
</style>
