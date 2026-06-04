import { allTrips } from '$lib/data/trips';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return allTrips.flatMap((trip) =>
		trip.photos.map((photo) => ({
			slug: trip.slug,
			photoSlug: photo.slug
		}))
	);
};

export function load({ params }) {
	const trip = allTrips.find((t) => t.slug === params.slug);
	if (!trip) error(404, 'Trip not found');

	const photoIndex = trip.photos.findIndex((p) => p.slug === params.photoSlug);
	if (photoIndex === -1) error(404, 'Photo not found');

	const photo = trip.photos[photoIndex];
	const prevPhoto = photoIndex > 0 ? trip.photos[photoIndex - 1] : null;
	const nextPhoto = photoIndex < trip.photos.length - 1 ? trip.photos[photoIndex + 1] : null;

	return { trip, photo, photoIndex, prevPhoto, nextPhoto };
}
