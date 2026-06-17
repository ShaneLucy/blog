import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

function projectRoot(): string {
  return fileURLToPath(new URL('..', import.meta.url));
}

const THUMBNAIL_WIDTH = 400;
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif']);

export async function processImage(
  inputPath: string,
  outputPath: string,
  thumbnailPath: string
): Promise<{ width: number; height: number }> {
  const info = await sharp(inputPath)
    .rotate()
    .webp({ quality: 100 })
    .toFile(outputPath);

  await sharp(inputPath).rotate().resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumbnailPath);

  return { width: info.width, height: info.height };
}

export async function verifyNoExif(filePath: string): Promise<boolean> {
  const meta = await sharp(filePath).metadata();
  return !meta.exif && !meta.iptc && !meta.xmp;
}

export async function main(contentDir?: string, outputDir?: string): Promise<void> {
  const root = contentDir === undefined || outputDir === undefined ? projectRoot() : '';
  contentDir ??= join(root, 'src/content/trips');
  outputDir ??= join(root, 'static/images/trips');
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
        console.info(`  ${icon}  ${outFile}  (${width}×${height})`);
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
