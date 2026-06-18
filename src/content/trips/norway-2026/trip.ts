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
      alt: 'Calm fjord waters stretching into the distance with steep mountain slope rising into the clouds',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-church',
      filename: 'Bergen-Church.webp',
      alt: 'A historic church  rising above the rooftops of Bergen city centre',
      tags: [PhotoTag.Architecture, PhotoTag.Urban],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-fountain',
      filename: 'Bergen-Fountain.webp',
      alt: 'A decorative fountain in Bergen city centre surrounded by mountains with houses littered throughout',
      tags: [PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-harbour-mountain-view',
      filename: 'Bergen-Harbour.webp',
      alt: 'Looking down on bergen harbour from a nearby mountain',
      tags: [PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban, PhotoTag.Water, PhotoTag.Harbour],
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-streets-2',
      filename: 'Bergen-Streets-2.webp',
      alt: 'A  Bergen street lined with colourful houses, leafy trees and mountain views',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-streets',
      filename: 'Bergen-Streets.webp',
      alt: 'A quiet cobblestone street in Bergen with colourful buildings on either side and a mountain view in the background',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-tree-archway',
      filename: 'Bergen-Tree-Archway.webp',
      alt: 'A canopy of leafy trees forming a natural archway over a Bergen walkway',
      tags: [PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street],
      width: 3024,
      height: 4032
    },
    {
      slug: 'butter-chicken',
      filename: 'Butter-Chicken.webp',
      alt: 'A plate of butter chicken curry served with a cold beer',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'church-view-from-mountain',
      filename: 'Church-View-From-Mountain.webp',
      alt: 'Looking down over Bergen from the mountainside, focusing on the historic church',
      tags: [PhotoTag.Architecture, PhotoTag.Urban],
      width: 3024,
      height: 4032
    },
    {
      slug: 'elven-whiskey-cocktail',
      filename: 'Elven-Whiskey-Cocktail.webp',
      alt: 'A whiskey cocktail with garnish at  Elven bar',
      tags: [PhotoTag.Cocktail],
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour-2',
      filename: 'Even-More-Sunset-Bergen-Harbour-2.webp',
      alt: 'Golden sunset light reflecting off the still water of Bergen harbour',
      tags: [PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water],
      width: 3024,
      height: 4032
    },
    {
      slug: 'even-more-sunset-bergen-harbour',
      filename: 'Even-More-Sunset-Bergen-Harbour.webp',
      alt: 'Bergen harbour bathed in warm orange and pink sunset colours',
      tags: [PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-1',
      filename: 'Fjord-Cruise-1.webp',
      alt: 'Mountain view from a wide bay before entering the fjord',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-10',
      filename: 'Fjord-Cruise-10.webp',
      alt: 'A small Norwegian village nestled at the foot of steep fjord mountains',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-11',
      filename: 'Fjord-Cruise-11.webp',
      alt: 'Panoramic view of a deep Norwegian fjord with snow topped mountains in the background',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 6048,
      height: 8064
    },
    {
      slug: 'fjord-cruise-12',
      filename: 'Fjord-Cruise-12.webp',
      alt: 'Lush green mountain slopes descending to the calm fjord waters below',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-13',
      filename: 'Fjord-Cruise-13.webp',
      alt: 'A cruise ship under the fjord',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-14',
      filename: 'Fjord-Cruise-14.webp',
      alt: 'A waterfall cascading down the fjord cliffs into the water below',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-15',
      filename: 'Fjord-Cruise-15.webp',
      alt: 'Wide fjord vista with snowy mountains receding into the distance on a spring day',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-16',
      filename: 'Fjord-Cruise-16.webp',
      alt: 'Wide fjord vista with snowy mountains receding into the distance on a spring day',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-2',
      filename: 'Fjord-Cruise-2.webp',
      alt: 'Entrance to the fjord with a massive mountain ridge stretching into the clouds',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-3',
      filename: 'Fjord-Cruise-3.webp',
      alt: 'Fjord scenery during the cruise with snow topped mountains and houses littered throughout the scene',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-5',
      filename: 'Fjord-Cruise-5.webp',
      alt: 'A village on the shore in a walley between two mountain peaks',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-6',
      filename: 'Fjord-Cruise-6.webp',
      alt: 'Ragged, steep cliff face with waterfalls running into the fjord',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-7',
      filename: 'Fjord-Cruise-7.webp',
      alt: 'Spring fjord landscape with snow still visible on the distant mountain peaks',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-8',
      filename: 'Fjord-Cruise-8.webp',
      alt: 'A wide fjord passage with towering cliffs rising steeply on both sides',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cruise-9',
      filename: 'Fjord-Cruise-9.webp',
      alt: 'A wide fjord passage with towering cliffs rising steeply on both sides',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain],
      width: 4032,
      height: 3024
    },
    {
      slug: 'flying-alesund-oslo',
      filename: 'Flying-Alesund-Oslo.webp',
      alt: 'Snow-covered Norwegian mountain ranges viewed from the plane window on the flight from Ålesund to Oslo',
      tags: [PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Mountain, PhotoTag.Transport],
      width: 3024,
      height: 4032
    },
    {
      slug: 'hotdog-and-beer',
      filename: 'Hotdog-And-Beer.webp',
      alt: 'A loaded Norwegian hotdog served alongside a cold beer',
      tags: [PhotoTag.Beer, PhotoTag.Food],
      width: 3024,
      height: 4032
    },
    {
      slug: 'more-sunset-bergen-harbour',
      filename: 'More-Sunset-Bergen-Harbour.webp',
      alt: 'Warm sunset hues washing over Bergen harbour and the surrounding hills',
      tags: [],
      width: 4032,
      height: 3024
    },
    {
      slug: 'oat-latte-and-espresso-cafe-mash',
      filename: 'Oat-Latte-And-Espresso-Cafe-Mash.webp',
      alt: 'An oat milk latte and espresso on a table at Café Mash in Bergen',
      tags: [PhotoTag.Cafe, PhotoTag.Coffee],
      width: 3024,
      height: 4032
    },
    {
      slug: 'royk-bby-brisket',
      filename: 'Røyk BBY Brisket.webp',
      alt: 'Smoked brisket with sides at Røyk BBY restaurant in Bergen',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'spanish-norwegian-infusion-tapas',
      filename: 'Spanish-Norwegian-Infusion-Tapas.webp',
      alt: 'A spread of Spanish-Norwegian fusion tapas dishes',
      tags: [PhotoTag.Food, PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'sunset-bergen-harbour',
      filename: 'Sunset-Bergen-Harbour.webp',
      alt: 'Bergen harbour at sunset with golden light shimmering on the water',
      tags: [PhotoTag.Water, PhotoTag.Sunset, PhotoTag.Harbour],
      width: 3024,
      height: 4032
    },
    {
      slug: 'vinyl-draught-beers',
      filename: 'Vinyl-Draught-Beers.webp',
      alt: 'Large selection of craft beers on draught',
      tags: [PhotoTag.Beer],
      width: 4032,
      height: 3024
    },
    {
      slug: 'alesund-microbrewery-3',
      filename: 'Ålesund -Microbrewery-3.webp',
      alt: 'A baby bird relaxing at the Ålesund microbrewery taproom',
      tags: [PhotoTag.Animals],
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery',
      filename: 'Ålesund -Microbrewery.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery-2',
      filename: 'Ålesund-Microbrewery-2.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery-4',
      filename: 'Ålesund-Microbrewery-4.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: [PhotoTag.Beer],
      width: 3024,
      height: 4032
    }
  ]
};
