import type { Trip } from '$lib/types/trip';
import { PhotoTag } from '$lib/types/trip';

export const trip: Trip = {
  slug: 'norway-2026',
  title: 'Norway in Summer',
  destination: 'Norway',
  region: 'Northern Europe',
  dates: { start: '2026-06-01', end: '2026-06-14' },
  tags: ['fjords', 'hiking', 'midnight-sun', 'villages', 'wilderness'],
  coverPhoto: 'Bergen_Gateway_to_the_Fjords_of_Norway_pillars.webp',
  description: 'Two weeks chasing the midnight sun through the fjords and mountains of western Norway.',
  body: `Summer in Norway means the sun barely sets. Fourteen days of golden light, impossibly blue fjords, and trails that wind above the clouds.`,
  photos: [
    {
      slug: 'bergen-pillars',
      filename: 'Bergen_Gateway_to_the_Fjords_of_Norway_pillars.webp',
      alt: 'Bergen gateway to the fjords of Norway',
      tags: [PhotoTag.Architecture, PhotoTag.Landscape],
      width: 1920,
      height: 1336
    },
    {
      slug: 'norway-photo-1',
      filename: 'OIP.webp',
      alt: 'TODO: describe this photo',
      tags: [PhotoTag.Landscape],
      width: 474,
      height: 316
    },
    {
      slug: 'norway-photo-2',
      filename: 'OIP2.webp',
      alt: 'TODO: describe this photo',
      tags: [PhotoTag.Nature],
      width: 474,
      height: 296
    },
    {
      slug: 'norway-photo-3',
      filename: 'OIP3.webp',
      alt: 'TODO: describe this photo',
      tags: [PhotoTag.Water],
      width: 474,
      height: 266
    }
  ]
};
