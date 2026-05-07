/**
 * Hero mosaic clips: optional CDN origin. When unset, `src` is used as-is
 * (e.g. `/assets/426.mp4` from `public/`).
 *
 * Base should include any path prefix, e.g. `https://cdn.example.com/funnel-videos`
 * with files `{base}/426.mp4`, `{base}/768.mp4`, etc. (same names as under `public/assets/`).
 */
export function resolveFunnelVideoSrc(
  src: string | undefined,
): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_FUNNEL_VIDEO_CDN_BASE?.trim();
  if (!base) return src;
  const relative = src.replace(/^\/+assets\/+/, "");
  const cleanBase = base.replace(/\/+$/, "");
  return `${cleanBase}/${relative}`;
}
