import type { Trip } from '$lib/types/trip';
import { PhotoTag } from '$lib/types/trip';

export const trip: Trip = {
  slug: 'norway-2026',
  title: 'Norway in Spring',
  destination: 'Norway',
  region: 'Northern Europe',
  dates: { start: '26-05-2026', end: '31-05-2026' },
  tags: ['fjords', 'hiking', 'midnight sun', 'villages', 'wilderness', 'city break', 'food', 'cocktails', 'beer'],
  coverPhoto: 'Fjord-Cruise-4.webp',
  description: 'Five nights exploring Bergen, Ålesund, Fjords while sampling delicious food and drink along the way',
  body: `Spring in Norway means the sun barely sets. Sixe days of golden light, impossibly blue fjords, and trails that wind above the clouds.`,
  photos: [
        {
      slug: 'fjord-cruise-4',
      filename: 'Fjord-Cruise-4.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-church',
      filename: 'Bergen-Church.webp',
      alt: '',
      tags: [PhotoTag.Architecture, PhotoTag.Urban],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-fountain',
      filename: 'Bergen-Fountain.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-harbour',
      filename: 'Bergen-Harbour.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban, PhotoTag.Water, PhotoTag.Harbour],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-streets-2',
      filename: 'Bergen-Streets-2.webp',
      alt: '',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-streets',
      filename: 'Bergen-Streets.webp',
      alt: '',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-tree-archway',
      filename: 'Bergen-Tree-Archway.webp',
      alt: '',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'butter-chicken',
      filename: 'Butter-Chicken.webp',
      alt: '',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'church-view-from-mountain',
      filename: 'Church-View-From-Mountain.webp',
      alt: '',
      tags: [PhotoTag.Architecture, PhotoTag.Urban],
      width: 3024,
      height: 4032
    },
    {
      slug: 'elven-whiskey-cocktail',
      filename: 'Elven-Whiskey-Cocktail.webp',
      alt: '',
      tags: [PhotoTag.Cocktail],
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour-2',
      filename: 'Even-More-Sunset-Bergen-Harbour-2.webp',
      alt: '',
      tags: [PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water],
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour',
      filename: 'Even-More-Sunset-Bergen-Harbour.webp',
      alt: '',
      tags: [PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-1',
      filename: 'Fjord-Cruise-1.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-10',
      filename: 'Fjord-Cruise-10.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-11',
      filename: 'Fjord-Cruise-11.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 6048,
      height: 8064
    },
    {
      slug: 'fjord-cruise-12',
      filename: 'Fjord-Cruise-12.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-13',
      filename: 'Fjord-Cruise-13.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-14',
      filename: 'Fjord-Cruise-14.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-15',
      filename: 'Fjord-Cruise-15.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-16',
      filename: 'Fjord-Cruise-16.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-2',
      filename: 'Fjord-Cruise-2.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-3',
      filename: 'Fjord-Cruise-3.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-5',
      filename: 'Fjord-Cruise-5.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-6',
      filename: 'Fjord-Cruise-6.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-7',
      filename: 'Fjord-Cruise-7.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-8',
      filename: 'Fjord-Cruise-8.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-9',
      filename: 'Fjord-Cruise-9.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'flying-alesund-oslo',
      filename: 'Flying-Alesund-Oslo.webp',
      alt: '',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Mountain, PhotoTag.Transport],
      width: 3024,
      height: 4032
    },
    {
      slug: 'hotdog-and-beer',
      filename: 'Hotdog-And-Beer.webp',
      alt: '',
      tags: [PhotoTag.Beer, PhotoTag.Food],
      width: 3024,
      height: 4032
    },
    {
      slug: 'more-sunset-bergen-harbour',
      filename: 'More-Sunset-Bergen-Harbour.webp',
      alt: '',
      tags: [],
      width: 4032,
      height: 3024
    },
    {
      slug: 'oat-latte-and-espresso-cafe-mash',
      filename: 'Oat-Latte-And-Espresso-Cafe-Mash.webp',
      alt: '',
      tags: [PhotoTag.Cafe, PhotoTag.Coffee],
      width: 3024,
      height: 4032
    },
    {
      slug: 'r-yk-bby-brisket',
      filename: 'Røyk BBY Brisket.webp',
      alt: '',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'spanish-norwegian-infusion-tapas',
      filename: 'Spanish-Norwegian-Infusion-Tapas.webp',
      alt: '',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'sunset-bergen-harbour',
      filename: 'Sunset-Bergen-Harbour.webp',
      alt: '',
      tags: [PhotoTag.Water, PhotoTag.Sunset, PhotoTag.Harbour],
      width: 3024,
      height: 4032
    },
    {
      slug: 'vinyl-draught-beers',
      filename: 'Vinyl-Draught-Beers.webp',
      alt: '',
      tags: [PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'lesund-microbrewery-3',
      filename: 'Ålesund -Microbrewery-3.webp',
      alt: '',
      tags: [PhotoTag.Animals],
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery',
      filename: 'Ålesund -Microbrewery.webp',
      alt: '',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery-2',
      filename: 'Ålesund-Microbrewery-2.webp',
      alt: '',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'lesund-microbrewery-4',
      filename: 'Ålesund-Microbrewery-4.webp',
      alt: '',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    }
]
};
