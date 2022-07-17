<script>
	import { session } from '$app/stores'
</script>

<nav>
	<a href="/">home</a>
	{#if $session.info}
		<a href="/test">test</a>
		<a href="/logout">logout</a>
	{:else}
		<a href="/login">login</a>
	{/if}
</nav>

<style lang="scss">
</style>
