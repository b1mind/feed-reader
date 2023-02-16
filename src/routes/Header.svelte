<script>
	import { page } from '$app/stores'
	// import { applyAction, enhance } from '$app/forms'
	// import { invalidateAll } from '$app/navigation'
</script>

<nav>
	<a href="/">home</a>
	<a href="/fetch">cacheTest</a>
	{#if !$page.data?.info?.isLoggedIn}
		<!-- <a href="/login" rel="external">login</a> -->
		<a href="/auth/login">login</a>
	{:else}
		<a href="/api/feed">apiTest</a>
		<a data-sveltekit-preload-data href="/profile">profile</a>
		<a data-sveltekit-preload-data href="/friends">friends</a>
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

		<form action="/auth/logout" method="POST">
			<button type="submit">logout</button>
			<button formaction="/api/feed?/test">test</button>
		</form>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.3rem;
	}
</style>
