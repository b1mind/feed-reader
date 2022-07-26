<script>
	import { session } from '$app/stores'
</script>

<nav>
	<a href="/">home</a>
	{#if $session.info}
		<a sveltekit:prefetch href="/profile">profile</a>
		<a sveltekit:prefetch href="/feed">feed</a>
		<a sveltekit:reload href="/logout">logout</a>
	{:else}
		<a sveltekit:reload href="/login">login</a>
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
