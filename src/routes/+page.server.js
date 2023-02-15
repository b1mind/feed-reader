export async function load({ locals, parent }) {
	//we can wait parent data from layout.server
	// const parentData = await parent()
	// const session = JSON.parse(await parentData.session)

	return {
		allSessions: locals?.allSessions,
	}
}
