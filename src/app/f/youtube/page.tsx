import type { Metadata } from "next";

import { AcquisitionFunnel } from "@/components/funnel/AcquisitionFunnel";
import { funnelYoutubeContent } from "@/funnels/funnel-models";

export const metadata: Metadata = {
  title: funnelYoutubeContent.metaTitle,
  description: funnelYoutubeContent.metaDescription,
};

export default function YoutubeFunnelPage() {
  return <AcquisitionFunnel model={funnelYoutubeContent} funnelSlug="youtube" />;
}
