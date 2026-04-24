import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Search Presence Scan",
  description:
    "Start with Cendorq's Search Presence Scan to capture a serious first signal around trust, clarity, positioning, and action before the business buys the wrong next step.",
  path: "/free-check",
  keywords: [
    "search presence scan",
    "business first signal",
    "trust clarity positioning scan",
    "search presence diagnosis",
    "business signal analysis",
    "first-step business diagnosis"
  ],
  imageTitle: "Search Presence Scan",
  imageSubtitle: "Capture the first serious business signal.",
});

export default function FreeCheckLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
