export async function GET({ locals }) {
	return {
		body: {
			sessionData: locals.session.data,
		},
	}
}
