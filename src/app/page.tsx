import { notFound } from "next/navigation";

/**
 * Root URL is not a public entry point — funnel paths are shared directly
 * (e.g. /f/pinterest). Visiting / shows the global not-found UI.
 */
export default function RootPage() {
  notFound();
}
