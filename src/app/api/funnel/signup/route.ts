/**
 * Server-side proxy for POST /api/funnel/signup.
 *
 * The form calls this same-domain endpoint (no CORS required).
 * This handler forwards the request to the QuotVid backend using
 * the server-only QUOTVID_API_URL environment variable.
 *
 * Required env var:
 *   QUOTVID_API_URL=https://api.quotvid.com   (set in hosting dashboard, never in NEXT_PUBLIC_*)
 */

import { type NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.QUOTVID_API_URL ?? "").replace(/\/$/, "");

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!BACKEND) {
    console.error("[funnel/signup] QUOTVID_API_URL is not set");
    return NextResponse.json(
      { detail: { code: "server_error", message: "Server is not configured. Please try again later." } },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { detail: { code: "invalid_request", message: "Invalid request body." } },
      { status: 400 }
    );
  }

  const upstream = `${BACKEND}/api/funnel/signup`;

  try {
    const res = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: unknown = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[funnel/signup] Backend unreachable:", err);
    return NextResponse.json(
      { detail: { code: "server_error", message: "Could not reach the server. Please try again." } },
      { status: 502 }
    );
  }
}
