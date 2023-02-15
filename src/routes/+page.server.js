export async function load({ locals, parent }) {
	// const parentData = await parent()
	// const session = JSON.parse(await parentData.session)
	console.log(locals.allSessions)

	return {
		allSessions: locals.allSessions,
	}
}
