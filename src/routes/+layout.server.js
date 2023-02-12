export async function load({ locals, cookies, url }) {
	//do we need to pass this data down to pages or use locals in them?
	//can we check a local/session storage that tells us session.info
	console.log(locals?.seshInfo)
	return {
		info: locals?.session?.info || locals?.seshInfo,
	}
}
