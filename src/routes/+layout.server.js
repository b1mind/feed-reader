export async function load({ locals }) {
	return {
		session: locals.info,
	}
}
