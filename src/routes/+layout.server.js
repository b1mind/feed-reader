export async function load({ locals }) {
	console.log(locals.session)
	if (!locals.session) return
	return {
		info: locals.session.info,
	}
}
