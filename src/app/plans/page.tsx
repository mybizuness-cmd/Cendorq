import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { CENDORQ_PLAN_PRICES, getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description:
    "Choose the Cendorq depth for AI search visibility, business trust, customer choice, and monthly control.",
  path: "/plans",
  keywords: ["cendorq plans", "ai search visibility plans", "business visibility scan", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq visibility command path." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Unlock Deep Review",
  "build-fix": "Unlock Build Fix",
  "ongoing-control": "Start Ongoing Control",
};

const COMMAND_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Diagnose",
  "build-fix": "Fix",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Find the first break in visibility, clarity, trust, or action.",
  "deep-review": "Expose why the business is not being found, trusted, or chosen.",
  "build-fix": "Improve the page, proof, message, or action path that matters most.",
  "ongoing-control": "Keep visibility and trust under review as AI search and competitors change.",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
  command: COMMAND_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
  value: getPlanValueDelivery(plan.key as PlanValueKey),
}));

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const DECISION_STANDARDS = [
  { title: "Need the first signal", best: "Scan", copy: "Use Free Scan before spending deeper money." },
  { title: "Need the real cause", best: "Diagnose", copy: `Use ${DEEP_REVIEW.price} Deep Review when guessing would be expensive.` },
  { title: "Need the weak point improved", best: "Fix", copy: `Use ${BUILD_FIX.price} Build Fix when the target is clear.` },
  { title: "Need monthly control", best: "Control", copy: `Use ${ONGOING_CONTROL.price} when visibility needs ongoing attention.` },
] as const;

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A clear command path for business visibility, trust, customer choice, and control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]);

  const deepReview = getCendorqPlanPrice("deep-review");

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-24 pt-6 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 grid gap-5 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Visibility command path</p>
          <h1 className="system-hero-title mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
            Choose the depth that matches the business risk.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            Scan first. Diagnose when the cause matters. Fix only when the target is clear. Keep control when visibility, trust, and customer choice need monthly attention.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:mt-7">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
            <Link href={deepReview.checkoutPath} className="system-button-secondary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock Deep Review {deepReview.price}
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.7),rgba(2,8,23,0.9)_48%,rgba(14,116,144,0.26))] p-4 shadow-[0_30px_110px_rgba(2,8,23,0.44)] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
          <div className="divide-y divide-white/10 rounded-[1.2rem] border border-white/10 bg-slate-950/46">
            {PLAN_CARDS.map((plan) => (
              <Link key={plan.key} href={plan.href} className="group grid gap-3 px-4 py-4 transition hover:bg-cyan-300/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:px-5">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{plan.command}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{plan.name}</p>
                </div>
                <p className="text-sm leading-6 text-slate-300">{plan.purpose}</p>
                <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                  <div className="text-sm font-semibold text-cyan-100">{plan.price}</div>
                  <span className="mt-1 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{plan.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="How to choose a plan">
        {DECISION_STANDARDS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.title}</div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{item.best}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Plan separation standard">
        <p className="text-sm font-semibold text-cyan-100">No overlap</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Each plan buys a different level of control.</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          Free Scan finds the first signal. Deep Review explains the cause. Build Fix improves the selected weak point. Ongoing Control keeps the business watched as search, AI answers, and competitors move.
        </p>
      </section>

      <section className="sr-only" aria-label="Visibility command path guardrails">
        Visibility command path. Choose the depth that matches the business risk. Scan. Diagnose. Fix. Control. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Each plan buys a different level of control. No overlap. {DECISION_STANDARDS.map((item) => `${item.title} ${item.best} ${item.copy}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-16 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}
