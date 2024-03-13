<script>
	import Icon from '$lib/components/Icon.svelte'
	import { splitName } from '$lib/utils'

	export let friend
	export let known
	export let following
</script>

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

		{#if known && following}
			<Icon name="friendship" aria="hidden" />
		{:else if known}
			<Icon name="following" aria="hidden" />
		{:else if friend.follows}
			<Icon name="follows" aria="hidden" />
		{/if}
	</summary>

	<ul>
		<a href="/follows/discover?id={friend.userId}">follows</a>
		{#each friend.lists as list}
			<li>
				<a href="/follows/{friend.userId}/{splitName(list)}/?id={list}">
					{splitName(list)}
				</a>
			</li>
		{/each}
		<!-- {#each friend.knows as know}
								{know}
							{/each} -->
	</ul>
</details>

<style lang="scss">
	summary {
		padding: 0.5rem;
		font-size: 1.15rem;
		border-top: 1px solid var(--clr-light);
		background-color: var(--clr-primary-bg-alt);
	}

	img {
		width: 32px;
		aspect-ratio: 1;
	}
</style>
