<script>
	export let data
</script>

{#if !data.list.error}
	{#each data.list as { name }}
		<p>
			{name}
		</p>
	{/each}
{:else if data.list.error}
	<p>error: {data.list.error}</p>
{:else}
	<p>nothing to display</p>
{/if}
