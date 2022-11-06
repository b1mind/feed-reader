<script>
	import { page } from '$app/stores'
	console.log($page.data.info.isLoggedIn)
</script>

<!-- {#if $session.user}
	<main>
		<h1>{$session.user.name}: {$session.user.nick}</h1>
		<img src={$session.user.img} width="300px" alt="profile" />
		<p>
			<i>{$session.user.note}</i>
			<i>{$session.user.contacts}</i>
		</p>
	</main>
{/if} -->
