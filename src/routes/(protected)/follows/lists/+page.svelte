<script>
	import { page } from '$app/stores'
	export let data
	console.log($page)
</script>

<ul>
	{#each data.lists as list}
		{@const listName = list.split('/').pop().split('.').shift()}
		<li>
			<a
				data-sveltekit-preload-data
				href="{$page.url.pathname}/{listName}?id={list}"
			>
				{listName}
			</a>
		</li>
	{/each}
</ul>
