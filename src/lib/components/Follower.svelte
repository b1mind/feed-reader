<script>
	import Icon from '$lib/components/Icon.svelte'
	import { splitName } from '$lib/utils'

	export let friend
	export let known
	export let following
</script>

<details>
	<summary>
		{#if friend.img}
			<img src={friend.img} alt={friend.nick} />
		{/if}

		<b>
			{friend.nick || friend.name}
		</b>

		<!-- <a href="/follows/lists?id={friend.userId}">
			webId
		</a> -->

		{#if known && following}
			<Icon name="friendship" aria="hidden" />
		{:else if known}
			<Icon name="following" aria="hidden" />
		{:else if friend.follows}
			<Icon name="follows" aria="hidden" />
		{/if}
	</summary>

	<a href="/follows/discover?id={friend.userId}">follows</a>
	<ul>
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
	details {
		background-color: var(--clr-secondary-bg-alt);
	}

	summary {
		padding: 0.5rem;
		font-size: 1.15rem;
		background-color: var(--clr-secondary-bg);
	}

	img {
		width: 32px;
		aspect-ratio: 1;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
		text-align: center;
		font-size: 1.2rem;
		border-top: 1px solid var(--clr-secondary-bg);
		border-bottom: 1px solid var(--clr-secondary-bg);

		& > a {
			padding: 0.75rem;
			display: block;
		}
	}

	li + li {
		border-top: unset;
	}
</style>
