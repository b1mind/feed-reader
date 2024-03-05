<script>
	import Icon from '$lib/components/Icon.svelte'

	export let data
</script>

{#if !data.user}
	<p>not logged in</p>
{:else}
	<main>
		<h1>{data.user.name}: {data.user.nick}</h1>
		<img src={data.user.img} width="300px" alt="profile" />
		<p>
			<i>{data.user.note || ``}</i>
			<i>{data.user.contacts || ``}</i>
		</p>

		<form action="/auth/logout" method="POST">
			<button class="btn" type="submit">
				Logout
				<Icon name="logout" width="16px" height="16px" />
			</button>
			<!-- <button formaction="/api/feed?/test">test</button> -->
		</form>
	</main>
{/if}
