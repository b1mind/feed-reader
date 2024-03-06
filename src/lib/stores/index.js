import { persistStore } from '$lib/stores/persistStore'

const data = {
	seenPosts: [],
	savedProvider: '',
	favPosts: '',
	settings: {
		target: true,
		layout: false,
		order: false,
		hidden: false,
	},
}

export const localSettings = persistStore('localSettings', data)

export const testStore = persistStore('teststore', 'testing this shit')
