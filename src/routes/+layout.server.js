export async function load({ locals, cookies }) {
	console.log('layout local')
	return {
		// session: await getSessionFromStorage(sessionCookie),
		info: locals?.session?.info,
	}
}
