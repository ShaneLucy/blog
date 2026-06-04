import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'src/content/trips');
const OUTPUT_DIR = join(ROOT, 'static/images/trips');
const MAX_FULL_WIDTH = 2400;
const THUMBNAIL_WIDTH = 400;
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif']);

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

async function verifyNoExif(filePath: string): Promise<boolean> {
	const meta = await sharp(filePath).metadata();
	return !meta.exif && !meta.iptc && !meta.xmp;
}

async function main(): Promise<void> {
	if (!existsSync(CONTENT_DIR)) {
		console.log('No src/content/trips directory found. Nothing to process.');
		return;
	}

	const tripDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
	let processed = 0;
	let errors = 0;

	for (const entry of tripDirs) {
		if (!entry.isDirectory()) continue;

		const rawDir = join(CONTENT_DIR, entry.name, 'raw');
		if (!existsSync(rawDir)) continue;

		const outDir = join(OUTPUT_DIR, entry.name);
		const thumbDir = join(outDir, 'thumbnails');
		await mkdir(outDir, { recursive: true });
		await mkdir(thumbDir, { recursive: true });

		const files = await readdir(rawDir);
		const images = files.filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()));

		console.log(`\n[${entry.name}] Processing ${images.length} image(s)…`);

		for (const file of images) {
			const inputPath = join(rawDir, file);
			const stem = basename(file, extname(file));
			const outFile = `${stem}.webp`;
			const outputPath = join(outDir, outFile);
			const thumbnailPath = join(thumbDir, outFile);

			try {
				const { width, height } = await processImage(inputPath, outputPath, thumbnailPath);
				const clean = await verifyNoExif(outputPath);
				const icon = clean ? '✓' : '⚠ EXIF NOT STRIPPED';
				console.log(`  ${icon}  ${outFile}  (${width}×${height})`);
				if (!clean) errors++;
				else processed++;
			} catch (err) {
				console.error(`  ✗  ${file}:`, (err as Error).message);
				errors++;
			}
		}
	}

	console.log(`\nDone. ${processed} image(s) processed, ${errors} error(s).`);
	if (errors > 0) process.exit(1);
}

if (import.meta.main) {
	main().catch((err: Error) => {
		console.error('Fatal:', err);
		process.exit(1);
	});
}
