<script>
	import { fade, fly, slide } from 'svelte/transition'
	import { page } from '$app/stores'
	import { beforeNavigate, afterNavigate } from '$app/navigation'

	import Header from './Header.svelte'
	import '$lib/scss/global.scss'

	//needs work
	$: pathname = $page.url.pathname.replace('/', '')
	$: pageTile = pathname ? pathname : 'Home'

	//use this logic to animate some how in a {#if} or {#key} block
	let loading = false
	beforeNavigate((e) => {
		if (e.from.url.origin === e.to.url.origin) {
			loading = true
		}
	})

	afterNavigate((e) => {
		loading = false
	})
</script>

<svelte:head>
	<title>
		{pageTile} - Pod RSS Reader
	</title>
</svelte:head>

<div class="layout">
	<Header />
	<div class="bar">
		<!-- todo animate page/loader -->
		{#if loading}
			<div class:loading in:fade out:fade>loading..</div>
		{/if}
	</div>

	<slot />
</div>

<!-- {#key loading}
	<div in:slide={{ y: 200 }}>loading</div>
{/key} -->

<!-- todo need a footer yo or how can the page walk -->
<style lang="scss">
	.bar {
		grid-column: content;
		display: grid;
		height: 10px;
	}

	//todo add better loader
	.loading {
		background-color: var(--clr-primary);
	}
</style>
