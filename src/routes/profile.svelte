<script>
	import { session } from '$app/stores'
	import { fade } from 'svelte/transition'
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
{:else}
	<p>nothing to display <a href="/login">login</a></p>
{/if}

<style lang="scss">
</style>
