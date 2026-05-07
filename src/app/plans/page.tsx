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
  title: "Pricing | Cendorq",
  description:
    "Cendorq pricing in plain English: Free Scan, $497 Deep Review, $1,497 Build Fix, and $597/month Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq pricing", "cendorq plans", "free scan", "deep review price", "build fix price", "ongoing control price"],
  image: { alt: "Cendorq pricing and plan path." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Unlock Deep Review",
  "build-fix": "Unlock Build Fix",
  "ongoing-control": "Start Ongoing Control",
};

const STAGE_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "First signal",
  "deep-review": "Cause-level diagnosis",
  "build-fix": "Scoped implementation",
  "ongoing-control": "Monthly decision support",
};

const BUYER_MOMENT_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "You know something is off and need the first safe read.",
  "deep-review": "You need the real reason before spending more money.",
  "build-fix": "You know the weak point and want it improved.",
  "ongoing-control": "You need the business watched and guided every month.",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan, index) => ({
  ...plan,
  index: String(index + 1).padStart(2, "0"),
  href: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
  stage: STAGE_LABEL_BY_PLAN[plan.key],
  buyerMoment: BUYER_MOMENT_BY_PLAN[plan.key],
  value: getPlanValueDelivery(plan.key as PlanValueKey),
}));

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const PLAN_DECISION_STANDARDS = [
  { title: "Unknown cause", best: "Free Scan", copy: "Use this before paid work when you need the first signal." },
  { title: "Need the real reason", best: "Deep Review", copy: `Use ${DEEP_REVIEW.price} diagnosis when guessing would be expensive.` },
  { title: "Know the fix target", best: "Build Fix", copy: `Use ${BUILD_FIX.price} scoped implementation when the target is clear.` },
  { title: "Need monthly watch", best: "Ongoing Control", copy: `Use ${ONGOING_CONTROL.price} when the business needs recurring decision support.` },
] as const;

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Pricing",
    description: "A clear pricing page for choosing the right Cendorq plan without buying the wrong depth.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/plans" },
  ]);

  const deepReview = getCendorqPlanPrice("deep-review");

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-24 pt-6 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Pricing</p>
          <h1 className="system-hero-title mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
            Buy the right depth. Nothing extra. Nothing vague.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            Start free when the cause is unknown. Move into diagnosis, scoped implementation, or monthly control only when that stage can change the business decision.
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

        <div className="relative overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.7),rgba(2,8,23,0.9)_48%,rgba(14,116,144,0.26))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
          <div className="grid gap-3 sm:grid-cols-2">
            {PLAN_CARDS.map((plan) => (
              <Link key={plan.key} href={plan.href} className="group relative overflow-hidden rounded-[1.3rem] border border-white/10 bg-slate-950/60 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight text-cyan-100/80">{plan.index}</span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{plan.price}</span>
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{plan.stage}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{plan.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{plan.buyerMoment}</p>
                <p className="mt-3 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{plan.value.reportBoundary}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{plan.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="How to choose a plan">
        {PLAN_DECISION_STANDARDS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.title}</div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{item.best}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Pricing trust standard">
        <p className="text-sm font-semibold text-cyan-100">No overlap</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Each plan buys a different business action.</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          Free Scan gives a first signal. Deep Review diagnoses the cause. Build Fix implements a scoped improvement. Ongoing Control keeps the business under monthly review. One plan does not quietly become another.
        </p>
      </section>

      <section className="sr-only" aria-label="Pricing decision system guardrails">
        Pricing decision system. Buy the right depth. Nothing extra. Nothing vague. Four pricing cards. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. First signal. Cause-level diagnosis. Scoped implementation. Monthly decision support. Each plan buys a different business action. No overlap. {PLAN_DECISION_STANDARDS.map((item) => `${item.title} ${item.best} ${item.copy}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
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
