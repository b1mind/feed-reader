<script>
	import { session } from '$app/stores'
</script>

<h1>Just another RSS Reader</h1>
{#if $session.info}
	{$session.sessionId}
{/if}
