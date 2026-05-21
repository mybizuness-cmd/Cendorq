import { VerticalSamplePresenceReport } from "@/components/presence-report";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";

const sample = selectSample("dentist");

export const metadata = buildMetadata({
  title: "Sample Dentist Presence Report | Cendorq",
  description: "See the Cendorq Presence Report trust standard, Choice Gap, and repair priorities for a dental practice.",
  path: "/sample-report/dentist",
  keywords: ["Sample Dentist Presence Report", "AI Search Presence Repair", "Choice Gap", "Repair Queue", "dental practice trust signals"],
  image: { alt: "Sample Dentist Presence Report from Cendorq." },
});

export default function DentistSampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: sample.label, description: "A vertical sample showing how Cendorq adapts repair priorities for a dental practice.", path: "/sample-report/dentist" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sample Presence Report", path: "/sample-report" }, { name: sample.label, path: "/sample-report/dentist" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <VerticalSamplePresenceReport sample={sample} />
    </>
  );
}

function selectSample(key: "dentist") {
  const matched = VERTICAL_SAMPLE_PRESENCE_REPORTS.find((item) => item.key === key);
  const fallback = VERTICAL_SAMPLE_PRESENCE_REPORTS[0];
  if (!matched && !fallback) throw new Error("Missing vertical Sample Presence Report data.");
  return matched ?? fallback;
}
