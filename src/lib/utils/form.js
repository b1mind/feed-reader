import { invalidate } from '$app/navigation'
import { page } from '$app/stores'

export const enhance = (form, { result } = {}) => {
	let invalidatePath
	let error
	page.subscribe((path) => {
		invalidatePath = path.url
	})

	async function handleSubmit(event) {
		event.preventDefault()
		let btn = event.submitter
		btn.innerText = '⌛'

		const response = await fetch(form.action, {
			method: form.method,
			headers: { accept: 'application/json' },
			body: new FormData(form),
		})

		console.log(invalidatePath)
		btn.innerText = '➕'

		if (!response.ok) {
			error = await response.text()
			console.error(error)
		}

		if (invalidatePath.pathname === '/feed') {
			let url = new URL(invalidatePath)
			url.search = ''
			url.hash = ''
			invalidate(url.href)

			if (result) {
				result({ form })
			}
		}
	}

	form.addEventListener('submit', handleSubmit)

	return {
		distroy() {
			form.removeEventListener('submit', handleSubmit)
		},
	}
}
