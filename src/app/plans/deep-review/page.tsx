import { ConversionPlanPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { DEEP_REVIEW_PLAN } from "../plan-data";

export const metadata = buildMetadata({
  title: "AI Readiness Review | Cendorq",
  description:
    "AI Readiness Review gives evidence on why AI engines and customers may not understand, trust, or choose the business yet.",
  path: "/plans/deep-review",
  keywords: ["cendorq AI Readiness Review", "AI readiness review", "business clarity review", "trust and proof review"],
  image: { alt: "Cendorq AI Readiness Review page." },
});

export default function DeepReviewPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq AI Readiness Review", description: DEEP_REVIEW_PLAN.intro, path: "/plans/deep-review" });
  const serviceJsonLd = buildServiceJsonLd({ title: "Cendorq AI Readiness Review", description: DEEP_REVIEW_PLAN.intro, path: "/plans/deep-review", serviceType: "AI-readiness review" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }, { name: "AI Readiness Review", path: "/plans/deep-review" }]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} /><ConversionPlanPage data={DEEP_REVIEW_PLAN} /></>;
}
