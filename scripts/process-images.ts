import sharp from "sharp";
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

function projectRoot(): string {
  return fileURLToPath(new URL("..", import.meta.url));
}

const THUMBNAIL_WIDTH = 400;
const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".avif"]);

export async function processImage(
  inputPath: string,
  outputPath: string,
  thumbnailPath: string
): Promise<{ width: number; height: number }> {
  const info = await sharp(inputPath).rotate().webp({ quality: 100 }).toFile(outputPath);

  await sharp(inputPath).rotate().resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumbnailPath);

  return { width: info.width, height: info.height };
}

export async function verifyNoExif(filePath: string): Promise<boolean> {
  const meta = await sharp(filePath).metadata();
  return !meta.exif && !meta.iptc && !meta.xmp;
}

export async function updateTripPhotos(
  tripTsPath: string,
  newPhotos: Array<{ filename: string; width: number; height: number }>
): Promise<void> {
  if (!existsSync(tripTsPath)) return;

  const source = await readFile(tripTsPath, "utf-8");

  const existingFilenames = new Set([...source.matchAll(/filename:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]));

  const toAdd = newPhotos.filter((p) => !existingFilenames.has(p.filename));
  if (toAdd.length === 0) return;

  const newEntries = toAdd.map((p) => {
    const slug = p.filename
      .replace(/\.webp$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return [
      `    {`,
      `      slug: '${slug}',`,
      `      filename: '${p.filename}',`,
      `      alt: '',`,
      `      tags: [],`,
      `      width: ${p.width},`,
      `      height: ${p.height}`,
      `    }`
    ].join("\n");
  });

  const photosIdx = source.indexOf("photos: [");
  if (photosIdx === -1) return;

  const openBracket = source.indexOf("[", photosIdx);
  let depth = 1;
  let i = openBracket + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") depth--;
    i++;
  }
  const closingIdx = i - 1;

  const arrayContent = source.slice(openBracket + 1, closingIdx).trim();
  const needsComma = arrayContent.length > 0;
  const beforeClose = source.slice(0, closingIdx);
  const leadingWhitespace = beforeClose.match(/(\s*)$/)?.[1] ?? "";
  const trimmedBeforeClose = beforeClose.slice(0, beforeClose.length - leadingWhitespace.length);
  const insertion = (needsComma ? ",\n" : "\n") + newEntries.join(",\n") + "\n" + leadingWhitespace;
  const updated = trimmedBeforeClose + insertion + source.slice(closingIdx);

  await writeFile(tripTsPath, updated, "utf-8");
  console.info(`  → Updated ${basename(tripTsPath)} with ${toAdd.length} new photo(s)`);
}

export async function main(contentDir?: string, outputDir?: string): Promise<void> {
  const root = contentDir === undefined || outputDir === undefined ? projectRoot() : "";
  contentDir ??= join(root, "src/content/trips");
  outputDir ??= join(root, "static/images/trips");
  if (!existsSync(contentDir)) {
    console.info("No src/content/trips directory found. Nothing to process.");
    return;
  }

  const tripDirs = await readdir(contentDir, { withFileTypes: true });
  let processed = 0;
  let errors = 0;

  for (const entry of tripDirs) {
    if (!entry.isDirectory()) continue;

    const rawDir = join(contentDir, entry.name, "raw");
    if (!existsSync(rawDir)) continue;

    const outDir = join(outputDir, entry.name);
    const thumbDir = join(outDir, "thumbnails");
    await mkdir(outDir, { recursive: true });
    await mkdir(thumbDir, { recursive: true });

    const files = await readdir(rawDir);
    const images = files.filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()));

    console.info(`\n[${entry.name}] Processing ${images.length} image(s)…`);

    const tripPhotos: Array<{ filename: string; width: number; height: number }> = [];

    for (const file of images) {
      const inputPath = join(rawDir, file);
      const stem = basename(file, extname(file));
      const outFile = `${stem}.webp`;
      const outputPath = join(outDir, outFile);
      const thumbnailPath = join(thumbDir, outFile);

      try {
        const { width, height } = await processImage(inputPath, outputPath, thumbnailPath);
        const clean = await verifyNoExif(outputPath);
        const icon = clean ? "✓" : "⚠ EXIF NOT STRIPPED";
        console.info(`  ${icon}  ${outFile}  (${width}×${height})`);
        if (!clean) errors++;
        else {
          processed++;
          tripPhotos.push({ filename: outFile, width, height });
        }
      } catch (err) {
        console.error(`  ✗  ${file}:`, (err as Error).message);
        errors++;
      }
    }

    await updateTripPhotos(join(contentDir, entry.name, "trip.ts"), tripPhotos);
  }

  console.info(`\nDone. ${processed} image(s) processed, ${errors} error(s).`);
  if (errors > 0) process.exit(1);
}

if (import.meta.main) {
  main().catch((err: Error) => {
    console.error("Fatal:", err);
    process.exit(1);
  });
}
