import type { Trip } from '$lib/types/trip';

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
			filename: 'Bergen_Gateway_to_the_Fjords_of_Norway_pillars.webp',
			alt: 'Bergen gateway to the fjords of Norway',
			width: 1920,
			height: 1336
		},
		{
			filename: 'OIP.webp',
			alt: 'TODO: describe this photo',
			width: 474,
			height: 316
		},
		{
			filename: 'OIP2.webp',
			alt: 'TODO: describe this photo',
			width: 474,
			height: 296
		},
		{
			filename: 'OIP3.webp',
			alt: 'TODO: describe this photo',
			width: 474,
			height: 266
		}
	]
};
