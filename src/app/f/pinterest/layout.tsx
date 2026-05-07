import type { ReactNode } from "react";

import "./pinterest-funnel.css";

/** Wrapper must match `@scope (...)` root in `pinterest-funnel.css` */
export default function PinterestFunnelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="qf-funnel-pinterest">{children}</div>;
}
