import { VerticalSamplePresenceReport } from "@/components/presence-report";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";

const sample = VERTICAL_SAMPLE_PRESENCE_REPORTS.find((item) => item.key === "law-firm") || VERTICAL_SAMPLE_PRESENCE_REPORTS[0];

export const metadata = buildMetadata({
  title: "Sample Law Firm Presence Report | Cendorq",
  description: "See the Cendorq Presence Report trust standard, Choice Gap, and repair priorities for a law firm.",
  path: "/sample-report/law-firm",
  keywords: ["Sample Law Firm Presence Report", "AI Search Presence Repair", "Choice Gap", "Repair Queue", "law firm trust signals"],
  image: { alt: "Sample Law Firm Presence Report from Cendorq." },
});

export default function LawFirmSampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: sample.label, description: "A vertical sample showing how Cendorq adapts repair priorities for a law firm.", path: "/sample-report/law-firm" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sample Presence Report", path: "/sample-report" }, { name: sample.label, path: "/sample-report/law-firm" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <VerticalSamplePresenceReport sample={sample} />
    </>
  );
}
