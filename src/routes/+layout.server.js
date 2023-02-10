export async function load({ locals, cookies, url }) {
	// if (url.pathname.includes('/redirected')) {
	// 	console.log('layout.redirected')
	// 	// console.log(locals)
	// 	// await locals.session.handleIncomingRedirect(`${url.href}`)
	// 	console.log('handled')
	// }

	return {
		info: locals?.session?.info,
	}
}
