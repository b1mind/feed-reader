<script>
	export let data
</script>

{#await data.rssLists}
	loading rssLists
{:then rssLists}
	{#each rssLists as list}
		<p>
			{list}
		</p>
	{/each}
{/await}
