import type { ReactNode } from "react";

import "./youtube-funnel.css";

/** Wrapper must match `@scope (...)` root in `youtube-funnel.css` */
export default function YoutubeFunnelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="qf-funnel-youtube">{children}</div>;
}
