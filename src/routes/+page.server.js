import { getSessionIdFromStorageAll } from '@inrupt/solid-client-authn-node'

export async function load({ locals }) {
	if (!locals.session) return {}
	const allSession = await getSessionIdFromStorageAll()

	//playing with session.fetch.. what to do with it?
	const url = new URL(locals.session.info.webId).origin
	console.log(
		await (
			await locals.session.fetch(`${url}/public/feedReader/rssList.ttl`)
		).text()
	)

	return {
		allSession,
	}
}
