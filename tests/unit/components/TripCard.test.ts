import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TripCard from '../../../src/lib/components/travel/TripCard.svelte';
import type { Trip } from '../../../src/lib/types/trip';
import { PhotoTag } from '../../../src/lib/types/trip';

const mockTrip: Trip = {
	slug: 'japan-2024',
	title: 'Japan Spring 2024',
	destination: 'Japan',
	coverPhoto: 'cover.jpg',
	description: 'Cherry blossoms and ancient temples.',
	dates: { start: '2024-03-15', end: '2024-03-30' },
	tags: ['culture', 'food'],
	photos: [
		{
			slug: 'photo-1',
			filename: 'photo1.jpg',
			alt: 'View of Mount Fuji',
			width: 1600,
			height: 1067,
			tags: [PhotoTag.Landscape]
		}
	]
};

describe('TripCard', () => {
	test('renders trip title', () => {
		const { getByRole } = render(TripCard, { props: { trip: mockTrip } });
		expect(getByRole('heading', { name: /japan spring 2024/i })).toBeInTheDocument();
	});

	test('renders trip destination', () => {
		const { getByText } = render(TripCard, { props: { trip: mockTrip } });
		expect(getByText('Japan')).toBeInTheDocument();
	});

	test('renders trip description', () => {
		const { getByText } = render(TripCard, { props: { trip: mockTrip } });
		expect(getByText('Cherry blossoms and ancient temples.')).toBeInTheDocument();
	});

	test('card link points to correct trip URL', () => {
		const { container } = render(TripCard, { props: { trip: mockTrip } });
		const link = container.querySelector('a.trip-card');
		expect(link).toHaveAttribute('href', '/travel/japan-2024');
	});

	test('renders tags list', () => {
		const { getByRole } = render(TripCard, { props: { trip: mockTrip } });
		const tagList = getByRole('list', { name: /tags/i });
		expect(tagList).toHaveTextContent('culture');
		expect(tagList).toHaveTextContent('food');
	});

	test('date label contains the trip year', () => {
		const { container } = render(TripCard, { props: { trip: mockTrip } });
		expect(container).toHaveTextContent('2024');
	});

	test('shows at most 4 tags', () => {
		const manyTagTrip: Trip = {
			...mockTrip,
			tags: ['one', 'two', 'three', 'four', 'five']
		};
		const { getByRole } = render(TripCard, { props: { trip: manyTagTrip } });
		const items = getByRole('list', { name: /tags/i }).querySelectorAll('li');
		expect(items.length).toBeLessThanOrEqual(4);
	});
});
