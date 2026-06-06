export const base = '';
export const assets = '';
export function resolve(path: string, params?: Record<string, string>): string {
	if (!params) return path;
	return path.replace(/\[([^\]]+)\]/g, (_, key) => params[key] ?? `[${key}]`);
}
