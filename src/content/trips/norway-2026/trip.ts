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
    },
    {
      slug: 'bergen-church',
      filename: 'Bergen-Church.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-fountain',
      filename: 'Bergen-Fountain.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-harbour',
      filename: 'Bergen-Harbour.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-streets-2',
      filename: 'Bergen-Streets-2.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-streets',
      filename: 'Bergen-Streets.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-tree-archway',
      filename: 'Bergen-Tree-Archway.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'butter-chicken',
      filename: 'Butter-Chicken.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'church-view-from-mountain',
      filename: 'Church-View-From-Mountain.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'elven-whiskey-cocktail',
      filename: 'Elven-Whiskey-Cocktail.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour-2',
      filename: 'Even-More-Sunset-Bergen-Harbour-2.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour',
      filename: 'Even-More-Sunset-Bergen-Harbour.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-1',
      filename: 'Fjord-Cruise-1.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-10',
      filename: 'Fjord-Cruise-10.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-11',
      filename: 'Fjord-Cruise-11.webp',
      alt: '',
      width: 6048,
      height: 8064
    },
    {
      slug: 'fjord-cruise-12',
      filename: 'Fjord-Cruise-12.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-13',
      filename: 'Fjord-Cruise-13.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-14',
      filename: 'Fjord-Cruise-14.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-15',
      filename: 'Fjord-Cruise-15.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-16',
      filename: 'Fjord-Cruise-16.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-2',
      filename: 'Fjord-Cruise-2.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-3',
      filename: 'Fjord-Cruise-3.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-4',
      filename: 'Fjord-Cruise-4.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-5',
      filename: 'Fjord-Cruise-5.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-6',
      filename: 'Fjord-Cruise-6.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-7',
      filename: 'Fjord-Cruise-7.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-8',
      filename: 'Fjord-Cruise-8.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-9',
      filename: 'Fjord-Cruise-9.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'flying-alesund-oslo',
      filename: 'Flying-Alesund-Oslo.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'hotdog-and-beer',
      filename: 'Hotdog-And-Beer.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'more-sunset-bergen-harbour',
      filename: 'More-Sunset-Bergen-Harbour.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'oat-latter-and-espresso-cafe-mash',
      filename: 'Oat-Latter-And-Espresso-Cafe-Mash.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'r-yk-bby-brisket',
      filename: 'Røyk BBY Brisket.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'spanish-norwegian-infusion-tapas',
      filename: 'Spanish-Norwegian-Infusion-Tapas.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'sunset-bergen-harbour',
      filename: 'Sunset-Bergen-Harbour.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'vinyl-draught-beers',
      filename: 'Vinyl-Draught-Beers.webp',
      alt: '',
      width: 4032,
      height: 3024
    },
    {
      slug: 'lesund-microbrewery-3',
      filename: 'Ålesund -Microbrewery-3.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery',
      filename: 'Ålesund -Microbrewery.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery-2',
      filename: 'Ålesund-Microbrewery-2.webp',
      alt: '',
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery-4',
      filename: 'Ålesund-Microbrewery-4.webp',
      alt: '',
      width: 3024,
      height: 4032
    }
  ]
};
