export async function load({ locals, cookies, url }) {
	//do we need to pass this data down to pages or use locals in them?
	//can we check a local/session storage that tells us session.info
	//todo clean up checking both and stick to sesh?
	return {
		info: locals?.session?.info || locals?.seshInfo,
	}
}
