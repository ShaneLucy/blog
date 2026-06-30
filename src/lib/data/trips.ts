import { PhotoTag, type Trip, type TripTag } from "$lib/types/trip";
import { trip as norway2026 } from "../../content/trips/norway-2026/trip";

export const allTrips: Trip[] = [norway2026];

export const allDestinations = [...new Set(allTrips.map((t) => t.destination))].sort((a, b) => a.localeCompare(b));
export const allTags: TripTag[] = [...new Set(allTrips.flatMap((t) => [...t.tags]))].sort((a, b) => a.localeCompare(b));
export const allPhotoTags = Object.values(PhotoTag);
