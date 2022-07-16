<script>
	import { session } from '$app/stores'
</script>

<nav>
	{#if $session.info}
		<a href="/logout">logout</a>
		<a href="/test">test</a>
	{:else}
		<a href="/login">login</a>
	{/if}
</nav>

<style lang="scss">
</style>
