<script>
	import { page } from '$app/stores'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
</script>

<nav>
	<a href="/">home</a>
	{#if !$page.data.info}
		<a href="/login">login</a>
	{:else}
		<a data-sveltekit-prefetch href="/profile">profile</a>
		<a href="/friends">friends</a>
		<a data-sveltekit-prefetch href="/feed">feed</a>

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
		font-size: 1.3rem;
	}

	a {
		color: var(--clr-primary);
	}
</style>
