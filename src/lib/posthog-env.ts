export function isPosthogEnabled(): boolean {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  return Boolean(key?.length && host?.length);
}
