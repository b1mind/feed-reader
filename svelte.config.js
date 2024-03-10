import path from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	vite: {
		resolve: {
			alias: {
				// these are the aliases and paths to them
				'@components': path.resolve('./src/lib/components'),
				$lib: path.resolve('./src/lib'),
				'@utils': path.resolve('./src/lib/utils'),
			},
		},
	},
	preprocess: [vitePreprocess()],
}

export default config
