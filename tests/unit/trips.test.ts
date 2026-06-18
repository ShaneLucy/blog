import { describe, test, expect } from 'vitest';
import { allTrips, allDestinations, allTags, allPhotoTags } from '../../src/lib/data/trips';
import { PhotoTag } from '../../src/lib/types/trip';
import { parseDMY } from '../../src/lib/utils/dates';

const DMY_DATE = /^\d{2}-\d{2}-\d{4}$/;

describe('allTrips', () => {
  test('is a non-empty array', () => {
    expect(Array.isArray(allTrips)).toBe(true);
    expect(allTrips.length).toBeGreaterThan(0);
  });

  test('each trip has required string fields', () => {
    for (const trip of allTrips) {
      expect(typeof trip.slug).toBe('string');
      expect(trip.slug.length).toBeGreaterThan(0);
      expect(typeof trip.title).toBe('string');
      expect(trip.title.length).toBeGreaterThan(0);
      expect(typeof trip.destination).toBe('string');
      expect(trip.destination.length).toBeGreaterThan(0);
      expect(typeof trip.coverPhoto.filename).toBe('string');
      expect(trip.coverPhoto.filename.length).toBeGreaterThan(0);
      expect(typeof trip.description).toBe('string');
      expect(trip.description.length).toBeGreaterThan(0);
    }
  });

  test('trip slugs are unique', () => {
    const slugs = allTrips.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test('each trip has valid DD-MM-YYYY date strings', () => {
    for (const trip of allTrips) {
      expect(trip.dates.start).toMatch(DMY_DATE);
      expect(trip.dates.end).toMatch(DMY_DATE);
    }
  });

  test('each trip start date is before or equal to end date', () => {
    for (const trip of allTrips) {
      expect(parseDMY(trip.dates.start).getTime() <= parseDMY(trip.dates.end).getTime()).toBe(true);
    }
  });

  test('each trip has at least one tag', () => {
    for (const trip of allTrips) {
      expect(trip.tags instanceof Set).toBe(true);
      expect(trip.tags.size).toBeGreaterThan(0);
    }
  });

  test('each trip has at least one photo', () => {
    for (const trip of allTrips) {
      expect(Array.isArray(trip.photos)).toBe(true);
      expect(trip.photos.length).toBeGreaterThan(0);
    }
  });

  test('photo slugs are unique within each trip', () => {
    for (const trip of allTrips) {
      const slugs = trip.photos.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  test('each photo has required fields with positive dimensions', () => {
    for (const trip of allTrips) {
      for (const photo of trip.photos) {
        expect(typeof photo.slug).toBe('string');
        expect(photo.slug.length).toBeGreaterThan(0);
        expect(typeof photo.filename).toBe('string');
        expect(photo.filename.length).toBeGreaterThan(0);
        expect(typeof photo.alt).toBe('string');
        expect(photo.width).toBeGreaterThan(0);
        expect(photo.height).toBeGreaterThan(0);
      }
    }
  });

  test('photo tags only contain valid PhotoTag values', () => {
    const validTags = new Set(Object.values(PhotoTag));
    for (const trip of allTrips) {
      for (const photo of trip.photos) {
        for (const tag of photo.tags ?? []) {
          expect(validTags.has(tag)).toBe(true);
        }
      }
    }
  });
});

describe('allDestinations', () => {
  test('is sorted alphabetically', () => {
    expect(allDestinations).toEqual([...allDestinations].sort((a, b) => a.localeCompare(b)));
  });

  test('has no duplicates', () => {
    expect(new Set(allDestinations).size).toBe(allDestinations.length);
  });

  test('contains every trip destination', () => {
    for (const trip of allTrips) {
      expect(allDestinations).toContain(trip.destination);
    }
  });
});

describe('allTags', () => {
  test('is sorted alphabetically', () => {
    expect(allTags).toEqual([...allTags].sort((a, b) => a.localeCompare(b)));
  });

  test('has no duplicates', () => {
    expect(new Set(allTags).size).toBe(allTags.length);
  });

  test('contains all tags from all trips', () => {
    for (const trip of allTrips) {
      for (const tag of trip.tags) {
        expect(allTags).toContain(tag);
      }
    }
  });
});

describe('allPhotoTags', () => {
  test('contains all PhotoTag enum values', () => {
    const enumValues = Object.values(PhotoTag);
    expect(allPhotoTags.length).toBe(enumValues.length);
    for (const val of enumValues) {
      expect(allPhotoTags).toContain(val);
    }
  });

  test('has no duplicates', () => {
    expect(new Set(allPhotoTags).size).toBe(allPhotoTags.length);
  });

  test('all values are lowercase strings', () => {
    for (const tag of allPhotoTags) {
      expect(typeof tag).toBe('string');
      expect(tag as string).toBe(tag.toLowerCase());
    }
  });
});
