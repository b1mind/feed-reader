import { invalidate } from '$app/navigation'
import { page } from '$app/stores'

export const enhance = (form) => {
	let invalidatePath = URL
	page.subscribe((path) => {
		invalidatePath = path.url
	})

	async function handleSubmit(event) {
		event.preventDefault()

		const response = await fetch(form.action, {
			method: form.method,
			headers: { accept: 'application/json' },
			body: new FormData(form),
		})
		console.log(form)

		if (!response.ok) {
			console.error(await response.text())
		}
	}

	let url = new URL(invalidatePath)
	url.search = ''
	url.hash = ''
	invalidate(url.href)

	form.addEventListener('submit', handleSubmit)

	// if (result) {
	// 	result({ form })
	// }

	return {
		distroy() {
			form.removeEventListener('submit', handleSubmit)
		},
	}
}
