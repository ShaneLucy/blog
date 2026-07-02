export const RENDITION_WIDTHS = [400, 800, 1600, 2400] as const;
export type RenditionWidth = (typeof RENDITION_WIDTHS)[number];

export const THUMB_WIDTH: RenditionWidth = 400;
export const MAX_WIDTH: RenditionWidth = 2400;

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const WEBP_QUALITY = 80;

// Gallery grid: auto-fill minmax(260px,1fr) inside .container (max 1200px)
export const GALLERY_SIZES = "(max-width: 559px) 100vw, (max-width: 899px) 50vw, (max-width: 1199px) 33vw, 300px";
export const HERO_SIZES = "100vw";
export const DETAIL_SIZES = "100vw";

const IMAGES_BASE = "/images/trips";

function stemOf(filename: string): string {
  return filename.replace(/\.[^.]+$/, "");
}

function renditionUrl(slug: string, filename: string, suffix: string): string {
  const name = `${stemOf(filename)}-${suffix}`;
  return `${IMAGES_BASE}/${encodeURIComponent(slug)}/${encodeURIComponent(name)}.webp`;
}

/** Single rendition URL. Defaults to the largest (2400px). */
export function tripImageSrc(slug: string, filename: string, width: RenditionWidth = MAX_WIDTH): string {
  return renditionUrl(slug, filename, String(width));
}

/** Full responsive candidate list for use in srcset attributes. */
export function tripSrcset(slug: string, filename: string): string {
  return RENDITION_WIDTHS.map((w) => `${renditionUrl(slug, filename, String(w))} ${w}w`).join(", ");
}

/** OG card image path (caller prefixes SITE_URL for absolute URL). */
export function tripOgSrc(slug: string, filename: string): string {
  return renditionUrl(slug, filename, "og");
}
