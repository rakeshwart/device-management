export function assetUrl(file: string): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${file.replace(/^\//, "")}`;
}
