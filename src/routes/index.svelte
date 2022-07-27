<script>
	import { session } from '$app/stores'
	// export let msg
</script>

<h1>Just another RSS Reader</h1>
{#if $session.info}
	Welcome {$session.info.nick} you are logged in.
{/if}

<!-- {#if msg}
	{msg}
{/if} -->
