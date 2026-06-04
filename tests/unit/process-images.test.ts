import { test, expect, beforeAll, afterAll } from 'bun:test';
import sharp from 'sharp';
import { processImage } from '../../scripts/process-images';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let tempDir: string;

beforeAll(async () => {
	tempDir = await mkdtemp(join(tmpdir(), 'process-images-test-'));
});

afterAll(async () => {
	// On Windows, sharp's native bindings may briefly lock files; ignore cleanup errors
	try {
		await rm(tempDir, { recursive: true, force: true });
	} catch {
		// temp dir will be cleaned by the OS
	}
});

async function makeTestJpeg(
	path: string,
	opts: { width: number; height: number; withMeta?: boolean }
) {
	const pipeline = sharp({
		create: {
			width: opts.width,
			height: opts.height,
			channels: 3 as const,
			background: { r: 128, g: 64, b: 32 }
		}
	}).jpeg();

	if (opts.withMeta) {
		await pipeline
			.withMetadata({
				exif: {
					IFD0: { Copyright: 'Test Author', ImageDescription: 'A test image with metadata' }
				}
			})
			.toFile(path);
	} else {
		await pipeline.toFile(path);
	}
}

test('strips all EXIF metadata from output', async () => {
	const input = join(tempDir, 'exif-input.jpg');
	const output = join(tempDir, 'exif-output.webp');
	const thumb = join(tempDir, 'exif-thumb.webp');

	await makeTestJpeg(input, { width: 200, height: 150, withMeta: true });

	// Confirm the source image has EXIF before processing
	const srcMeta = await sharp(input).metadata();
	expect(srcMeta.exif).toBeDefined();

	await processImage(input, output, thumb);

	const outMeta = await sharp(output).metadata();
	expect(outMeta.exif).toBeUndefined();
	expect(outMeta.iptc).toBeUndefined();
	expect(outMeta.xmp).toBeUndefined();
});

test('resizes images wider than 2400px', async () => {
	const input = join(tempDir, 'large-input.jpg');
	const output = join(tempDir, 'large-output.webp');
	const thumb = join(tempDir, 'large-thumb.webp');

	await makeTestJpeg(input, { width: 4000, height: 3000 });

	const { width } = await processImage(input, output, thumb);
	expect(width).toBeLessThanOrEqual(2400);
});

test('does not upscale images narrower than 2400px', async () => {
	const input = join(tempDir, 'small-input.jpg');
	const output = join(tempDir, 'small-output.webp');
	const thumb = join(tempDir, 'small-thumb.webp');

	await makeTestJpeg(input, { width: 800, height: 600 });

	const { width } = await processImage(input, output, thumb);
	expect(width).toBe(800);
});

test('generates thumbnail at most 400px wide', async () => {
	const input = join(tempDir, 'thumb-input.jpg');
	const output = join(tempDir, 'thumb-output.webp');
	const thumb = join(tempDir, 'thumb-result.webp');

	await makeTestJpeg(input, { width: 1200, height: 900 });
	await processImage(input, output, thumb);

	const thumbMeta = await sharp(thumb).metadata();
	expect(thumbMeta.width).toBeLessThanOrEqual(400);
});

test('outputs valid WebP files', async () => {
	const input = join(tempDir, 'format-input.jpg');
	const output = join(tempDir, 'format-output.webp');
	const thumb = join(tempDir, 'format-thumb.webp');

	await makeTestJpeg(input, { width: 300, height: 200 });
	await processImage(input, output, thumb);

	const outMeta = await sharp(output).metadata();
	const thumbMeta = await sharp(thumb).metadata();
	expect(outMeta.format).toBe('webp');
	expect(thumbMeta.format).toBe('webp');
});

test('thumbnail also has no EXIF metadata', async () => {
	const input = join(tempDir, 'thumb-exif-input.jpg');
	const output = join(tempDir, 'thumb-exif-output.webp');
	const thumb = join(tempDir, 'thumb-exif-thumb.webp');

	await makeTestJpeg(input, { width: 600, height: 400, withMeta: true });
	await processImage(input, output, thumb);

	const thumbMeta = await sharp(thumb).metadata();
	expect(thumbMeta.exif).toBeUndefined();
	expect(thumbMeta.iptc).toBeUndefined();
	expect(thumbMeta.xmp).toBeUndefined();
});
