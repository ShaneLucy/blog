import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			// /travel and /about will be added in later phases; warn instead of failing
			handleHttpError: ({ path, referrer, message }) => {
				if (path.startsWith('/travel') || path.startsWith('/about')) {
					console.warn(`Prerender warning: ${message} (linked from ${referrer})`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
