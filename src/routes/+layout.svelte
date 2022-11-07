<script>
	import Header from './Header.svelte'
	import '$lib/scss/global.scss'
</script>

<Header />
<!-- todo put a session check here or let the pages/routes handle it? -->

<slot />

<!-- todo need a footer yo or how can the page walk -->
