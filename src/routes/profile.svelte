<script>
	import { session } from '$app/stores'
</script>

{#if $session.info}
	<h1>{$session.info.name}: {$session.info.nick}</h1>
	<img src={$session.info.img} width="300px" alt="profile" />
	<p>
		<i>{$session.info.note}</i>
	</p>
{:else}
	<p>nothing to display <a href="/login">login</a></p>
{/if}

<style lang="scss">
</style>
