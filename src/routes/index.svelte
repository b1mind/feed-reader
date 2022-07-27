<script>
	import { session } from '$app/stores'
	// export let msg
</script>

<h1>Just another RSS Reader</h1>
{#if $session.user}
	Welcome {$session.user.nick} you are logged in.
{/if}

<!-- {#if msg}
	{msg}
{/if} -->
