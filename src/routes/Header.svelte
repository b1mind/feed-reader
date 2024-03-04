<script>
	import { page } from '$app/stores'
	// import { applyAction, enhance } from '$app/forms'
	// import { invalidateAll } from '$app/navigation'
</script>

<nav>
	<a href="/">home</a>
	{#if !$page.data?.info}
		<a href="/auth/login">login</a>
	{:else}
		<!-- <a href="/fetch">cacheTest</a> -->
		<!-- <a href="/rdf">rdfTest</a> -->
		<a data-sveltekit-preload-data href="/profile">profile</a>
		<a data-sveltekit-preload-data href="/follows">follows</a>
		<a data-sveltekit-preload-data href="/feed">feed</a>

		<!-- do I need to enhance the logout? animate some feedback if used -->
		<!--
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		-->

		<!-- //note link or form/btn..  -->
		<form action="/auth/logout" method="POST">
			<button type="submit">logout</button>
			<!-- <button formaction="/api/feed?/test">test</button> -->
		</form>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		font-size: 1.3rem;
	}
</style>
