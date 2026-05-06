import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { CENDORQ_PLAN_PRICES, getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_NO_OVERLAP_MATRIX,
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

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
  value: getPlanValueDelivery(plan.key as PlanValueKey),
}));

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const PLAN_DECISION_STANDARDS = [
  {
    title: "Start free when the cause is unclear.",
    copy: "The Free Scan gives the first signal before you spend on diagnosis, fixes, or monthly control.",
  },
  {
    title: "Buy diagnosis before implementation when the reason is not proven.",
    copy: `Use Deep Review at ${DEEP_REVIEW.price} when the business needs evidence, cause, priority, and a safer decision path.`,
  },
  {
    title: "Buy implementation only when the fix target is clear.",
    copy: `Use Build Fix at ${BUILD_FIX.price} when the weak page, message, proof point, or action path is specific enough to improve.`,
  },
  {
    title: "Use monthly control when the business needs recurring attention.",
    copy: `Use Ongoing Control at ${ONGOING_CONTROL.price} when visibility, trust, customer friction, and decisions need ongoing review.`,
  },
] as const;

const PLAN_FIT_GUIDE = [
  { label: "Not enough clarity", best: "Free Scan", next: "Use Deep Review if the first signal exposes an unresolved cause." },
  { label: "Need the real reason", best: "Deep Review", next: "Use Build Fix only after the target is clear enough to implement." },
  { label: "Know what needs improvement", best: "Build Fix", next: "Use Ongoing Control if the business needs watch after the fix." },
  { label: "Need recurring review", best: "Ongoing Control", next: "Use Build Fix separately for scoped implementation work." },
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Pricing</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Choose the depth that can move revenue next.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Start free when the cause is unknown. Pay when the next depth unlocks a real business action. Every plan has a fixed price, a clear boundary, and a different job so you do not pay twice for the same thing.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href={deepReview.checkoutPath} className="system-button-secondary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock Deep Review {deepReview.price}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLAN_CARDS.map((plan, index) => (
            <Link key={plan.key} href={plan.href} className={index === 0 ? "system-panel-authority rounded-[1.35rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.5rem]" : "system-surface rounded-[1.35rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.5rem]"}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{plan.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{plan.cadence}</p>
                </div>
                <div className="text-right text-3xl font-semibold tracking-tight text-cyan-100">{plan.price}</div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.value.primaryValue}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{plan.value.customerOutcome}</p>
              <div className="mt-4 rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Includes</div>
                <p className="mt-2 text-xs leading-5 text-slate-300">{plan.value.includes.slice(0, 3).join(" · ")}</p>
              </div>
              <div className="mt-3 rounded-[1.1rem] border border-white/10 bg-black/20 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Not this plan</div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{plan.value.doesNotInclude.slice(0, 2).join(" · ")}</p>
              </div>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 lg:grid-cols-4" aria-label="How to choose a plan">
        {PLAN_DECISION_STANDARDS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Plan fit guide">
        <p className="text-sm font-semibold text-cyan-100">Plan fit guide</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Pick the stage, not the biggest package.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_FIT_GUIDE.map((item) => (
            <article key={item.label} className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
              <div className="mt-2 text-xl font-semibold tracking-tight text-white">{item.best}</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.next}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Plan boundaries">
        <p className="text-sm font-semibold text-cyan-100">No-overlap standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Every plan has a different job.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {PLAN_VALUE_NO_OVERLAP_MATRIX.map((item) => (
            <article key={`${item.from}-${item.notTheSameAs}`} className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">{item.from} is not {item.notTheSameAs}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.boundary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Plans handoff runtime integration">
        Connected plan handoffs. Public entry plan journey. Final fixed plan prices. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Plan value delivery architecture. No overlap plan matrix. Exceptional value by plan. Includes and does not include. Free Scan identifies a first visible signal. Deep Review diagnoses the full reason. Build Fix implements a scoped improvement. Ongoing Control monitors and guides monthly decisions. Plan fit guide. Pick the stage, not the biggest package. {PLAN_DECISION_STANDARDS.map((item) => `${item.title} ${item.copy}`).join(" ")} {PLAN_FIT_GUIDE.map((item) => `${item.label} ${item.best} ${item.next}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PLAN_VALUE_NO_OVERLAP_MATRIX.map((item) => `${item.from} ${item.notTheSameAs} ${item.boundary}`).join(" ")} {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
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
