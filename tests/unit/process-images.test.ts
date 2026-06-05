import { test, expect, describe, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import sharp from 'sharp';
import { processImage, verifyNoExif, main } from '../../scripts/process-images';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main('/nonexistent-dir-abc123', outputDir);
    expect(logSpy).toHaveBeenCalledWith(
      'No src/content/trips directory found. Nothing to process.'
    );
    logSpy.mockRestore();
  });

  test('skips non-directory entries in content dir', async () => {
    await writeFile(join(contentDir, 'not-a-dir.txt'), 'hello');
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('0 image(s) processed'));
    logSpy.mockRestore();
  });

  test('skips trip directories with no raw subdir', async () => {
    await mkdir(join(contentDir, 'my-trip'));
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('0 image(s) processed'));
    logSpy.mockRestore();
  });

  test('skips files with unsupported extensions in raw dir', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await writeFile(join(rawDir, 'notes.txt'), 'not an image');
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(contentDir, outputDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Processing 0 image(s)'));
    logSpy.mockRestore();
  });

  test('processes valid images and writes output files', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await makeTestJpeg(join(rawDir, 'photo.jpg'), { width: 300, height: 200 });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(contentDir, outputDir);
    logSpy.mockRestore();

    expect(existsSync(join(outputDir, 'my-trip', 'photo.webp'))).toBe(true);
    expect(existsSync(join(outputDir, 'my-trip', 'thumbnails', 'photo.webp'))).toBe(true);
  });

  test('logs error and exits with code 1 for an unprocessable image', async () => {
    const rawDir = join(contentDir, 'my-trip', 'raw');
    await mkdir(rawDir, { recursive: true });
    await writeFile(join(rawDir, 'corrupt.jpg'), 'this is not an image');

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
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
