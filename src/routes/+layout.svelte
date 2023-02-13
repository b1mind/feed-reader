<script>
	import { fly, slide } from 'svelte/transition'
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
		Pod RSS Reader {$page.url.pathname.replace('/', '- ').toUpperCase}
	</title>
</svelte:head>

<Header />

<slot />

<!-- todo animate page/loader -->
{#if loading}
	<div in:slide={{ y: 200 }}>loading</div>
{/if}

<!-- {#key loading}
	<div in:slide={{ y: 200 }}>loading</div>
{/key} -->

<!-- todo need a footer yo or how can the page walk -->
