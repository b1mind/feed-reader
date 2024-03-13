<script>
	import Follower from '$lib/components/Follower.svelte'

	export let data
</script>

<aside>
	<h2>Follow List</h2>
	{#await data.friends}
		looking for friends with lists
	{:then friends}
		{#if friends.length > 0}
			{#each friends as friend}
				<Follower {friend} known={friend.known} following="true" />
			{:else}
				<b>not following anyone</b>
			{/each}
		{/if}
	{/await}
</aside>

<div>
	<h1>Following</h1>
	<slot />
</div>
