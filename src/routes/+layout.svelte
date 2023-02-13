<script>
	import { fade, fly, slide } from 'svelte/transition'
	import { page } from '$app/stores'
	import { beforeNavigate, afterNavigate } from '$app/navigation'

	import Header from './Header.svelte'
	import '$lib/scss/global.scss'

	//use this logic to animate some how in a {#if} or {#key} block
	let loading = false
	beforeNavigate(() => {
		loading = true
	})

	afterNavigate(() => {
		loading = false
	})
</script>

<svelte:head>
	<title>
		{$page.url.pathname.replace('/', '')} - Pod RSS Reader
	</title>
</svelte:head>

<Header />

<slot />

<!-- todo animate page/loader proper -->
{#if loading}
	<div class:loading in:fade out:fade />
{/if}

<!-- {#key loading}
	<div in:slide={{ y: 200 }}>loading</div>
{/key} -->

<!-- todo need a footer yo or how can the page walk -->
<style>
	/* just an example how the same var we can hook into a style even css animate here */
	.loading {
		background-color: var(--clr-primary);
	}
</style>
