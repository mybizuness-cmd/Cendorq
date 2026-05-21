import { VerticalSamplePresenceReport } from "@/components/presence-report";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";

const sample = selectSample("contractor");

export const metadata = buildMetadata({
  title: "Sample Contractor Presence Report | Cendorq",
  description: "See the Cendorq Presence Report trust standard, Choice Gap, and repair priorities for a local contractor.",
  path: "/sample-report/contractor",
  keywords: ["Sample Contractor Presence Report", "AI Search Presence Repair", "Choice Gap", "Repair Queue", "contractor trust signals"],
  image: { alt: "Sample Contractor Presence Report from Cendorq." },
});

export default function ContractorSampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: sample.label, description: "A vertical sample showing how Cendorq adapts repair priorities for a contractor.", path: "/sample-report/contractor" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sample Presence Report", path: "/sample-report" }, { name: sample.label, path: "/sample-report/contractor" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <VerticalSamplePresenceReport sample={sample} />
    </>
  );
}

function selectSample(key: "contractor") {
  const matched = VERTICAL_SAMPLE_PRESENCE_REPORTS.find((item) => item.key === key);
  const fallback = VERTICAL_SAMPLE_PRESENCE_REPORTS[0];
  if (!matched && !fallback) throw new Error("Missing vertical Sample Presence Report data.");
  return matched ?? fallback;
}
