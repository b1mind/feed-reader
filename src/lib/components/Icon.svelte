<script>
	import sprite from '$lib/assets/sprite.svg'

	export let name
	export let width = '24'
	export let height = '24'
	export let aria = `aria-label="${name}"`
	aria = aria === 'hidden' ? 'aria-hidden=true' : aria
</script>

<svg {aria} {height} {width}>
	<use href="{sprite}#{name}" />
</svg>

<!-- <style lang="scss">
	//leave this up to parent?
	svg {
		--fill: var(--clr-primary);
	}

	svg:hover {
		--fill: unset;
	}
</style> -->
