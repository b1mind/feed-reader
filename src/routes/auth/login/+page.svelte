<script>
	import { localSettings } from '$lib/stores'

	let provider = $localSettings.savedProvider
	let saveProvider = true
	let required = provider || true

	function save(e) {
		if (saveProvider) {
			$localSettings.savedProvider = provider
		}
	}
</script>

<br />
<form method="POST" action="/auth/login?/sendIt" on:submit={save}>
	<label for="provider">
		Pod provider
		<input
			name="provider"
			type="text"
			placeholder="https://solidcommunity.net/"
			bind:value={provider}
			{required}
		/>
	</label>

	<button>login</button>
	<label for="saveProvider">
		<input id="saveProvider" type="checkbox" bind:checked={saveProvider} />
		save
	</label>

	<!-- //fixme ssr this needs to be sent with form or in params -->
	<p>Login with (NodeSolidServer) provider</p>
	<button on:click={() => (provider = 'https://inrupt.net')}>
		Inrupt.net
	</button>
	<button on:click={() => (provider = 'https://solidcommunity.net')}>
		SolidCommunity.net
	</button>
	<button on:click={() => (provider = 'https://datapod.igrant.io')}>
		igrant.io
	</button>
	<button on:click={() => (provider = 'https://solidweb.org ')}>
		solidweb.org
	</button>
</form>
