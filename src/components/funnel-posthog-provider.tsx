'use client';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PostHogProvider, usePostHog } from 'posthog-js/react';

import { isPosthogEnabled } from '@/lib/posthog-env';

/** useSearchParams must be wrapped in Suspense when used from the App Router layout. */
function PosthogAppRouterPageview(): React.JSX.Element {
  const posthog = usePostHog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!pathname) return;
    let url = window.origin + pathname;
    const q = searchParams?.toString();
    if (q) url += `?${q}`;
    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return <></>;
}

export function FunnelPostHogProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!isPosthogEnabled() || !apiKey || !apiHost) return <>{children}</>;

  return (
    <PostHogProvider
      apiKey={apiKey}
      options={{
        api_host: apiHost,
        capture_pageview: false,
        capture_pageleave: true,
      }}
    >
      <React.Suspense fallback={null}>
        <PosthogAppRouterPageview />
      </React.Suspense>
      {children}
    </PostHogProvider>
  );
}
