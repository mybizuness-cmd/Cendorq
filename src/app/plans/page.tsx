import Link from "next/link";
import { PlanOverviewPage } from "@/components/plans/conversion-plan-page";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { PLANS } from "./plan-data";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description:
    "Compare Cendorq plans in plain English: Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq plans", "cendorq pricing", "free scan", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq plans in plain English." },
});

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

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
      <section className="relative z-10 mx-auto -mt-4 max-w-7xl px-4 pb-12 text-white sm:px-6 md:pb-16" aria-label="Plans handoff runtime integration">
        <div className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Connected plan handoffs</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Plan movement stays stage-aware, evidence-led, and connected to the customer platform.</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
            Plans handoff runtime connects Free Scan, dashboard, billing, report vault, and support context without fake urgency, dark patterns, guaranteed ROI, guaranteed outcomes, raw/internal data exposure, or disconnected plan decisions. Customers should start with diagnosis when readiness is unclear and return to dashboard when private customer context exists.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PLANS_HANDOFFS.map((handoff) => (
              <Link key={handoff.surfaceKey} href={handoff.connectedDestination} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{handoff.decision} · {handoff.surfaceKey}</span>
                <span className="mt-3 block font-semibold text-white">{handoff.currentState}</span>
                <span className="mt-2 block">{handoff.safeNextAction}</span>
                <span className="mt-3 block text-xs leading-5 text-slate-400">Recovery: {handoff.recoveryPath}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
