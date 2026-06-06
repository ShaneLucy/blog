import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import TripFilters from '../../../src/lib/components/travel/TripFilters.svelte';

const destinations = ['Japan', 'Norway'];
const tags = ['adventure', 'culture', 'food'];

describe('TripFilters', () => {
	test('renders destination select with all-destinations option and each destination', () => {
		const { getByLabelText } = render(TripFilters, { props: { destinations, tags } });
		const select = getByLabelText(/destination/i) as HTMLSelectElement;
		const options = Array.from(select.options).map((o) => o.value);
		expect(options).toContain('');
		for (const dest of destinations) {
			expect(options).toContain(dest);
		}
	});

	test('renders a tag filter group with a button per tag', () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		const group = getByRole('group', { name: /filter by tag/i });
		const buttons = group.querySelectorAll('button');
		expect(buttons.length).toBe(tags.length);
	});

	test('Newest sort button is pressed by default', () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		expect(getByRole('button', { name: /newest/i })).toHaveAttribute('aria-pressed', 'true');
		expect(getByRole('button', { name: /a.z/i })).toHaveAttribute('aria-pressed', 'false');
	});

	test('clicking A–Z sort button marks it as pressed', async () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		await fireEvent.click(getByRole('button', { name: /a.z/i }));
		expect(getByRole('button', { name: /a.z/i })).toHaveAttribute('aria-pressed', 'true');
		expect(getByRole('button', { name: /newest/i })).toHaveAttribute('aria-pressed', 'false');
	});

	test('tag button is unpressed by default', () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		expect(getByRole('button', { name: /adventure/i })).toHaveAttribute('aria-pressed', 'false');
	});

	test('clicking a tag button marks it as pressed', async () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		await fireEvent.click(getByRole('button', { name: /adventure/i }));
		expect(getByRole('button', { name: /adventure/i })).toHaveAttribute('aria-pressed', 'true');
	});

	test('clicking an active tag deselects it', async () => {
		const { getByRole } = render(TripFilters, { props: { destinations, tags } });
		const btn = getByRole('button', { name: /culture/i });
		await fireEvent.click(btn);
		await fireEvent.click(btn);
		expect(btn).toHaveAttribute('aria-pressed', 'false');
	});

	test('clear button is absent when no filters are active', () => {
		const { queryByText } = render(TripFilters, { props: { destinations, tags } });
		expect(queryByText(/clear/i)).not.toBeInTheDocument();
	});

	test('clear button appears after selecting a tag', async () => {
		const { getByRole, getByText } = render(TripFilters, { props: { destinations, tags } });
		await fireEvent.click(getByRole('button', { name: /food/i }));
		expect(getByText(/clear/i)).toBeInTheDocument();
	});

	test('clicking clear resets all filters', async () => {
		const { getByRole, queryByText } = render(TripFilters, { props: { destinations, tags } });
		await fireEvent.click(getByRole('button', { name: /food/i }));
		await fireEvent.click(getByRole('button', { name: /clear/i }));
		expect(queryByText(/clear/i)).not.toBeInTheDocument();
		expect(getByRole('button', { name: /newest/i })).toHaveAttribute('aria-pressed', 'true');
	});
});
