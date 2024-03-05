<script>
	import { page } from '$app/stores'
	// import { applyAction, enhance } from '$app/forms'
	// import { invalidateAll } from '$app/navigation'
</script>

<header>
	<nav>
		<a href="/">home</a>
		{#if !$page.data?.user?.info}
			<a href="/auth/login"> login </a>
		{:else}
			<!-- <a href="/fetch">cacheTest</a> -->
			<!-- <a href="/rdf">rdfTest</a> -->
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

<style lang="scss">
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
		}
	}

	a:not(:has(img)) {
		padding-block-end: 4px;
	}
	//remove: when done playing around
	// .layer {
	// 	display: grid;
	// 	grid-template-areas: 'l';
	// 	& > * {
	// 		grid-area: l;
	// 	}
	// }

	// .icon {
	// 	place-self: end;
	// 	width: 24px;
	// 	padding: 2px;
	// 	transform: translate(6px, 8px);
	// 	border-radius: 50%;
	// 	background-color: var(--clr-primary-bg);
	// }

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
