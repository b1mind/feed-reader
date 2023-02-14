// import { error } from '@sveltejs/kit'

export async function load({ locals, fetch }) {
	const response = await fetch('/api/json')

	//need to figure out code to send and respond to with msg from endpoint
	if (!response.ok) return {}

	//we bypass this for now just return blank object
	// throw error(response.status, { message: 'Data not found in Pod' })

	return {
		list: await response.json(),
	}
}
