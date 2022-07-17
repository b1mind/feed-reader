<script>
	//this is where vite needed teh webpack polyfill? 💩
	//can't use solid helper methods cause module buffer externalized for browser
	// import { getUrl, getStringNoLocale } from '@inrupt/solid-client'

	//these work
	// import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

	//lets pull from session rather than hit the pod api again.
	//we can use endpoint for post to make changes but we would need to reset session info like if pfp changed?
	import { session } from '$app/stores'
	// export let img
	// export let name
	// export let note

	// export let profileThing
	//here is the dataThing object try import with if browser?
	// console.log(profileThing)
</script>

<!-- todo post update to name -->
<!-- <input bind:value={name} type="text" name="name" /> -->
{#if $session.info}
	<div>
		LogginId: {$session.info.isLoggedIn}
	</div>
	<!-- <i>{note}</i> -->
	<h1>{$session.info.name}</h1>
	<img src={$session.info.img} alt="profile" />
{:else}
	<p>nothing to display <a href="/login">login</a></p>
{/if}

<style lang="scss">
</style>
