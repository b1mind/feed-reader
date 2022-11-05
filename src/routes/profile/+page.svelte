<script>
	import { session } from '$app/stores'
</script>

{#if $session.user}
	<main>
		<h1>{$session.user.name}: {$session.user.nick}</h1>
		<img src={$session.user.img} width="300px" alt="profile" />
		<p>
			<i>{$session.user.note}</i>
			<i>{$session.user.contacts}</i>
		</p>
	</main>
{/if}

<style lang="scss">
</style>
