<script>
	import { page } from '$app/stores'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
</script>

<nav>
	<a href="/">home</a>
	<a href="/public">404Test</a>
	{#if !$page.data?.info?.isLoggedIn}
		<!-- <a href="/login" rel="external">login</a> -->
		<a href="/login">login</a>
	{:else}
		<a href="/fetch">apiTest</a>
		<a data-sveltekit-preload-data href="/profile">profile</a>
		<a data-sveltekit-preload-data href="/friends">friends</a>
		<a data-sveltekit-preload-data href="/feed">feed</a>

		<form
			action="/logout"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		>
			<button type="submit">logout</button>
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
