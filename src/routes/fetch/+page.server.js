export async function load({ locals, fetch }) {
	const webId = new URL(locals.seshInfo.webId)
	const response = await fetch(
		`${webId.origin}/public/feedReader/rssList.ttl`,
		{}
	)
	return {
		list: await response.text(),
	}
}
