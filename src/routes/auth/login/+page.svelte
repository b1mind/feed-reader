<script>
	let provider
	let required = provider || true
</script>

<br />
<form method="POST" action="/auth/login?/sendIt">
	<label for="provider">
		Pod provider
		<input
			name="provider"
			type="text"
			placeholder="ex: https://inrupt.net/"
			bind:value={provider}
			{required}
		/>
	</label>
	<button>login</button>
	<button on:click={() => (provider = 'https://inrupt.net')}>
		Inrupt.net
	</button>
	<button on:click={() => (provider = 'https://solidcommunity.net')}>
		Solid Community
	</button>
</form>
