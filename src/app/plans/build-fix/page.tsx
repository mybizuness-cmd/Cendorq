import { ConversionPlanPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { BUILD_FIX_PLAN } from "../plan-data";

export const metadata = buildMetadata({
  title: "Signal Repair | Cendorq",
  description:
    "Signal Repair strengthens the page, message, trust proof, and action path once the right weak signal is clear.",
  path: "/plans/build-fix",
  keywords: ["cendorq Signal Repair", "AI readiness repair", "trust proof repair", "conversion clarity repair"],
  image: { alt: "Cendorq Signal Repair page." },
});

export default function BuildFixPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Signal Repair", description: BUILD_FIX_PLAN.intro, path: "/plans/build-fix" });
  const serviceJsonLd = buildServiceJsonLd({ title: "Cendorq Signal Repair", description: BUILD_FIX_PLAN.intro, path: "/plans/build-fix", serviceType: "AI-readiness signal repair" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }, { name: "Signal Repair", path: "/plans/build-fix" }]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} /><ConversionPlanPage data={BUILD_FIX_PLAN} /></>;
}
