<script>
	import { session } from '$app/stores'
	// export let msg
</script>

<h1>Welcome</h1>
{#if $session.user}
	{$session.user.nick} you are logged in.
{/if}
