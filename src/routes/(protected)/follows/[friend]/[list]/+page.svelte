<script>
	import { slugify } from '$lib/utils'
	import { page } from '$app/stores'
	export let data
</script>

<ul>
	{#each data.rssList as list}
		<li>
			<a
				href="/follows/{$page.params.friend}/{$page.params.list}/{slugify(
					list.name,
				)}/?xml={list.href}">{list.name}</a
			>
		</li>
	{/each}
</ul>
