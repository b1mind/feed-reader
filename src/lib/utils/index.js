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
