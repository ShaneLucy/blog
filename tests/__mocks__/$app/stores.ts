import { readable } from 'svelte/store';
import type { Page } from '@sveltejs/kit';

export const page = readable<Page>({
	url: new URL('http://localhost/'),
	params: {},
	route: { id: null },
	status: 200,
	error: null,
	data: {},
	state: {},
	form: undefined
});

export const navigating = readable(null);
export const updated = readable(false);
