<script context="module">
	import {
		getSessionFromStorage,
		Session,
	} from '@inrupt/solid-client-authn-node'

	export async function load({ session, url }) {
		const solidSession = await getSessionFromStorage(session.sessionId)
		console.dir(solidSession)

		// 4. With your session back from storage, you are now able to
		//    complete the login process using the data appended to it as query
		//    parameters in req.url by the Solid Identity Provider:
		// await solidSession.handleIncomingRedirect(`http://localhost:3000`)

		// 5. `session` now contains an authenticated Session instance.
		// if (session.info.isLoggedIn) {
		// 	console.log(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
		// }
		return {
			solidSession,
		}
	}
</script>

<style lang="scss">
</style>
