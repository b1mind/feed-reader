<script>
	export let data

	console.log(data)
</script>

{#each data.lists as list}
	{@const listName = list.split('/').pop().split('.').shift()}
	<a href="{data.friend}/{listName}?id={list}">{listName}</a>
{/each}
