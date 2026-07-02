import sharp from "sharp";
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync, type Dirent } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { RENDITION_WIDTHS, OG_WIDTH, OG_HEIGHT, WEBP_QUALITY } from "../src/lib/images";

function projectRoot(): string {
  return fileURLToPath(new URL("..", import.meta.url));
}

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".avif"]);

export async function processImage(inputPath: string, outDir: string, stem: string): Promise<{ width: number; height: number }> {
  const meta = await sharp(inputPath).rotate().metadata();
  const sourceWidth = meta.width ?? 0;
  const sourceHeight = meta.height ?? 0;

  const targets = (RENDITION_WIDTHS as readonly number[]).filter((w) => w < sourceWidth);
  if (targets.length === 0 || targets[targets.length - 1] < sourceWidth) {
    targets.push(Math.min(sourceWidth, RENDITION_WIDTHS[RENDITION_WIDTHS.length - 1]));
  }

  await Promise.all(
    targets.map((w) =>
      sharp(inputPath)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(join(outDir, `${stem}-${w}.webp`))
    )
  );

  await sharp(inputPath)
    .rotate()
    .resize({ width: OG_WIDTH, height: OG_HEIGHT, fit: "cover", position: "attention" })
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(outDir, `${stem}-og.webp`));

  return { width: sourceWidth, height: sourceHeight };
}

export async function verifyNoExif(filePath: string): Promise<boolean> {
  const meta = await sharp(filePath).metadata();
  return !meta.exif && !meta.iptc && !meta.xmp;
}

export async function updateTripPhotos(
  tripTsPath: string,
  newPhotos: Array<{ filename: string; width: number; height: number }>
): Promise<void> {
  if (!existsSync(tripTsPath)) {
    return;
  }

  const source = await readFile(tripTsPath, "utf-8");

  const existingFilenames = new Set([...source.matchAll(/filename:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]));

  const toAdd = newPhotos.filter((p) => !existingFilenames.has(p.filename));
  if (toAdd.length === 0) {
    return;
  }

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
  if (photosIdx === -1) {
    return;
  }

  const openBracket = source.indexOf("[", photosIdx);
  let depth = 1;
  let i = openBracket + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "[") {
      depth++;
    } else if (source[i] === "]") {
      depth--;
    } else {
      /* not a bracket */
    }
    i++;
  }
  const closingIdx = i - 1;

  const arrayContent = source.slice(openBracket + 1, closingIdx).trim();
  const needsComma = arrayContent.length > 0;
  const beforeClose = source.slice(0, closingIdx);
  const trimmedBeforeClose = beforeClose.trimEnd();
  const leadingWhitespace = beforeClose.slice(trimmedBeforeClose.length);
  const insertion = `${(needsComma ? ",\n" : "\n") + newEntries.join(",\n")}\n${leadingWhitespace}`;
  const updated = trimmedBeforeClose + insertion + source.slice(closingIdx);

  await writeFile(tripTsPath, updated, "utf-8");
  console.info(`  → Updated ${basename(tripTsPath)} with ${toAdd.length} new photo(s)`);
}

async function processTrip(entry: Dirent, contentDir: string, outputDir: string): Promise<{ processed: number; errors: number }> {
  const rawDir = join(contentDir, entry.name, "raw");
  if (!existsSync(rawDir)) {
    return { processed: 0, errors: 0 };
  }

  const outDir = join(outputDir, entry.name);
  await mkdir(outDir, { recursive: true });

  const files = await readdir(rawDir);
  const images = files.filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()));
  console.info(`\n[${entry.name}] Processing ${images.length} image(s)…`);

  const tripPhotos: Array<{ filename: string; width: number; height: number }> = [];
  let processed = 0;
  let errors = 0;

  for (const file of images) {
    const inputPath = join(rawDir, file);
    const stem = basename(file, extname(file));

    try {
      const { width, height } = await processImage(inputPath, outDir, stem);
      const filesToVerify = [
        ...RENDITION_WIDTHS.filter((w) => w <= width).map((w) => join(outDir, `${stem}-${w}.webp`)),
        join(outDir, `${stem}-og.webp`)
      ];
      const cleanResults = await Promise.all(filesToVerify.map(verifyNoExif));
      const clean = cleanResults.every(Boolean);
      const icon = clean ? "✓" : "⚠ EXIF NOT STRIPPED";
      console.info(`  ${icon}  ${stem}  (${width}×${height})`);
      if (!clean) {
        errors++;
      } else {
        processed++;
        tripPhotos.push({ filename: `${stem}.webp`, width, height });
      }
    } catch (err) {
      console.error(`  ✗  ${file}:`, (err as Error).message);
      errors++;
    }
  }

  await updateTripPhotos(join(contentDir, entry.name, "trip.ts"), tripPhotos);
  return { processed, errors };
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
    if (entry.isDirectory()) {
      const result = await processTrip(entry, contentDir, outputDir);
      processed += result.processed;
      errors += result.errors;
    }
  }

  console.info(`\nDone. ${processed} image(s) processed, ${errors} error(s).`);
  if (errors > 0) {
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch((err: Error) => {
    console.error("Fatal:", err);
    process.exit(1);
  });
}
