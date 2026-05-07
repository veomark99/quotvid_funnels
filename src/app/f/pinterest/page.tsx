import type { Metadata } from "next";

import { AcquisitionFunnel } from "@/components/funnel/AcquisitionFunnel";
import { funnelPinterestContent } from "@/funnels/funnel-models";

export const metadata: Metadata = {
  title: funnelPinterestContent.metaTitle,
  description: funnelPinterestContent.metaDescription,
};

export default function PinterestFunnelPage() {
  return <AcquisitionFunnel model={funnelPinterestContent} funnelSlug="pinterest" />;
}
