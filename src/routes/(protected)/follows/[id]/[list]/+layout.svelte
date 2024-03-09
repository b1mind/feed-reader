<script>
	import { slugify } from '$lib/utils'
	import { page } from '$app/stores'
	export let data
	console.log($page.params)
</script>

<ul>
	{#each data.rssList as list}
		<li>
			<a
				href="/follows/{$page.params.id}/{$page.params.list}/{slugify(
					list.name,
				)}?xml={list.href}">{list.name}</a
			>
		</li>
	{/each}
</ul>

<slot />
