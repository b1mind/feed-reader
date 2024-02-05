<script>
	export let data

	const names = []
	data.lists.forEach((list) => {
		names.push(list.split('/').pop().split('.').shift())
	})
</script>

<ul>
	{#each names as name}
		<li>
			<a href="/feed/{name}">
				{name}
			</a>
		</li>
	{/each}
</ul>
