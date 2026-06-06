import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseExif } from 'exifr';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'src/content/trips');
const OUTPUT_DIR = join(ROOT, 'static/images/trips');
const MAX_FULL_WIDTH = 2400;
const THUMBNAIL_WIDTH = 400;
const SUPPORTED_EXTS = new Set([
	'.jpg',
	'.jpeg',
	'.png',
	'.tif',
	'.tiff',
	'.webp',
	'.avif',
	'.heic',
	'.heif'
]);

export interface ImageMetadata {
	description?: string;
	dateTaken?: Date;
	gps?: { latitude: number; longitude: number };
}

function slugify(str: string): string {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60);
}

function parseNominatimAddress(address: Record<string, string>): string {
	const poi =
		address.tourism ||
		address.historic ||
		address.amenity ||
		address.building ||
		address.road ||
		address.leisure;
	const city = address.city || address.town || address.village || address.county;
	return [poi, city].filter(Boolean).join(' ');
}

export async function extractImageMetadata(inputPath: string): Promise<ImageMetadata> {
	try {
		const tags = (await parseExif(inputPath, {
			pick: ['ImageDescription', 'DateTimeOriginal'],
			gps: true
		})) as
			| {
					ImageDescription?: string;
					DateTimeOriginal?: Date;
					latitude?: number;
					longitude?: number;
			  }
			| undefined;

		if (!tags) return {};

		return {
			description: tags.ImageDescription?.trim() || undefined,
			dateTaken: tags.DateTimeOriginal instanceof Date ? tags.DateTimeOriginal : undefined,
			gps:
				typeof tags.latitude === 'number' && typeof tags.longitude === 'number'
					? { latitude: tags.latitude, longitude: tags.longitude }
					: undefined
		};
	} catch {
		return {};
	}
}

const geocodeCache = new Map<string, string>();
let lastGeocodeMs = 0;

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
	const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
	if (geocodeCache.has(key)) return geocodeCache.get(key)!;

	// Nominatim policy: max 1 request per second
	const wait = 1000 - (Date.now() - lastGeocodeMs);
	if (wait > 0) await new Promise((r) => setTimeout(r, wait));
	lastGeocodeMs = Date.now();

	try {
		const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=17&accept-language=en`;
		const res = await fetch(url, { headers: { 'User-Agent': 'blog-image-processor/1.0' } });
		const data = (await res.json()) as { address?: Record<string, string> };
		const place = parseNominatimAddress(data.address ?? {});
		const slug = place ? slugify(place) : '';
		geocodeCache.set(key, slug);
		return slug;
	} catch {
		geocodeCache.set(key, '');
		return '';
	}
}

/**
 * Generate a descriptive, unique output filename stem.
 *
 * Priority:
 *   1. EXIF ImageDescription (slugified) + date prefix
 *   2. Reverse-geocoded place name + date prefix
 *   3. Date + time (no location info)
 *   4. Original filename stem (fallback — no EXIF at all)
 *
 * A numeric suffix (-2, -3 …) is appended when a stem is already in use.
 */
export function generateOutputStem(
	meta: ImageMetadata,
	placeName: string,
	fallbackStem: string,
	usedStems: Set<string>
): string {
	const d = meta.dateTaken;
	const datePart = d
		? `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
		: '';

	let base: string;
	if (meta.description) {
		const slug = slugify(meta.description);
		base = datePart ? `${datePart}-${slug}` : slug;
	} else if (placeName) {
		base = datePart ? `${datePart}-${placeName}` : placeName;
	} else if (datePart) {
		const timePart = `${String(d!.getHours()).padStart(2, '0')}${String(d!.getMinutes()).padStart(2, '0')}`;
		base = `${datePart}-${timePart}`;
	} else {
		base = fallbackStem;
	}

	let stem = base;
	let counter = 2;
	while (usedStems.has(stem)) {
		stem = `${base}-${counter++}`;
	}
	usedStems.add(stem);
	return stem;
}

/**
 * Process a single image: correct orientation, strip all EXIF metadata,
 * resize to max width, and convert to WebP. Writes both full-size and
 * thumbnail variants.
 *
 * Note: `.rotate()` without arguments applies the EXIF orientation tag
 * and then discards it. Omitting `.withMetadata()` ensures all EXIF,
 * IPTC, and XMP metadata is stripped from the output.
 */
export async function processImage(
	inputPath: string,
	outputPath: string,
	thumbnailPath: string
): Promise<{ width: number; height: number }> {
	const info = await sharp(inputPath)
		.rotate()
		.resize({ width: MAX_FULL_WIDTH, withoutEnlargement: true })
		.webp({ quality: 85 })
		.toFile(outputPath);

	await sharp(inputPath)
		.rotate()
		.resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
		.webp({ quality: 80 })
		.toFile(thumbnailPath);

	return { width: info.width, height: info.height };
}

export async function verifyNoExif(filePath: string): Promise<boolean> {
	const meta = await sharp(filePath).metadata();
	return !meta.exif && !meta.iptc && !meta.xmp;
}

export async function main(
	contentDir: string = CONTENT_DIR,
	outputDir: string = OUTPUT_DIR
): Promise<void> {
	if (!existsSync(contentDir)) {
		console.info('No src/content/trips directory found. Nothing to process.');
		return;
	}

	const tripDirs = await readdir(contentDir, { withFileTypes: true });
	let processed = 0;
	let errors = 0;

	for (const entry of tripDirs) {
		if (!entry.isDirectory()) continue;

		const rawDir = join(contentDir, entry.name, 'raw');
		if (!existsSync(rawDir)) continue;

		const outDir = join(outputDir, entry.name);
		const thumbDir = join(outDir, 'thumbnails');
		await mkdir(outDir, { recursive: true });
		await mkdir(thumbDir, { recursive: true });

		const files = await readdir(rawDir);
		const images = files.filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()));

		console.info(`\n[${entry.name}] Processing ${images.length} image(s)…`);

		const usedStems = new Set<string>();

		for (const file of images) {
			const inputPath = join(rawDir, file);
			const fallbackStem = basename(file, extname(file));

			const meta = await extractImageMetadata(inputPath);
			let placeName = '';
			if (meta.gps) {
				placeName = await reverseGeocode(meta.gps.latitude, meta.gps.longitude);
			}

			const stem = generateOutputStem(meta, placeName, fallbackStem, usedStems);
			const outFile = `${stem}.webp`;
			const outputPath = join(outDir, outFile);
			const thumbnailPath = join(thumbDir, outFile);

			try {
				const { width, height } = await processImage(inputPath, outputPath, thumbnailPath);
				const clean = await verifyNoExif(outputPath);
				const icon = clean ? '✓' : '⚠ EXIF NOT STRIPPED';
				const wasRenamed = stem !== fallbackStem ? `  [was ${file}]` : '';
				console.info(`  ${icon}  ${outFile}  (${width}×${height})${wasRenamed}`);
				if (!clean) errors++;
				else processed++;
			} catch (err) {
				console.error(`  ✗  ${file}:`, (err as Error).message);
				errors++;
			}
		}
	}

	console.info(`\nDone. ${processed} image(s) processed, ${errors} error(s).`);
	if (errors > 0) process.exit(1);
}

if (import.meta.main) {
	main().catch((err: Error) => {
		console.error('Fatal:', err);
		process.exit(1);
	});
}
