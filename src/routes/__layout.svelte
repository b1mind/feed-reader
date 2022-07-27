<script>
	import { slide } from 'svelte/transition'
	import Header from '$lib/Header.svelte'
	import '$lib/scss/global.scss'
</script>

<Header />
<!-- todo put a session check here? -->
<div transition:slide />
<slot />

<style lang="scss">
</style>
