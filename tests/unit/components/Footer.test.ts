import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Footer from '../../../src/lib/components/layout/Footer.svelte';

describe('Footer', () => {
	test('renders site name in copyright', () => {
		const { container } = render(Footer);
		expect(container).toHaveTextContent('Wandering Pages');
	});

	test('renders a time element with correct datetime', () => {
		const { container } = render(Footer);
		const time = container.querySelector('time');
		expect(time).toBeInTheDocument();
		expect(time).toHaveAttribute('datetime', '2026');
	});

	test('has footer navigation landmark', () => {
		const { getByRole } = render(Footer);
		expect(getByRole('navigation', { name: /footer navigation/i })).toBeInTheDocument();
	});

	test('About link points to /about', () => {
		const { getByRole } = render(Footer);
		expect(getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
	});
});
