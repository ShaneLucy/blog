import { test, expect, describe, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import sharp from 'sharp';
import { processImage, verifyNoExif, updateTripPhotos, main } from '../../scripts/process-images';
import { mkdtemp, rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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

async function makeTestJpeg(path: string, opts: { width: number; height: number; withMeta?: boolean }) {
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

test('preserves original dimensions for full-size output', async () => {
  const input = join(tempDir, 'large-input.jpg');
  const output = join(tempDir, 'large-output.webp');
  const thumb = join(tempDir, 'large-thumb.webp');

  await makeTestJpeg(input, { width: 4000, height: 3000 });

  const { width, height } = await processImage(input, output, thumb);
  expect(width).toBe(4000);
  expect(height).toBe(3000);
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

// --- verifyNoExif ---

test('verifyNoExif: returns true for a processed file with no metadata', async () => {
  const input = join(tempDir, 'vne-input.jpg');
  const output = join(tempDir, 'vne-output.webp');
  const thumb = join(tempDir, 'vne-thumb.webp');

  await makeTestJpeg(input, { width: 200, height: 150 });
  await processImage(input, output, thumb);

  expect(await verifyNoExif(output)).toBe(true);
});

test('verifyNoExif: returns false for a JPEG with EXIF metadata', async () => {
  const input = join(tempDir, 'vne-exif.jpg');
  await makeTestJpeg(input, { width: 200, height: 150, withMeta: true });

  expect(await verifyNoExif(input)).toBe(false);
});

// --- updateTripPhotos ---

describe('updateTripPhotos', () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'update-trip-'));
  });

  afterEach(async () => {
    try {
      await rm(dir, { recursive: true, force: true });
    } catch {
      // temp dir will be cleaned by the OS
    }
  });

  test('does nothing when trip.ts does not exist', async () => {
    await updateTripPhotos(join(dir, 'trip.ts'), [{ filename: 'photo.webp', width: 800, height: 600 }]);
    expect(existsSync(join(dir, 'trip.ts'))).toBe(false);
  });

  test('does nothing when all photos are already in the array', async () => {
    const tripTs = join(dir, 'trip.ts');
    const original = `export const trip = { photos: [\n    { slug: 'photo', filename: 'photo.webp', alt: '', tags: [], width: 800, height: 600 }\n  ] };`;
    await writeFile(tripTs, original, 'utf-8');

    await updateTripPhotos(tripTs, [{ filename: 'photo.webp', width: 800, height: 600 }]);

    expect(await readFile(tripTs, 'utf-8')).toBe(original);
  });

  test('appends new entries to a non-empty photos array', async () => {
    const tripTs = join(dir, 'trip.ts');
    await writeFile(
      tripTs,
      `export const trip = { photos: [\n    { slug: 'existing', filename: 'existing.webp', alt: '', tags: [], width: 100, height: 100 }\n  ] };`,
      'utf-8'
    );

    await updateTripPhotos(tripTs, [{ filename: 'new-photo.webp', width: 1200, height: 800 }]);

    const result = await readFile(tripTs, 'utf-8');
    expect(result).toContain("filename: 'existing.webp'");
    expect(result).toContain("filename: 'new-photo.webp'");
    expect(result).toContain("slug: 'new-photo'");
    expect(result).toContain('width: 1200');
    expect(result).toContain('height: 800');
    expect(result).toContain("tags: []");
  });

  test('inserts entries into an empty photos array', async () => {
    const tripTs = join(dir, 'trip.ts');
    await writeFile(tripTs, `export const trip = { photos: [] };`, 'utf-8');

    await updateTripPhotos(tripTs, [{ filename: 'first.webp', width: 400, height: 300 }]);

    const result = await readFile(tripTs, 'utf-8');
    expect(result).toContain("filename: 'first.webp'");
    expect(result).toContain("slug: 'first'");
    expect(result).toContain('width: 400');
    expect(result).toContain('height: 300');
    expect(result).toContain("tags: []");
  });

  test('derives slug from filename — lowercase, non-alphanumeric chars become hyphens', async () => {
    const tripTs = join(dir, 'trip.ts');
    await writeFile(tripTs, `export const trip = { photos: [] };`, 'utf-8');

    await updateTripPhotos(tripTs, [{ filename: 'My_Photo 01.webp', width: 100, height: 100 }]);

    const result = await readFile(tripTs, 'utf-8');
    expect(result).toContain("slug: 'my-photo-01'");
  });

  test('skips already-present filenames and only adds new ones', async () => {
    const tripTs = join(dir, 'trip.ts');
    await writeFile(
      tripTs,
      `export const trip = { photos: [\n    { slug: 'a', filename: 'a.webp', alt: '', tags: [], width: 100, height: 100 }\n  ] };`,
      'utf-8'
    );

    await updateTripPhotos(tripTs, [
      { filename: 'a.webp', width: 100, height: 100 },
      { filename: 'b.webp', width: 200, height: 150 }
    ]);

    const result = await readFile(tripTs, 'utf-8');
    expect(result).toContain("filename: 'b.webp'");
    expect(result.match(/filename:/g)?.length).toBe(2);
  });
});

// --- main ---

describe('main', () => {
  let contentDir: string;
  let outputDir: string;

  beforeEach(async () => {
    contentDir = await mkdtemp(join(tmpdir(), 'content-'));
    outputDir = await mkdtemp(join(tmpdir(), 'output-'));
  });

  afterEach(async () => {
    try {
      await rm(contentDir, { recursive: true, force: true });
    } catch {
      // temp dir will be cleaned by the OS
    }
    try {
      await rm(outputDir, { recursive: true, force: true });
    } catch {
      // temp dir will be cleaned by the OS
    }
  });

  test('returns early and logs when content dir does not exist', async () => {
    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await main('/nonexistent-dir-abc123', outputDir);
    expect(logSpy).toHaveBeenCalledWith('No src/content/trips directory found. Nothing to process.');
    logSpy.mockRestore();
  });

  test('skips non-directory entries in content dir', async () => {
    await writeFile(join(contentDir, 'not-a-dir.txt'), 'hello');
    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('0 image(s) processed'));
    logSpy.mockRestore();
  });

  test('skips trip directories with no raw subdir', async () => {
    await mkdir(join(contentDir, 'my-trip'));
    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('0 image(s) processed'));
    logSpy.mockRestore();
  });

  test('skips files with unsupported extensions in raw dir', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await writeFile(join(rawDir, 'notes.txt'), 'not an image');
    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Processing 0 image(s)'));
    logSpy.mockRestore();
  });

  test('processes valid images and writes output files', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await makeTestJpeg(join(rawDir, 'photo.jpg'), { width: 300, height: 200 });

    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await main(contentDir, outputDir);
    logSpy.mockRestore();

    expect(existsSync(join(outputDir, 'my-trip', 'photo.webp'))).toBe(true);
    expect(existsSync(join(outputDir, 'my-trip', 'thumbnails', 'photo.webp'))).toBe(true);
  });

  test('logs error and exits with code 1 for an unprocessable image', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await writeFile(join(rawDir, 'corrupt.jpg'), 'this is not an image');

    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    await main(contentDir, outputDir);

    expect(errSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);

    logSpy.mockRestore();
    errSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
