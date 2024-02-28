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
