import { PlanOverviewPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { PLANS } from "./plan-data";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description:
    "Compare Cendorq plans in plain English: Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq plans", "cendorq pricing", "free scan", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq plans in plain English." },
});

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A concise plan comparison page for choosing the right next Cendorq move.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <PlanOverviewPage plans={[...PLANS]} />
    </>
  );
}
