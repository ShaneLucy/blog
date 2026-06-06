import { describe, test, expect } from 'vitest';
import { entries, load } from '../../../src/routes/travel/[slug]/[photoSlug]/+page';
import { allTrips } from '../../../src/lib/data/trips';

const firstTrip = allTrips[0];
const firstPhoto = firstTrip.photos[0];
const lastPhoto = firstTrip.photos[firstTrip.photos.length - 1];

describe('photo detail entries()', () => {
	const result = entries() as Array<{ slug: string; photoSlug: string }>;

	test('returns one entry per photo across all trips', () => {
		const totalPhotos = allTrips.reduce((n, t) => n + t.photos.length, 0);
		expect(result.length).toBe(totalPhotos);
	});

	test('each entry has slug and photoSlug', () => {
		for (const entry of result) {
			expect(typeof entry.slug).toBe('string');
			expect(entry.slug.length).toBeGreaterThan(0);
			expect(typeof entry.photoSlug).toBe('string');
			expect(entry.photoSlug.length).toBeGreaterThan(0);
		}
	});

	test('all trip/photo slug pairs are valid', () => {
		const photosByTrip = new Map(
			allTrips.map((t) => [t.slug, new Set(t.photos.map((p) => p.slug))])
		);
		for (const entry of result) {
			expect(photosByTrip.has(entry.slug)).toBe(true);
			expect(photosByTrip.get(entry.slug)!.has(entry.photoSlug)).toBe(true);
		}
	});
});

describe('photo detail load()', () => {
	test('returns the correct trip and photo for valid slugs', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: firstPhoto.slug }
		} as never);
		expect(result.trip).toBe(firstTrip);
		expect(result.photo).toBe(firstPhoto);
	});

	test('photoIndex is 0 for the first photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: firstPhoto.slug }
		} as never);
		expect(result.photoIndex).toBe(0);
	});

	test('prevPhoto is null for the first photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: firstPhoto.slug }
		} as never);
		expect(result.prevPhoto).toBeNull();
	});

	test('nextPhoto is the second photo for the first photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: firstPhoto.slug }
		} as never);
		expect(result.nextPhoto).toBe(firstTrip.photos[1]);
	});

	test('nextPhoto is null for the last photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: lastPhoto.slug }
		} as never);
		expect(result.nextPhoto).toBeNull();
	});

	test('prevPhoto is second-to-last for the last photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: lastPhoto.slug }
		} as never);
		expect(result.prevPhoto).toBe(firstTrip.photos[firstTrip.photos.length - 2]);
	});

	test('envelope dimensions come from the most portrait photo', () => {
		const result = load({
			params: { slug: firstTrip.slug, photoSlug: firstPhoto.slug }
		} as never);
		const mostPortrait = firstTrip.photos.reduce(
			(min, p) => (p.width / p.height < min.width / min.height ? p : min),
			firstTrip.photos[0]
		);
		expect(result.envelopeWidth).toBe(mostPortrait.width);
		expect(result.envelopeHeight).toBe(mostPortrait.height);
	});

	test('throws 404 for an unknown trip slug', () => {
		expect(() =>
			load({ params: { slug: 'does-not-exist', photoSlug: firstPhoto.slug } } as never)
		).toThrow();
	});

	test('throws 404 for an unknown photo slug', () => {
		expect(() =>
			load({ params: { slug: firstTrip.slug, photoSlug: 'does-not-exist' } } as never)
		).toThrow();
	});

	test('thrown trip error has status 404', () => {
		let thrown: unknown;
		try {
			load({ params: { slug: 'does-not-exist', photoSlug: firstPhoto.slug } } as never);
		} catch (e) {
			thrown = e;
		}
		expect((thrown as { status: number }).status).toBe(404);
	});

	test('thrown photo error has status 404', () => {
		let thrown: unknown;
		try {
			load({ params: { slug: firstTrip.slug, photoSlug: 'does-not-exist' } } as never);
		} catch (e) {
			thrown = e;
		}
		expect((thrown as { status: number }).status).toBe(404);
	});
});
