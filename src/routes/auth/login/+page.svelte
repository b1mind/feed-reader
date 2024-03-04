<script>
	import { localSettings } from '$lib/utils/settings'

	$: provider = $localSettings.savedProvider
	let required = provider || true
	let saveProvider = true

	function save(e) {
		console.log(e, saveProvider)
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
		<input type="checkbox" value={saveProvider} />
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
