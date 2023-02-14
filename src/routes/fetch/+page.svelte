<script>
	export let data
</script>

{#if !data.list.error}
	{#each data.list as { name }}
		<p>
			{name}
		</p>
	{/each}
{:else}
	<p>nothing to display: {data.list.error}</p>
{/if}
