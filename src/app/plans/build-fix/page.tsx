import { ConversionPlanPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { BUILD_FIX_PLAN } from "../plan-data";

export const metadata = buildMetadata({
  title: "Build Fix | Cendorq",
  description:
    "Build Fix improves the page, message, trust proof, or action path once the right weak signal is clear.",
  path: "/plans/build-fix",
  keywords: ["cendorq Build Fix", "AI visibility repair", "AI readiness repair", "trust proof repair", "conversion clarity repair"],
  image: { alt: "Cendorq Build Fix page." },
});

export default function BuildFixPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Build Fix", description: BUILD_FIX_PLAN.intro, path: "/plans/build-fix" });
  const serviceJsonLd = buildServiceJsonLd({ title: "Cendorq Build Fix", description: BUILD_FIX_PLAN.intro, path: "/plans/build-fix", serviceType: "AI visibility and readiness build fix" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }, { name: "Build Fix", path: "/plans/build-fix" }]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} /><ConversionPlanPage data={BUILD_FIX_PLAN} /></>;
}
