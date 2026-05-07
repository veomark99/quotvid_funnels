import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

/**
 * `/f/*` shell: typography tokens only. Each funnel route has its own layout + CSS file.
 */
export default function FunnelsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`min-h-full scroll-smooth ${plusJakarta.variable} ${playfair.variable} ${plusJakarta.className}`}
    >
      {children}
    </div>
  );
}
