import { persistStore } from '$lib/utils/persistStore'

const data = {
	seenPosts: [],
	savedProvider: '',
	favPosts: '',
}

export const localSettings = persistStore('localSettings', data)

export const testStore = persistStore('teststore', 'testing this shit')
