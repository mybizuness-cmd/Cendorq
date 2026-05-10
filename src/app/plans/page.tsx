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
  title: "AI readiness plans | Cendorq",
  description:
    "Choose the Cendorq AI-readiness depth: Free Scan, AI Readiness Review, Signal Repair, or Readiness Control.",
  path: "/plans",
  keywords: ["cendorq plans", "AI readiness plans", "free scan", "AI readiness review", "signal repair", "readiness control"],
  image: { alt: "Cendorq AI readiness plan path." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Start Review",
  "build-fix": "Start Repair",
  "ongoing-control": "Start Control",
};

const COMMAND_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Expose the first visible gap in clarity, proof, trust, action, or AI-readiness before deeper spend.",
  "deep-review": "Prove what is weakening the business across AI/search understanding, customer trust, comparison, and choice.",
  "build-fix": "Repair the strongest proven weakness in message, page, proof, structure, or action path.",
  "ongoing-control": "Keep the business under readiness command as AI surfaces, competitors, proof, and customer expectations move.",
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
  { title: "First signal", best: "Scan", copy: "Use Free Scan when the first visible weakness is still unclear." },
  { title: "Proof", best: "Review", copy: `Use ${DEEP_REVIEW.name} when the next move needs evidence before spend.` },
  { title: "Execution", best: "Repair", copy: `Use ${BUILD_FIX.name} when the weakness is clear enough to improve.` },
  { title: "Command", best: "Control", copy: `Use ${ONGOING_CONTROL.name} when the base needs watch, refresh, and adjustment.` },
] as const;

const AUTHORITY_RULES = [
  "Each plan buys a different depth.",
  "No stage pretends to be another stage.",
  "No guaranteed rankings, leads, revenue, or AI placement.",
  "Every stronger recommendation must be tied to evidence.",
] as const;

const AFTER_PURCHASE_STANDARDS = [
  { title: "Vault first", copy: "Released reports and billing documents live in the verified dashboard, not only in email." },
  { title: "Messages mirrored", copy: "Important emails are reflected as dashboard messages so the customer can recover the same next action." },
  { title: "PDFs gated", copy: "Downloadable or attached PDFs are enabled only when verification, entitlement, release, and document-safety checks pass." },
] as const;

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const primaryButton = "inline-flex min-h-14 items-center justify-center rounded-[1.35rem] border border-slate-950 bg-slate-950 px-9 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const secondaryButton = "inline-flex min-h-14 items-center justify-center rounded-[1.35rem] border border-slate-200 bg-white px-9 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq AI Readiness Plans",
    description: "A clear path for AI-readiness: scan, review, repair, and control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]);

  return (
    <main data-cendorq-plans="category-defining-plans-v2" className="relative isolate overflow-hidden bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">AI Readiness Plans</p>
        <h1 className="mt-6 max-w-6xl text-[clamp(2.55rem,6.8vw,5.85rem)] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-slate-950">
          Choose the level of command your business is ready for.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Cendorq does not sell random packages. It separates the work into four operating depths: find the signal, prove the cause, repair the weakness, then keep readiness under control.
        </p>

        <div className="mt-8 w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <p className="px-5 py-4 text-left text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
              Start with the safest evidence path. Move deeper only when the stage fits.
            </p>
            <Link href="/free-check" className={primaryButton}>
              Start Free Scan
            </Link>
            <Link href="/plans/deep-review" className={secondaryButton}>
              See Review
            </Link>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-600">
          {AUTHORITY_RULES.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.045)]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="Cendorq plan command path">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_28px_100px_rgba(15,23,42,0.1)]">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">The command path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Scan. Review. Repair. Control.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                The page should feel simple because the decision is disciplined. Each plan has a different job, price, and proof standard.
              </p>
            </div>
            <div className="divide-y divide-slate-200">
              {PLAN_CARDS.map((plan, index) => (
                <Link key={plan.key} href={plan.href} className={index === 1 ? "group grid gap-4 bg-slate-50 p-5 transition hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:p-7" : "group grid gap-4 p-5 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:p-7"}>
                  <div>
                    <h3 className="text-4xl font-semibold tracking-[-0.065em] text-slate-950">{plan.command}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{plan.name}</p>
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-slate-600">{plan.purpose}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-base font-semibold text-slate-950">{plan.price}</div>
                    <span className="mt-1 inline-flex text-sm font-semibold text-slate-500 transition group-hover:text-slate-950">{plan.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="How to choose a plan">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DECISION_STANDARDS.map((item, index) => (
            <article key={item.title} className={index === 1 ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:-mt-5 lg:mb-5" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]"}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.title}</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">{item.best}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="After purchase access standard">
        <div className="grid gap-4 lg:grid-cols-3">
          {AFTER_PURCHASE_STANDARDS.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">After purchase</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Plan separation standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">No overlap</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">The right plan is the one the evidence can support.</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
            Free Scan finds the first signal. AI Readiness Review proves the cause. Signal Repair improves the selected weak point. Readiness Control keeps the business watched as search, AI answers, customers, and competitors move.
          </p>
        </div>
      </section>

      <section className="sr-only" aria-label="AI readiness plan path guardrails">
        AI readiness plans. Scan. Review. Repair. Control. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. Internal keys preserved: deep-review, build-fix, ongoing-control. Each plan buys a different level of readiness. No overlap. No guaranteed rankings, AI placement, leads, or revenue. Category-defining authority. Number-one operating posture. Choose the depth that matches the evidence. After purchase access: vault first, dashboard message mirror, safe PDF delivery gates, verified access, entitlement, release, and document-safety checks. {AUTHORITY_RULES.join(" ")} {AFTER_PURCHASE_STANDARDS.map((item) => `${item.title} ${item.copy}`).join(" ")} {DECISION_STANDARDS.map((item) => `${item.title} ${item.best} ${item.copy}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
