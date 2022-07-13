<script context="module">
	import {
		getSessionFromStorage,
		getSessionIdFromStorageAll,
		Session,
	} from '@inrupt/solid-client-authn-node'

	export async function load({ session }) {
		const solidSession = new Session()
		session.sessionId = solidSession.info.sessionId
		let redirect = ''

		const handleSolidRedirect = async (url) => {
			return (redirect = url)
		}

		await solidSession.login({
			// After login, the Solid Identity Provider will send the user back to the following
			// URL, with the data necessary to complete the authentication process
			// appended as query parameters:
			redirectUrl: `http://localhost:3000/redirected`,
			// Set to the user's Solid Identity Provider; e.g., "https://login.inrupt.com"
			oidcIssuer: 'https://login.inrupt.com',
			// Pick an application name that will be shown when asked
			// to approve the application's access to the requested data.
			clientName: 'Feed Reader',
			handleRedirect: handleSolidRedirect,
		})

		return {
			status: '302',
			redirect: redirect,
		}
	}
</script>
