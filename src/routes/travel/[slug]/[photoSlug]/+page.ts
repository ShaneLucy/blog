import { allTrips } from "$lib/data/trips";
import { HTTP_NOT_FOUND } from "$lib/config";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () => {
  return allTrips.flatMap((trip) =>
    trip.photos.map((photo) => ({
      slug: trip.slug,
      photoSlug: photo.slug
    }))
  );
};

export const load = (({ params }) => {
  const trip = allTrips.find((t) => t.slug === params.slug);
  if (!trip) {
    error(HTTP_NOT_FOUND, "Trip not found");
  }

  const photoIndex = trip.photos.findIndex((p) => p.slug === params.photoSlug);
  if (photoIndex === -1) {
    error(HTTP_NOT_FOUND, "Photo not found");
  }

  const photo = trip.photos[photoIndex];
  const prevPhoto = photoIndex > 0 ? trip.photos[photoIndex - 1] : null;
  const nextPhoto = photoIndex < trip.photos.length - 1 ? trip.photos[photoIndex + 1] : null;

  // Envelope: find the most portrait photo (smallest w/h ratio) so the container
  // height stays constant across all photos, eliminating layout shift on navigation.
  const envelope = trip.photos.reduce((min, p) => (p.width / p.height < min.width / min.height ? p : min), trip.photos[0]);

  return {
    trip,
    photo,
    photoIndex,
    prevPhoto,
    nextPhoto,
    envelopeWidth: envelope.width,
    envelopeHeight: envelope.height
  };
}) satisfies PageLoad;
