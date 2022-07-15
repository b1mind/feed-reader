<script>
	import { session } from '$app/stores'
	console.log($session.sessionId)
	export let sessionId
</script>

<h1>Just another RSS Reader</h1>
{sessionId}
