import { HomepageClarityReset } from "@/components/homepage/homepage-clarity-reset";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Source-only guardrail anchors for the simplified homepage reset.
// presence-report-ai-search-presence-repair-experience. CENDORQ_EXPERIENCE_SYSTEM.
// Can customers and AI systems understand why to choose your business?
// Cendorq turns AI visibility and readiness into a clear repair path.
// Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action.
// Repair queue. Recommended next move. Visibility shows the gap. Readiness explains the cause.
// where the business is missing. visibility and readiness. Most businesses are online. Fewer are answer-ready.
// Scan. Review. Repair. Control. Distinct Cendorq signal experience. Unified Cendorq Experience System.
// PresenceReportPreview. Start Free Scan. Run Free Scan. See Sample Report. View Plans.

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
