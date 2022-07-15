export async function GET({ locals }) {
	return {
		body: {
			sessionId: locals.session.data.sessionId,
		},
	}
}
