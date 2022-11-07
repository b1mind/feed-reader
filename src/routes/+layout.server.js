export async function load({ locals }) {
	if (!locals.session) return
	return {
		info: locals.session.info,
	}
}
