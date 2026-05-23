import { HomepageClarityReset } from "@/components/homepage/homepage-clarity-reset";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Presence Repair for Businesses",
  description: "Cendorq checks your business presence, shows the first weak signal, and points to the next repair path.",
  path: "/",
  keywords: ["cendorq", "AI Search Presence Repair", "AI visibility", "AI search visibility", "business clarity scan", "presence report", "business trust signals"],
  image: { alt: "Cendorq AI Search Presence Repair." },
});

export default function HomePage() {
  return <HomepageClarityReset />;
}
