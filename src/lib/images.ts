export function tripImageSrc(tripSlug: string, filename: string): string {
	return `/images/trips/${tripSlug}/${filename}`;
}

export function tripThumbSrc(tripSlug: string, filename: string): string {
	return `/images/trips/${tripSlug}/thumbnails/${filename}`;
}
