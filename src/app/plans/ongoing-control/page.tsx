import { ConversionPlanPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { ONGOING_CONTROL_PLAN } from "../plan-data";

export const metadata = buildMetadata({
  title: "Ongoing Control | Cendorq",
  description:
    "Ongoing Control keeps visibility, clarity, trusted proof, public signals, AI readiness, and customer action paths under ongoing review.",
  path: "/plans/ongoing-control",
  keywords: ["cendorq Ongoing Control", "AI visibility control", "AI readiness control", "monthly readiness monitoring", "business clarity monitoring"],
  image: { alt: "Cendorq Ongoing Control page." },
});

export default function OngoingControlPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Ongoing Control", description: ONGOING_CONTROL_PLAN.intro, path: "/plans/ongoing-control" });
  const serviceJsonLd = buildServiceJsonLd({ title: "Cendorq Ongoing Control", description: ONGOING_CONTROL_PLAN.intro, path: "/plans/ongoing-control", serviceType: "Ongoing AI visibility and readiness control" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }, { name: "Ongoing Control", path: "/plans/ongoing-control" }]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} /><ConversionPlanPage data={ONGOING_CONTROL_PLAN} /></>;
}
