export enum PhotoTag {
  Architecture = 'architecture',
  Animals = 'animals',
  Beer = 'beer',
  Cocktail = 'cocktail',
  Coffee = 'coffee',
  Cafe = 'cafe',
  Landscape = 'landscape',
  Food = 'food',
  Night = 'night',
  Portrait = 'portrait',
  Street = 'street',
  Detail = 'detail',
  Nature = 'nature',
  Water = 'water',
  Harbour = 'harbour',
  Mountain = 'mountain',
  Urban = 'urban',
  Interior = 'interior',
  Transport = 'transport',
  Sunset = 'sunset'
}

export interface TripPhoto {
  slug: string;
  filename: string;
  alt: string;
  caption?: string;
  tags?: PhotoTag[];
  width: number;
  height: number;
}

export interface Trip {
  slug: string;
  title: string;
  destination: string;
  region?: string;
  dates: {
    start: string;
    end: string;
  };
  tags: string[];
  coverPhoto: string;
  description: string;
  body?: string;
  photos: TripPhoto[];
}
