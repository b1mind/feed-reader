import { json, error } from '@sveltejs/kit'
// import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'

export async function GET(event) {
	const sesh = event.locals?.seshInfo
	//we should return Respose.redirect({}, 302)?
	if (!sesh) return json({ error: 'not logged in' })

	const webId = new URL(sesh.webId)
	const response = await event.fetch(`${webId.origin}/public/test.json`)
	let data

	// console.log(response.headers)
	// console.log(await response.text())
	try {
		data = await response.json()
	} catch (error) {
		//run if dev check for reporting server to browser? or hide from users?
		return json({ error: response.statusText })
	}

	if (!response.ok) {
		//fixme error not working in endpoint? wants new Response()
		return json({ error: 'Data not in pod' })
	}

	return json(data, {
		headers: {
			'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
		},
	})
}

//need away to handle cache/saving data till changed
// event.setHeaders({
// 	'Cache-Control': 'max-age=60',
// })

// test POST endpoint
// export async function POST(event) {
// 	const data = await event.request.formData()
// 	const email = data.get('email')

// 	console.log(email)
// 	return new Response(JSON.stringify({ success: true }), {
// 		headers: { 'Content/Type': 'application/json' },
// 	})
// }
