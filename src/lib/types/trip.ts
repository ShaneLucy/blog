export enum PhotoTag {
	Architecture = 'architecture',
	Landscape    = 'landscape',
	Food         = 'food',
	Night        = 'night',
	Portrait     = 'portrait',
	Street       = 'street',
	Detail       = 'detail',
	Nature       = 'nature',
	Water        = 'water',
	Urban        = 'urban',
	Interior     = 'interior',
	Transport    = 'transport',
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
