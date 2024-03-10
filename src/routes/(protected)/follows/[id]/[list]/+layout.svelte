<script>
	import { slugify } from '$lib/utils'
	import { page } from '$app/stores'

	export let data
</script>

<section>
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

	<div>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 35ch 1fr;
		@media (max-width: 600px) {
			grid-template-columns: 1fr;
		}
	}
</style>
