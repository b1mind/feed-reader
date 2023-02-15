import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.seshInfo?.isLoggedIn) throw redirect(302, '/auth/login')
	return {}
}
