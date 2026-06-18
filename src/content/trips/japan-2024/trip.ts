import type { Trip } from '$lib/types/trip';
import { PhotoTag, TripTag } from '$lib/types/trip';

export const trip: Trip = {
  slug: 'japan-2024',
  title: 'Two Weeks in Japan',
  destination: 'Japan',
  region: 'East Asia',
  dates: { start: '15-03-2024', end: '29-03-2024' },
  tags: new Set([TripTag.Temples, TripTag.Food, TripTag.Hiking, TripTag.CherryBlossoms, TripTag.Cities]),
  coverPhoto: { filename: 'fushimi-inari.webp', alt: 'Rows of vermilion torii gates at Fushimi Inari shrine' },
  description: 'Exploring Tokyo, Kyoto, and the Japanese Alps during cherry blossom season.',
  body: `Two weeks in Japan during hanami season turned out to be everything I'd hoped for and more. Starting in Tokyo, working south through Kyoto, then escaping to the mountains of Hakuba.`,
  photos: [
    {
      slug: 'fushimi-inari',
      filename: 'fushimi-inari.webp',
      alt: 'Rows of vermilion torii gates at Fushimi Inari shrine',
      tags: new Set([PhotoTag.Architecture, PhotoTag.Nature]),
      width: 2400,
      height: 1600
    },
    {
      slug: 'tokyo-shibuya',
      filename: 'tokyo-shibuya.webp',
      alt: 'Shibuya crossing at night from above',
      tags: new Set([PhotoTag.Urban, PhotoTag.Night, PhotoTag.Street]),
      width: 2400,
      height: 1600
    },
    {
      slug: 'ramen-shop',
      filename: 'ramen-shop.webp',
      alt: 'Bowl of tonkotsu ramen with soft egg',
      tags: new Set([PhotoTag.Food, PhotoTag.Interior]),
      width: 2400,
      height: 1800
    },
    {
      slug: 'hakuba-alps',
      filename: 'hakuba-alps.webp',
      alt: 'Snow-capped Japanese Alps above Hakuba village',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature]),
      width: 2400,
      height: 1350
    }
  ]
};
