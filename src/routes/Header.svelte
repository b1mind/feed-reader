<script>
	import { fade, fly, slide } from 'svelte/transition'
	import { beforeNavigate, afterNavigate } from '$app/navigation'
	import { page, navigating } from '$app/stores'
	import Loadbar from './Loadbar.svelte'
	// import { applyAction, enhance } from '$app/forms'
	// import { invalidateAll } from '$app/navigation'
</script>

<div class="bar">
	<header>
		<!-- todo animate page/loader -->
		<nav>
			<a href="/">home</a>
			{#if !$page.data?.user?.info}
				<a href="/auth/login"> login </a>
			{:else}
				<!-- <a href="/fetch">cacheTest</a> -->
				<!-- <a href="/rdf">rdfTest</a> -->
				<a data-sveltekit-preload-data href="/follows">follows</a>
				<a data-sveltekit-preload-data href="/lists">lists</a>

				<!-- do I need to enhance the logout? animate some feedback if used -->
				<!--
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		-->

				<!-- //note link or form/btn..  -->

				<!-- remove: just having fun with ideas -->
				<!-- <div class="layer">
			<div class="icon">
				<Icon name="settings" width="18px" height="18" />
			</div>
		</div> -->

				<a class="pfp" href="/profile">
					<img src={$page.data.user.img} alt="profile" />
				</a>
			{/if}
		</nav>
	</header>

	<!-- <div class="loadbar">
		{#if loading}
			<div class:loading in:fade out:fade></div>
		{/if}
	</div> -->
</div>

<Loadbar />

<style lang="scss">
	.bar {
		grid-column: full;
		position: sticky;
		top: 0;
		display: grid;
		grid-template-columns: inherit;
		background-color: var(--clr-primary-bg);
		z-index: 999;
	}

	header {
		grid-column: popout;
		padding-block: var(--gap-sm);
	}

	nav {
		align-items: center;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr auto;
		//hack to make 1fr child not fill
		justify-items: start;
		gap: var(--gap-sm);
		font-size: 1.3rem;

		@media (max-width: 460px) {
			display: flex;
			flex-wrap: wrap;
			justify-content: end;
			height: 1.69rem;
		}
	}

	a:not(:has(img)) {
		padding-block-end: 4px;
	}

	.pfp {
		width: 42px;
		height: 42px;
		aspect-ratio: 1;
		border: 2px solid var(--clr-primary);
		border-radius: 100vmax;
		overflow: hidden;
		cursor: pointer;
		img {
			width: 42px;
			height: 42px;
		}
	}
</style>
