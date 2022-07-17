import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return
	return locals.session.data
}

export const handle = handleSession(
	// should probably make a real secret sumday
	// no sensitive data being passed atm.
	{ secret: 'SUPER_NOTSECRET_SECRET_32_CHARATERS_OR_MORE' },
	async ({ event, resolve }) => {
		const response = await resolve(event)

		return response
	}
)
