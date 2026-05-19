"use client";

import { useEffect, useState } from "react";

const STORAGE_DISMISS = "qf_social_proof_dismiss_v1";

type SocialProofPayload = {
  show?: boolean;
  display_name?: string | null;
  plan_label?: string | null;
  relative_label?: string | null;
  action?: string;
};

function randomDelayMs(): number {
  const min = 8_000;
  const max = 42_000;
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function FunnelSocialProofToast(): React.JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (window.sessionStorage.getItem(STORAGE_DISMISS) === "1") return;
    } catch {
      /* ignore quota / privacy mode */
    }

    let cancelled = false;
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/funnel/social-proof", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as SocialProofPayload;
        if (!data?.show || cancelled) return;
        const who = (data.display_name || "Someone").trim();
        const plan = (data.plan_label || "paid").trim();
        const when = (data.relative_label || "").trim();

        let line =
          `${who} upgraded to the ${plan} plan${when ? ` · ${when}` : ""}`;
        line = line.replace(/\s+/g, " ").trim();

        setBody(line);
        setOpen(true);
      } catch {
        /* optional strip — swallow */
      }
    }, randomDelayMs());

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!open || !body) return null;

  return (
    <div
      className="qf-social-proof-root"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="qf-social-proof-card">
        <span className="qf-social-proof-dot" aria-hidden />
        <div className="qf-social-proof-text">
          <span className="qf-social-proof-kicker">Recent activity</span>
          <span className="qf-social-proof-line">{body}</span>
        </div>
        <button
          type="button"
          className="qf-social-proof-close"
          aria-label="Dismiss notification"
          onClick={() => {
            setOpen(false);
            try {
              window.sessionStorage.setItem(STORAGE_DISMISS, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
