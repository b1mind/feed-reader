import { getSessionFromStorage } from '@inrupt/solid-client-authn-node'
import {
	getThingAll,
	getSolidDataset,
	getPodUrlAll,
	getThing,
	getUrl,
	getStringNoLocale,
} from '@inrupt/solid-client'
import { FOAF, VCARD, RDF } from '@inrupt/vocab-common-rdf'

import { handleSession } from 'svelte-kit-cookie-session'

export const getSession = ({ locals }) => {
	if (!locals.session) return {}
	return locals.session.data
}

export const handle = handleSession(
	{ secret: 'SUPER_NOTSECRET_SECRET_32_CHARATERS_OR_MORE' },
	async ({ event, resolve }) => {
		if (event.url.pathname === '/redirected') {
			console.log(event.url)
			//    If the user is sent back to the `redirectUrl` provided in step 2,
			//    it means that the login has been initiated and can be completed. In
			//    particular, initiating the login stores the session in storage,
			//    which means it can be retrieved as follows.
			const session = await getSessionFromStorage(
				event.locals.session.data.sessionId
			)

			//    With your session back from storage, you are now able to
			//    complete the login process using the data appended to it as query
			await session.handleIncomingRedirect(`${event.url.href}`)

			//   `session` now contains an authenticated Session instance.
			if (session.info.isLoggedIn) {
				const webId = session.info.webId

				const profileDataSet = await getSolidDataset(`${webId}`, {
					fetch: session.fetch,
				})

				const profileThing = getThing(profileDataSet, webId)
				const img = getUrl(profileThing, VCARD.hasPhoto)
				const name = getStringNoLocale(profileThing, FOAF.name)

				await event.locals.session.update(() => ({
					info: { ...session.info, img, name },
				}))

				return new Response(
					`Logged in with the WebID ${session.info.webId} as ${name}.`
				)
			}
		}

		if (event.url.pathname === '/logout') {
			const session = await getSessionFromStorage(
				event.locals.session.data.sessionId
			)
			await event.locals.session.destroy()
			session.logout()
			return new Response(`Logged out`)
		}
		const response = await resolve(event)

		return response
	}
)
