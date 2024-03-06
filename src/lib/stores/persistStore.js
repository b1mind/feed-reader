import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const persistStore = function (key, initial) {
	// if (browser && !document.hasStorageAccess()) document.requestStorageAccess()

	const persist = browser ? localStorage.getItem(key) : false
	const data = persist ? JSON.parse(persist) : initial

	const store = writable(data, () => {
		const unsubscribe = store.subscribe((value) => {
			browser ? localStorage.setItem(key, JSON.stringify(value)) : false
		})
		return unsubscribe
	})
	return store
}
