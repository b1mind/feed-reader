<script>
	import { page } from '$app/stores'
</script>

{#if !$page.data?.info}
	<h1>Solid RSS</h1>
	<p>You need to login to use this app</p>
{:else}
	<h1>Welcome</h1>
{/if}
