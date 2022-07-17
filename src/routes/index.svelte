<script>
	import { session } from '$app/stores'
	console.log($session)
</script>

<h1>Just another RSS Reader</h1>
{#if $session.info}
	{$session.sessionId}
{/if}
