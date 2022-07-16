<script>
	//this is where vite needed teh webpack polyfill? 💩
	//can't use solid helper methods cause module buffer externalized for browser
	// import { getUrl, getStringNoLocale } from '@inrupt/solid-client'

	//these work
	import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'
	import { session } from '$app/stores'
	// console.log($session)

	export let img
	export let name
	export let note

	// export let profileThing
	//here is the dataThing object try import with if browser?
	// console.log(profileThing)
</script>

<!-- todo post update to name -->
<!-- <input bind:value={name} type="text" name="name" /> -->
<div>
	LogginId: {$session.info.isLoggedIn}
</div>
<i>{note}</i>
<h1>{name}</h1>
<img src={img} alt="profile" />

<style lang="scss">
</style>
