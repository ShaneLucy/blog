import type { Trip } from '$lib/types/trip';
import { PhotoTag } from '$lib/types/trip';

export const trip: Trip = {
	slug: 'japan-2024',
	title: 'Two Weeks in Japan',
	destination: 'Japan',
	region: 'East Asia',
	dates: { start: '2024-03-15', end: '2024-03-29' },
	tags: ['temples', 'food', 'hiking', 'cherry-blossoms', 'cities'],
	coverPhoto: 'fushimi-inari.webp',
	description: 'Exploring Tokyo, Kyoto, and the Japanese Alps during cherry blossom season.',
	body: `Two weeks in Japan during hanami season turned out to be everything I'd hoped for and more. Starting in Tokyo, working south through Kyoto, then escaping to the mountains of Hakuba.`,
	photos: [
		{
			slug: 'fushimi-inari',
			filename: 'fushimi-inari.webp',
			alt: 'Rows of vermilion torii gates at Fushimi Inari shrine',
			tags: [PhotoTag.Architecture, PhotoTag.Nature],
			width: 2400,
			height: 1600
		},
		{
			slug: 'tokyo-shibuya',
			filename: 'tokyo-shibuya.webp',
			alt: 'Shibuya crossing at night from above',
			tags: [PhotoTag.Urban, PhotoTag.Night, PhotoTag.Street],
			width: 2400,
			height: 1600
		},
		{
			slug: 'ramen-shop',
			filename: 'ramen-shop.webp',
			alt: 'Bowl of tonkotsu ramen with soft egg',
			tags: [PhotoTag.Food, PhotoTag.Interior],
			width: 2400,
			height: 1800
		},
		{
			slug: 'hakuba-alps',
			filename: 'hakuba-alps.webp',
			alt: 'Snow-capped Japanese Alps above Hakuba village',
			tags: [PhotoTag.Landscape, PhotoTag.Nature],
			width: 2400,
			height: 1350
		}
	]
};
