export async function load({ locals, cookies, url }) {
	//do we need to pass this data down to pages or use locals in them?
	return {
		info: locals?.session?.info,
	}
}
