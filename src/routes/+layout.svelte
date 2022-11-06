<script>
	// import { session } from '$app/stores'
	import Header from './Header.svelte'
	import '$lib/scss/global.scss'
</script>

<Header />
<!-- todo put a session check here? -->

<slot />
