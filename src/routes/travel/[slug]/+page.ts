import { allTrips } from "$lib/data/trips";
import { HTTP_NOT_FOUND } from "$lib/config";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => {
  return allTrips.map((t) => ({ slug: t.slug }));
};

export const load = (({ params }) => {
  const trip = allTrips.find((t) => t.slug === params.slug);
  if (!trip) {
    error(HTTP_NOT_FOUND, "Trip not found");
  }
  return { trip };
}) satisfies PageLoad;
