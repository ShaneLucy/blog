import type { Trip } from '$lib/types/trip';
import { PhotoTag } from '$lib/types/trip';
import type { TripTag } from '$lib/types/trip';
import { trip as norway2026 } from '../../content/trips/norway-2026/trip';

export const allTrips: Trip[] = [norway2026];

export const allDestinations = [...new Set(allTrips.map((t) => t.destination))].sort();
export const allTags = [...new Set(allTrips.flatMap((t) => [...t.tags]))].sort() as TripTag[];
export const allPhotoTags = Object.values(PhotoTag);
