<script>
	import { page } from '$app/stores'
	import Icon from '$lib/components/Icon.svelte'
	// import { applyAction, enhance } from '$app/forms'
	// import { invalidateAll } from '$app/navigation'
</script>

<nav>
	<a href="/">home</a>
	{#if !$page.data?.user?.info}
		<a href="/auth/login"> login </a>
	{:else}
		<!-- <a href="/fetch">cacheTest</a> -->
		<!-- <a href="/rdf">rdfTest</a> -->
		<a data-sveltekit-preload-data href="/profile">profile</a>
		<a data-sveltekit-preload-data href="/follows">follows</a>
		<a data-sveltekit-preload-data href="/feed">feed</a>

		<!-- do I need to enhance the logout? animate some feedback if used -->
		<!--
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		-->

		<div class="pfp">
			<img src={$page.data.user.img} alt="profile" />
		</div>

		<!-- //note link or form/btn..  -->
		<form action="/auth/logout" method="POST">
			<button class="btn" type="submit">
				Logout
				<Icon name="logout" width="18px" height="18px" />
			</button>
			<!-- <button formaction="/api/feed?/test">test</button> -->
		</form>
	{/if}
</nav>

<style lang="scss">
	nav {
		padding-block: 10px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		font-size: 1.3rem;
	}

	.pfp {
		width: 42px;
		aspect-ratio: 1;
		border: 2px solid var(--clr-primary);
		border-radius: 100vmax;
		overflow: hidden;
	}
</style>
