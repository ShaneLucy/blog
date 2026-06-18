import type { Trip } from '$lib/types/trip';
import { PhotoTag, TripTag } from '$lib/types/trip';

export const trip: Trip = {
  slug: 'norway-2026',
  title: 'Norway in Spring',
  destination: 'Norway',
  region: 'Northern Europe',
  dates: { start: '26-05-2026', end: '31-05-2026' },
  tags: new Set([
    TripTag.Fjords,
    TripTag.Hiking,
    TripTag.MidnightSun,
    TripTag.Villages,
    TripTag.Wilderness,
    TripTag.CityBreak,
    TripTag.Food,
    TripTag.Cocktails,
    TripTag.Beer
  ]),
  coverPhoto: {
    filename: 'Fjord-Cruise-4.webp',
    alt: 'Calm fjord waters stretching into the distance with steep mountain slope rising into the clouds',
    width: 4032,
    height: 3024
  },
  description: 'Five nights exploring Bergen, Ålesund, Fjords while sampling delicious food and drink along the way',
  body: `Spring in Norway means the sun barely sets. Sixe days of golden light, impossibly blue fjords, and trails that wind above the clouds.`,
  photos: [
    {
      slug: 'calm-fjord-waters-mountain-clouds',
      filename: 'Fjord-Cruise-4.webp',
      alt: 'Calm fjord waters stretching into the distance with steep mountain slope rising into the clouds',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-church-above-rooftops',
      filename: 'Bergen-Church.webp',
      alt: 'A historic church rising above the rooftops of Bergen city centre',
      tags: new Set([PhotoTag.Architecture, PhotoTag.Urban]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-city-centre-fountain-mountain-backdrop',
      filename: 'Bergen-Fountain.webp',
      alt: 'A decorative fountain in Bergen city centre surrounded by mountains with houses littered throughout',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-harbour-from-mountain-lookout',
      filename: 'Bergen-Harbour.webp',
      alt: 'Looking down on Bergen harbour from a nearby mountain',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Architecture, PhotoTag.Urban, PhotoTag.Water, PhotoTag.Harbour]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-colourful-houses-tree-lined-street',
      filename: 'Bergen-Streets-2.webp',
      alt: 'A Bergen street lined with colourful houses, leafy trees and mountain views',
      tags: new Set([PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-cobblestone-street-colourful-buildings',
      filename: 'Bergen-Streets.webp',
      alt: 'A quiet cobblestone street in Bergen with colourful buildings on either side and a mountain view in the background',
      tags: new Set([PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-tree-canopy-walkway',
      filename: 'Bergen-Tree-Archway.webp',
      alt: 'A canopy of leafy trees forming a natural archway over a Bergen walkway',
      tags: new Set([PhotoTag.Urban, PhotoTag.Nature, PhotoTag.Street]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'butter-chicken-curry-with-beer',
      filename: 'Butter-Chicken.webp',
      alt: 'A plate of butter chicken curry served with a cold beer',
      tags: new Set([PhotoTag.Food, PhotoTag.Beer]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-church-view-from-mountainside',
      filename: 'Church-View-From-Mountain.webp',
      alt: 'Looking down over Bergen from the mountainside, focusing on the historic church',
      tags: new Set([PhotoTag.Architecture, PhotoTag.Urban]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'elven-bar-whiskey-cocktail',
      filename: 'Elven-Whiskey-Cocktail.webp',
      alt: 'A whiskey cocktail with garnish at Elven bar',
      tags: new Set([PhotoTag.Cocktail]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-harbour-golden-sunset-reflection',
      filename: 'Even-More-Sunset-Bergen-Harbour-2.webp',
      alt: 'Golden sunset light reflecting off the still water of Bergen harbour',
      tags: new Set([PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-harbour-orange-pink-sunset',
      filename: 'Even-More-Sunset-Bergen-Harbour.webp',
      alt: 'Bergen harbour bathed in warm orange and pink sunset colours',
      tags: new Set([PhotoTag.Sunset, PhotoTag.Harbour, PhotoTag.Water]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'wide-bay-mountain-view-fjord-approach',
      filename: 'Fjord-Cruise-1.webp',
      alt: 'Mountain view from a wide bay before entering the fjord',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'norwegian-village-at-fjord-mountain-foot',
      filename: 'Fjord-Cruise-10.webp',
      alt: 'A small Norwegian village nestled at the foot of steep fjord mountains',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'deep-fjord-panorama-snow-capped-mountains',
      filename: 'Fjord-Cruise-11.webp',
      alt: 'Panoramic view of a deep Norwegian fjord with snow topped mountains in the background',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 6048,
      height: 8064
    },
    {
      slug: 'lush-green-slopes-descending-to-fjord',
      filename: 'Fjord-Cruise-12.webp',
      alt: 'Lush green mountain slopes descending to the calm fjord waters below',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'cruise-ship-traversing-fjord',
      filename: 'Fjord-Cruise-13.webp',
      alt: 'A cruise ship traversing the fjord',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-cliff-waterfall-cascade',
      filename: 'Fjord-Cruise-14.webp',
      alt: 'A waterfall cascading down the fjord cliffs into the water below',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'wide-fjord-vista-snowy-mountains-spring',
      filename: 'Fjord-Cruise-15.webp',
      alt: 'Wide fjord vista with snowy mountains receding into the distance on a spring day',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-snowy-mountain-panorama-spring',
      filename: 'Fjord-Cruise-16.webp',
      alt: 'Wide fjord vista with snowy mountains receding into the distance on a spring day',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-entrance-mountain-ridge-clouds',
      filename: 'Fjord-Cruise-2.webp',
      alt: 'Entrance to the fjord with a massive mountain ridge stretching into the clouds',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-cruise-snow-mountains-scattered-villages',
      filename: 'Fjord-Cruise-3.webp',
      alt: 'Fjord scenery during the cruise with snow topped mountains and houses littered throughout the scene',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'fjord-shore-village-between-mountain-peaks',
      filename: 'Fjord-Cruise-5.webp',
      alt: 'A village on the shore in a valley between two mountain peaks',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-ragged-cliff-face-waterfalls',
      filename: 'Fjord-Cruise-6.webp',
      alt: 'Ragged, steep cliff face with waterfalls running into the fjord',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'spring-fjord-landscape-distant-snow-peaks',
      filename: 'Fjord-Cruise-7.webp',
      alt: 'Spring fjord landscape with snow still visible on the distant mountain peaks',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'wide-fjord-passage-towering-cliffs',
      filename: 'Fjord-Cruise-8.webp',
      alt: 'A wide fjord passage with towering cliffs rising steeply on both sides',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'fjord-passage-steep-cliffs-both-sides',
      filename: 'Fjord-Cruise-9.webp',
      alt: 'A wide fjord passage with towering cliffs rising steeply on both sides',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Water, PhotoTag.Mountain]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'alesund-to-oslo-flight-snow-mountain-ranges',
      filename: 'Flying-Alesund-Oslo.webp',
      alt: 'Snow-covered Norwegian mountain ranges viewed from the plane window on the flight from Ålesund to Oslo',
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature, PhotoTag.Mountain, PhotoTag.Transport]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'norwegian-hotdog-with-cold-beer',
      filename: 'Hotdog-And-Beer.webp',
      alt: 'A loaded Norwegian hotdog served alongside a cold beer',
      tags: new Set([PhotoTag.Beer, PhotoTag.Food]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'bergen-harbour-warm-sunset-hues',
      filename: 'More-Sunset-Bergen-Harbour.webp',
      alt: 'Warm sunset hues washing over Bergen harbour and the surrounding hills',
      width: 4032,
      height: 3024
    },
    {
      slug: 'cafe-mash-oat-latte-and-espresso',
      filename: 'Oat-Latte-And-Espresso-Cafe-Mash.webp',
      alt: 'An oat milk latte and espresso on a table at Café Mash in Bergen',
      tags: new Set([PhotoTag.Cafe, PhotoTag.Coffee]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'royk-bby-smoked-brisket-with-sides',
      filename: 'Røyk BBY Brisket.webp',
      alt: 'Smoked brisket with sides at Røyk BBY restaurant in Bergen',
      tags: new Set([PhotoTag.Food, PhotoTag.Beer]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'spanish-norwegian-fusion-tapas-spread',
      filename: 'Spanish-Norwegian-Infusion-Tapas.webp',
      alt: 'A spread of Spanish-Norwegian fusion tapas dishes',
      tags: new Set([PhotoTag.Food, PhotoTag.Beer]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'bergen-harbour-sunset-golden-shimmer',
      filename: 'Sunset-Bergen-Harbour.webp',
      alt: 'Bergen harbour at sunset with golden light shimmering on the water',
      tags: new Set([PhotoTag.Water, PhotoTag.Sunset, PhotoTag.Harbour]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'vinyl-bar-craft-beers-on-draught',
      filename: 'Vinyl-Draught-Beers.webp',
      alt: 'Large selection of craft beers on draught',
      tags: new Set([PhotoTag.Beer]),
      width: 4032,
      height: 3024
    },
    {
      slug: 'alesund-microbrewery-baby-bird-taproom',
      filename: 'Ålesund -Microbrewery-3.webp',
      alt: 'A baby bird relaxing at the Ålesund microbrewery taproom',
      tags: new Set([PhotoTag.Animals]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery-craft-beer-glass',
      filename: 'Ålesund -Microbrewery.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: new Set([PhotoTag.Beer]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery-craft-beer-pint',
      filename: 'Ålesund-Microbrewery-2.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: new Set([PhotoTag.Beer]),
      width: 3024,
      height: 4032
    },
    {
      slug: 'alesund-microbrewery-craft-beer-pour',
      filename: 'Ålesund-Microbrewery-4.webp',
      alt: 'A glass of craft beer at the Ålesund microbrewery',
      tags: new Set([PhotoTag.Beer]),
      width: 3024,
      height: 4032
    }
  ]
};
