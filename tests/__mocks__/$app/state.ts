import type { Page } from '@sveltejs/kit';

export const page = {
	url: new URL('http://localhost/') as unknown as Page['url'],
	params: {},
	route: { id: null },
	status: 200,
	error: null,
	data: {},
	state: {},
	form: undefined
} as unknown as Page;

export const navigating = null;
export const updated = false;
