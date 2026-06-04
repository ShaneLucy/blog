import type { Trip } from '$lib/types/trip';

export const trip: Trip = {
	slug: 'norway-2026',
	title: 'Norway in Summer',
	destination: 'Norway',
	region: 'Northern Europe',
	dates: { start: '2026-06-01', end: '2026-06-14' },
	tags: ['fjords', 'hiking', 'midnight-sun', 'villages', 'wilderness'],
	coverPhoto: 'geiranger-fjord.webp',
	description: 'Two weeks chasing the midnight sun through the fjords and mountains of western Norway.',
	body: `Summer in Norway means the sun barely sets. Fourteen days of golden light, impossibly blue fjords, and trails that wind above the clouds.`,
	photos: [
		{
			filename: 'geiranger-fjord.webp',
			alt: 'Geirangerfjord from above, with a cruise ship dwarfed by the surrounding cliffs',
			width: 2400,
			height: 1350
		},
		{
			filename: 'trolltunga.webp',
			alt: 'Trolltunga rock ledge extending over a lake far below',
			width: 2400,
			height: 1600
		},
		{
			filename: 'bergen-wharf.webp',
			alt: 'Colourful wooden buildings on the Bryggen wharf in Bergen',
			width: 2400,
			height: 1800
		},
		{
			filename: 'midnight-sun.webp',
			alt: 'Midnight sun low over still fjord water, sky shades of amber and rose',
			width: 2400,
			height: 1350
		}
	]
};
