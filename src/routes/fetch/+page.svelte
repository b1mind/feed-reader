<script>
	export let data
</script>

{#if data}
	{#each data.list as { name }}
		<p>
			{name}
		</p>
	{/each}
{/if}
<p>nothing to display</p>
