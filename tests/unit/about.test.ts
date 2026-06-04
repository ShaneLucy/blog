/// <reference types="bun-types" />
import { describe, test, expect } from 'bun:test';
import { allTrips } from '../../src/lib/data/trips';

// Mirrors the transformation on the about page
const destinations = [...allTrips]
	.sort((a, b) => b.dates.start.localeCompare(a.dates.start))
	.map((t) => ({
		name: t.destination,
		year: t.dates.start.slice(0, 4),
		slug: t.slug,
		description: t.description
	}));

describe('about page destinations list', () => {
	test('includes every trip', () => {
		expect(destinations.length).toBe(allTrips.length);
	});

	test('is sorted by start date descending (most recent first)', () => {
		for (let i = 0; i < destinations.length - 1; i++) {
			const curr = allTrips.find((t) => t.slug === destinations[i].slug)!;
			const next = allTrips.find((t) => t.slug === destinations[i + 1].slug)!;
			expect(curr.dates.start >= next.dates.start).toBe(true);
		}
	});

	test('each destination has a non-empty name', () => {
		for (const dest of destinations) {
			expect(typeof dest.name).toBe('string');
			expect(dest.name.length).toBeGreaterThan(0);
		}
	});

	test('year is the first four characters of dates.start', () => {
		for (const dest of destinations) {
			const trip = allTrips.find((t) => t.slug === dest.slug)!;
			expect(dest.year).toBe(trip.dates.start.slice(0, 4));
		}
	});

	test('year is a four-digit numeric string', () => {
		for (const dest of destinations) {
			expect(dest.year).toMatch(/^\d{4}$/);
		}
	});

	test('slug matches the source trip slug', () => {
		for (const dest of destinations) {
			const trip = allTrips.find((t) => t.slug === dest.slug)!;
			expect(trip).toBeDefined();
			expect(dest.slug).toBe(trip.slug);
		}
	});

	test('name matches trip destination', () => {
		for (const dest of destinations) {
			const trip = allTrips.find((t) => t.slug === dest.slug)!;
			expect(dest.name).toBe(trip.destination);
		}
	});

	test('description matches trip description', () => {
		for (const dest of destinations) {
			const trip = allTrips.find((t) => t.slug === dest.slug)!;
			expect(dest.description).toBe(trip.description);
			expect(dest.description.length).toBeGreaterThan(0);
		}
	});

	test('no duplicate slugs', () => {
		const slugs = destinations.map((d) => d.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
