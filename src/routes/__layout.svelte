<script>
	import { session } from '$app/stores'
	import Header from '$lib/Header.svelte'
	import '$lib/scss/global.scss'
</script>

<Header />
<!-- todo put a session check here? -->

{#if $session.user}
	<slot />
{:else}
	<h1>Solid RSS</h1>
	<p>You need to login to use this app</p>
{/if}

<style lang="scss">
</style>
