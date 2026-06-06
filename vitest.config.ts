import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: [
			// Exact match: force svelte runtime to browser build (needed for mount() in jsdom)
			{ find: /^svelte$/, replacement: resolve('./node_modules/svelte/src/index-client.js') },
			{ find: '$lib', replacement: resolve('./src/lib') },
			{ find: '$app/paths', replacement: resolve('./tests/__mocks__/$app/paths.ts') },
			{ find: '$app/state', replacement: resolve('./tests/__mocks__/$app/state.ts') }
		]
	},
	test: {
		include: ['tests/unit/**/*.test.ts'],
		setupFiles: ['tests/setup.ts'],
		environment: 'jsdom',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.d.ts']
		}
	}
});
