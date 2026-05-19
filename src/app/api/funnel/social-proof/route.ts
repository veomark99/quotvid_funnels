/**
 * Server-side proxy for GET /api/funnel/social-proof
 *
 * The funnel page calls this same-origin route after a delayed client timer.
 * This handler forwards to QuotVid (`/api/funnel/social-proof/latest`) using
 * QUOTVID_API_URL + optional FUNNEL_SOCIAL_PROOF_SECRET (never exposed to the browser).
 */

import { NextResponse } from "next/server";

const BACKEND = (process.env.QUOTVID_API_URL ?? "").replace(/\/$/, "");
const SECRET = (process.env.FUNNEL_SOCIAL_PROOF_SECRET ?? "").trim();
const HEADER = "X-Funnel-Social-Proof-Secret";

export async function GET(): Promise<NextResponse> {
  if (!BACKEND) {
    return NextResponse.json(
      {
        show: false,
        action: "upgraded",
      },
      { status: 503 }
    );
  }

  const upstream = `${BACKEND}/api/funnel/social-proof/latest`;
  try {
    const headers: HeadersInit = { Accept: "application/json" };
    if (SECRET) {
      headers[HEADER] = SECRET;
    }

    const res = await fetch(upstream, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data: unknown = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[funnel/social-proof] Backend unreachable:", err);
    return NextResponse.json(
      { show: false, action: "upgraded" },
      { status: 502 }
    );
  }
}
