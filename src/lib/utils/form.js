import { invalidate } from '$app/navigation'
import { page } from '$app/stores'

export const enhance = (form, { result, pending, pendingDelete } = {}) => {
	let invalidatePath
	page.subscribe((path) => {
		invalidatePath = path.url
	})

	async function handleSubmit(event) {
		event.preventDefault()
		let btn = event.submitter
		let btnResetInner = btn.innerText
		let formData = new FormData(form)

		if (pending) {
			pending({ name: formData.get('feed'), href: formData.get('url') })
		} else if (pendingDelete) {
			pendingDelete({ name: formData.get('name') })
		}

		// 🧪 testing style choices, can animate
		// form.style = '--color: red;'
		form.dataset.loading = true
		btn.innerText = '⌛'

		const response = await fetch(form.action, {
			method: form.method,
			headers: { accept: 'application/json' },
			body: formData,
		})

		if (!response.ok) {
			btn.innerText = '❌'
			console.error(await response.text())
		} else {
			btn.innerText = btnResetInner
		}

		if (invalidatePath.pathname === '/feed') {
			let url = new URL(invalidatePath)
			url.search = ''
			url.hash = ''
			invalidate(url.href)
		}

		if (result) {
			result({ form })
		}
	}

	form.addEventListener('submit', handleSubmit)

	return {
		distroy() {
			form.removeEventListener('submit', handleSubmit)
		},
	}
}
