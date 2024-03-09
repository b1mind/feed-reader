<script>
	import { navigating } from '$app/stores'

	let loading = 'no'

	$: {
		if ($navigating) {
			setTimeout(() => {
				loading = 'yes'
			}, 50)
		} else {
			loading = 'closing'
			setTimeout(() => {
				loading = 'no'
			}, 300)
		}
	}

	let percentage = 0

	$: {
		if (loading === 'closing') {
			percentage = 1
		}
	}

	function load(_node) {
		let timeout
		const handle = () => {
			if (percentage < 0.7) {
				percentage += Math.random() * 0.2
				timeout = setTimeout(handle, Math.random() * 1000)
			}
		}
		handle()
		return {
			destroy() {
				clearTimeout(timeout)
				percentage = 0
			},
		}
	}
</script>

{#if loading !== 'no'}
	<div use:load style:--percentage={percentage} />
{/if}

<style>
	div {
		position: fixed;
		inset: 0;
		bottom: auto;
		height: var(--loader-height, 2px);
		transform-origin: left;
		transform: scaleX(calc(var(--percentage) * 100%));
		background-color: var(--clr-primary);
		transition: transform 250ms;
		z-index: 99990;
	}
</style>
