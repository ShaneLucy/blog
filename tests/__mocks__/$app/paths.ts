export const base = "";
export const assets = "";
export function resolve(path: string, params?: Record<string, string>): string {
  if (!params) {
    return path;
  }
  return Object.entries(params).reduce((result, [key, value]) => result.split(`[${key}]`).join(value ?? `[${key}]`), path);
}
