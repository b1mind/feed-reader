export async function load({ fetch }) {
	const response = await fetch('/api/json')

	//need to figure out code to send and respond to with msg from endpoint
	if (!response.ok) return {}

	return {
		list: await response.json(),
	}
}
