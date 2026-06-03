export interface TripPhoto {
	filename: string;
	alt: string;
	caption?: string;
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
