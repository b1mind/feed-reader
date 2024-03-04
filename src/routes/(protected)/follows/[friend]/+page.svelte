<script>
	export let data

	console.log(data)
</script>

<ul>
	{#each data.lists as list}
		{@const listName = list.split('/').pop().split('.').shift()}
		<li>
			<a data-sveltekit-preload-data href="{data.friend}/{listName}?id={list}">
				{listName}
			</a>
		</li>
	{/each}
</ul>
