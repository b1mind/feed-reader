<script>
	import { localSettings } from '$lib/stores'
	import Icon from '$lib/components/Icon.svelte'

	let provider = $localSettings.savedProvider
	let saveProvider = !provider
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
		Pod
		<input
			name="provider"
			type="text"
			placeholder="https://solidcommunity.net/"
			bind:value={provider}
			{required}
		/>
	</label>

	<button class="btn">
		Login
		<Icon name="logout" width="18px" height="18px" />
	</button>
	<label for="saveProvider">
		<input id="saveProvider" type="checkbox" bind:checked={saveProvider} />
		save
	</label>

	<!-- //fixme ssr this needs to be sent with form or in params -->
	<br />
	<p>
		<label for="provider-select" aria-label="select provider">
			<select bind:value={provider}>
				<option value="https://inrupt.net"> Inrupt.net </option>
				<option value="https://solidcommunity.net"> SolidCommunity.net</option>
				<option value="https://datapod.igrant.io"> igrant.io</option>
				<option value="https://solidweb.org "> solidweb.org</option>
			</select>
		</label>
		Select (NSS) provider
	</p>
</form>
