import { ConversionPlanPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { DEEP_REVIEW_PLAN } from "../plan-data";

export const metadata = buildMetadata({
  title: "Deep Review | Cendorq",
  description:
    "Deep Review explains why AI engines and customers may not see, understand, trust, or choose the business yet.",
  path: "/plans/deep-review",
  keywords: ["cendorq Deep Review", "AI visibility review", "AI readiness review", "business clarity review", "trust and proof review"],
  image: { alt: "Cendorq Deep Review page." },
});

export default function DeepReviewPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Deep Review", description: DEEP_REVIEW_PLAN.intro, path: "/plans/deep-review" });
  const serviceJsonLd = buildServiceJsonLd({ title: "Cendorq Deep Review", description: DEEP_REVIEW_PLAN.intro, path: "/plans/deep-review", serviceType: "AI visibility and readiness review" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }, { name: "Deep Review", path: "/plans/deep-review" }]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} /><ConversionPlanPage data={DEEP_REVIEW_PLAN} /></>;
}
