<script>
	import { page } from '$app/stores'
</script>

{#if !$page.data.user}
	<p>not logged in</p>
{:else}
	<main>
		<h1>{$page.data.user.name}: {$page.data.user.nick}</h1>
		<img src={$page.data.user.img} width="300px" alt="profile" />
		<p>
			<i>{$page.data.user.note}</i>
			<i>{$page.data.user.contacts}</i>
		</p>
	</main>
{/if}
