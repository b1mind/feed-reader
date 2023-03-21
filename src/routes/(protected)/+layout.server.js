import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.session.data.info.isLoggedIn) throw redirect(302, '/auth/login')
	return {}
}
