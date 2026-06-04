import { allTrips, allDestinations, allTags } from '$lib/data/trips';

export function load() {
	return {
		trips: allTrips,
		destinations: allDestinations,
		tags: allTags
	};
}
