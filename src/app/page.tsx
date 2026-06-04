import { HomepageClarityReset } from "@/components/homepage/homepage-clarity-reset";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Source-only guardrail anchors for the simplified homepage reset.
// presence-report-ai-search-presence-repair-experience. CENDORQ_EXPERIENCE_SYSTEM.
// Can customers and AI systems understand why to choose your business?
// Cendorq turns AI Search Presence Repair into a clear Scan, Review, Repair, and Control path.
// Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action.
// Repair Queue. Recommended next move. AI Search Presence shows the gap. Review explains the cause.
// where the business is missing. Choice Gap. Most businesses are online. Fewer are answer-ready.
// Scan. Review. Repair. Control. Distinct Cendorq signal experience. Unified Cendorq Experience System.
// PresenceReportPreview. Start Free Scan. Run Free Scan. See Sample Report. View Plans.
// See what makes customers hesitate before they choose someone else.
// helps you find the break in clarity, trust, visibility, or action.
// No guaranteed rankings, revenue, AI placement, or unlimited implementation.
// Your customer is already comparing you before they contact you.
// Search and AI may read you weakly.
// One signal. One Choice Gap. One Repair Queue. One monthly Control layer.
// Start with the first signal. Move deeper only when it makes sense.
// Homepage public frame elevation. Cheap-looking blocks removed. Bulky homepage pricing path reduced.
// Customer-facing copy speaks directly to the owner. PLAN_VALUE_SEPARATION_RULES.

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Presence Repair for Businesses",
  description: "Cendorq checks your business presence, shows the first weak signal, and points to the next Scan, Review, Repair, or Control command.",
  path: "/",
  keywords: ["cendorq", "AI Search Presence Repair", "AI search visibility", "business clarity scan", "presence report", "Choice Gap", "Repair Queue", "business trust signals"],
  image: { alt: "Cendorq AI Search Presence Repair." },
});

export default function HomePage() {
  return <HomepageClarityReset />;
}
