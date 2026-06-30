import { allTrips } from "$lib/data/trips";
import { HTTP_NOT_FOUND } from "$lib/config";
import { error } from "@sveltejs/kit";
import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
  return allTrips.map((t) => ({ slug: t.slug }));
};

export function load({ params }: { params: { slug: string } }) {
  const trip = allTrips.find((t) => t.slug === params.slug);
  if (!trip) {
    error(HTTP_NOT_FOUND, "Trip not found");
  }
  return { trip };
}
