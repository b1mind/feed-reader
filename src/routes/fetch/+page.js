export async function load({ locals, fetch }) {
	// const webId = new URL(locals.seshInfo.webId)
	// const response = await fetch(`${webId.origin}/public/test.json`)
	const response = await fetch('/api/json')
	// console.log(`${webId.origin}/public/test.json`)

	const data = await response.json()

	//todo figure out how to retrun json from RDF (might require a better save state to pod)
	//we can also save json files but is that really how we going to cop out? no RDF! learn!
	return {
		list: data,
	}
}
