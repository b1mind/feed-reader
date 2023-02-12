import { getSessionIdFromStorageAll } from '@inrupt/solid-client-authn-node'
import { fromRDF } from 'jsonld'
import { redirect } from '@sveltejs/kit'

export async function load({}) {
	const allSession = await getSessionIdFromStorageAll()

	return {
		allSession,
	}
}
