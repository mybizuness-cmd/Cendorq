import { VerticalSamplePresenceReport } from "@/components/presence-report";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";

const sample = VERTICAL_SAMPLE_PRESENCE_REPORTS.find((item) => item.key === "med-spa") || VERTICAL_SAMPLE_PRESENCE_REPORTS[0];

export const metadata = buildMetadata({
  title: "Sample Med Spa Presence Report | Cendorq",
  description: "See the Cendorq Presence Report trust standard, Choice Gap, and repair priorities for a med spa.",
  path: "/sample-report/med-spa",
  keywords: ["Sample Med Spa Presence Report", "AI Search Presence Repair", "Choice Gap", "Repair Queue", "med spa trust signals"],
  image: { alt: "Sample Med Spa Presence Report from Cendorq." },
});

export default function MedSpaSampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: sample.label, description: "A vertical sample showing how Cendorq adapts repair priorities for a med spa.", path: "/sample-report/med-spa" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sample Presence Report", path: "/sample-report" }, { name: sample.label, path: "/sample-report/med-spa" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <VerticalSamplePresenceReport sample={sample} />
    </>
  );
}
