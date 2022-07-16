<script>
	import { session } from '$app/stores'
	console.log($session)

	export let sessionData
</script>

<h1>Just another RSS Reader</h1>
{sessionData.sessionId}
