import { allTrips } from '$lib/data/trips';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return allTrips.map((t) => ({ slug: t.slug }));
};

export function load({ params }) {
	const trip = allTrips.find((t) => t.slug === params.slug);
	if (!trip) error(404, 'Trip not found');
	return { trip };
}
