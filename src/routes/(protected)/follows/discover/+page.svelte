<script>
	import Follower from '$lib/components/Follower.svelte'

	export let data
</script>

{#await data.friends}
	looking for friends with lists
{:then friends}
	{#if friends.length > 0}
		<b>Discover</b>
		{#each friends as friend}
			{@const known = data.user.knows.includes(friend.webId)}
			{@const following = friend.follows && known}

			<Follower {friend} {known} {following} />
		{/each}
	{:else}
		<p>Not following anyone with RSS lists</p>
	{/if}
{/await}
