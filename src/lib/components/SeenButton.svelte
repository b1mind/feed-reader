<script>
	$: hidden = false

	function hideSeen() {
		const allSeen = document.querySelectorAll('.seen')
		for (const post of allSeen) {
			post.classList.toggle('hidden')
		}
		hidden = !hidden
	}
</script>

<button type="button" on:click={hideSeen}>
	{hidden ? 'showSeen' : 'hideSeen'}
</button>
