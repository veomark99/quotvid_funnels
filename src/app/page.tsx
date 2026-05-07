import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-8 px-6 py-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400/90">
            QuotVid
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Funnels</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Next.js app for platform-specific acquisition flows. Development hub only—funnel
            URLs are shareable once deployed.
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-sm">
          <li>
            <Link
              href="/f/pinterest"
              className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-medium text-amber-400 transition hover:border-amber-500/40 hover:bg-zinc-800"
            >
              Pinterest funnel →
            </Link>
          </li>
          <li>
            <Link
              href="/f/youtube"
              className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-medium text-amber-400 transition hover:border-amber-500/40 hover:bg-zinc-800"
            >
              YouTube funnel →
            </Link>
          </li>
        </ul>
        <p className="text-xs text-zinc-600">
          Configure <code className="text-zinc-500">.env.local</code> from{" "}
          <code className="text-zinc-500">.env.example</code> before calling the API.
        </p>
      </main>
    </div>
  );
}
