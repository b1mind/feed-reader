import { json } from '@sveltejs/kit'
// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET(event) {
	const sesh = event.locals?.seshInfo
	if (!sesh) return
	// const session = await getSessionFromStorage(event.locals.seshInfo.sessionId)
	const webId = new URL(sesh.webId)
	const response = await event.fetch(`${webId.origin}/public/test.json`)
	let data = await response.json()

	//need away to handle cache/saving data till changed
	// event.setHeaders({
	// 	'Cache-Control': 'max-age=60',
	// })

	return json(data)
}

// export async function POST(event) {
// 	const data = await event.request.formData()
// 	const email = data.get('email')

// 	console.log(email)
// 	return new Response(JSON.stringify({ success: true }), {
// 		headers: { 'Content/Type': 'application/json' },
// 	})
// }
