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

export enum TripTag {
  Beer = 'beer',
  CherryBlossoms = 'cherry-blossoms',
  Cities = 'cities',
  CityBreak = 'city-break',
  Cocktails = 'cocktails',
  Fjords = 'fjords',
  Food = 'food',
  Hiking = 'hiking',
  MidnightSun = 'midnight-sun',
  Temples = 'temples',
  Villages = 'villages',
  Wilderness = 'wilderness'
}

export interface TripPhoto {
  slug: string;
  filename: string;
  alt: string;
  caption?: string;
  tags?: ReadonlySet<PhotoTag>;
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
  tags: ReadonlySet<TripTag>;
  coverPhoto: {
    filename: string;
    alt: string;
  };
  description: string;
  body?: string;
  photos: TripPhoto[];
}
