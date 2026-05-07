import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
  robots: { index: false, follow: false },
};

const homeHref =
  process.env.NEXT_PUBLIC_MARKETING_SITE_URL ?? "https://quotvid.com";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col bg-[#0B0F19] text-zinc-100">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-10 flex w-full justify-center">
          <Image
            src="/assets/quotvid_white_logo.svg"
            alt="QuotVid"
            width={500}
            height={155}
            priority
            className="h-10 w-auto max-w-[240px] object-contain object-center"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
          404
        </p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          This link isn&apos;t valid or the page has moved. Use the link from your
          invite or campaign to continue.
        </p>

        <hr className="my-10 w-full max-w-xs border-zinc-800" />

        <Link
          href={homeHref}
          className="inline-flex items-center justify-center rounded-xl border border-amber-500/35 bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-300 transition hover:border-amber-400/50 hover:bg-amber-500/15"
        >
          Go to QuotVid
        </Link>

        <p className="mt-8 text-xs text-zinc-600">
          Need help? Contact support from your QuotVid dashboard.
        </p>
      </main>
    </div>
  );
}
