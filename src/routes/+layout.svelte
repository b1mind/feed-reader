<script>
	import { page } from '$app/stores'

	import Header from './Header.svelte'
	import Icon from '$lib/components/Icon.svelte'

	import '$lib/scss/global.scss'

	//needs work
	$: pathname = $page.url.pathname.replace('/', '')
	$: pageTile = pathname ? pathname : 'Home'

	let showOnPx = 150
	let btnHide = true

	function scrollToTop() {
		document.body.scrollIntoView()
		// for js scroll? or just use html smooth scroll cause its ez.. peezy
		// const c = document.documentElement.scrollTop || document.body.scrollTop
		// if (c > 0) {
		// 	window.requestAnimationFrame(scrollToTop)
		// 	window.scrollTo(0, c - c / 10)
		// }
	}

	function handleOnScroll() {
		const scrollTop =
			document.documentElement.scrollTop || document.body.scrollTop

		if (!scrollTop) return
		if (scrollTop > showOnPx) {
			btnHide = false
		} else {
			btnHide = true
		}
	}
</script>

<svelte:window on:scroll={handleOnScroll} />

<svelte:head>
	<title>
		{pageTile} - PodRSS.social
	</title>
</svelte:head>

<div class="layout">
	<Header />

	<main>
		<slot />
	</main>
</div>

<button
	aria-label="back to top"
	type="button"
	class="btn btnTop"
	class:btnHide
	on:click={scrollToTop}
>
	<Icon name="up-outline" />
</button>

<!-- {#key loading}
	<div in:slide={{ y: 200 }}>loading</div>
{/key} -->

<!-- todo need a footer yo or how can the page walk -->
<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 280px 1fr;
		@media (max-width: 460px) {
			grid-template-columns: 1fr;
		}
	}

	.btnTop {
		--fill: var(--clr-light);
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		padding: 0.25rem;
		border-radius: 100%;
		transition: all 0.5s ease-in-out;
		z-index: 999;
	}

	.btnHide {
		bottom: 0;
		visibility: hidden;
		opacity: 0;
	}
</style>
