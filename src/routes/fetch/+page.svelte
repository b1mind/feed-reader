<script>
	export let data
</script>

{#each data.list as { name }}
	<p>
		{name}
	</p>
{/each}
