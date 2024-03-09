export function compareDates(a, b) {
	const dateA = new Date(a.published)
	const dateB = new Date(b.published)
	return dateB - dateA // This will sort in descending order
}

export function flattenItemsIntoObjects(posts) {
	let newObjects = []
	posts.forEach((post) => {
		post.items.forEach((item) => {
			const newObject = {
				title: item.title,
				published: item.published,
				link: item.link,
				snippet: item.snippet,
				media: item.media,
				feedTitle: post.title,
			}

			newObjects.push(newObject)
		})
	})

	return newObjects
}

export function parseTitle(str) {
	return str.split('<title>')[1].split('</title>')[0]
}

export function splitName(name) {
	return name.split('/').pop().split('.').shift()
}

export const nameSort = (a, b) => {
	let nameA = a.name.toLowerCase()
	let nameB = b.name.toLowerCase()

	if (nameA < nameB) return -1
	if (nameA > nameB) return 1
	return 0
}

export function slugify(string) {
	return string.replaceAll(' ', '-').toLowerCase()
}

export function safeSpace(string) {
	return string.replaceAll(' ', '%20')
}

export function keepOnlyLetters(str) {
	var result = ''
	for (var i = 0; i < str.length; i++) {
		var char = str[i]
		if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
			result += char
		}
	}
	return result
}

export function getRandomItems(sourceArray, numberOfItems) {
	const result = []
	for (var i = 0; i < numberOfItems; i++) {
		const index = Math.floor(Math.random() * sourceArray.length)
		result.push(sourceArray[index])
		sourceArray.splice(index, 1)
	}
	return result
}
