import Link from "next/link";
import { getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

export type PlanFeature = {
  title: string;
  copy: string;
};

export type PlanFit = {
  good: string[];
  bad: string[];
};

export type PlanPageData = {
  eyebrow: string;
  title: string;
  gradient: string;
  intro: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  stats: { label: string; value: string }[];
  painTitle: string;
  painCopy: string;
  features: PlanFeature[];
  fit: PlanFit;
  finalTitle: string;
  finalCopy: string;
};

const PLAN_KEY_BY_TITLE: Record<string, CendorqPlanKey> = {
  "Find the first weak signal": "free-scan",
  "Prove what is weakening readiness": "deep-review",
  "Repair the signal": "build-fix",
  "Keep readiness under command": "ongoing-control",
};

const CUSTOMER_DECISION_PROMPTS: Record<CendorqPlanKey, { question: string; answer: string; warning: string }> = {
  "free-scan": {
    question: "You need the first signal before deeper spend.",
    answer: "Start here. See what may be unclear, under-proven, or hard to choose without paying for deeper review too early.",
    warning: "Free Scan is a first read, not full review, implementation, monitoring, or a guaranteed outcome.",
  },
  "deep-review": {
    question: "You need evidence before bigger changes.",
    answer: "Use AI Readiness Review to understand the cause, priority, movement risk, and safest next move.",
    warning: "Review does not include done-for-you implementation, unlimited revisions, or guaranteed AI placement.",
  },
  "build-fix": {
    question: "The weak signal is clear enough to repair.",
    answer: "Use Signal Repair when the page, message, proof, or action path is ready for scoped implementation.",
    warning: "Do not use this as a substitute for review when the cause is still unclear.",
  },
  "ongoing-control": {
    question: "Readiness needs to stay under command.",
    answer: "Use Readiness Control to keep clarity, proof, friction, competitors, and priorities under recurring review.",
    warning: "Control is not unlimited implementation and does not guarantee rankings, leads, revenue, or AI placement.",
  },
};

const PLAN_DECISION_PRINCIPLES = [
  "Start free when the first signal is unclear.",
  "Use AI Readiness Review at $497 when the business needs evidence.",
  "Use Signal Repair at $1,497 when the repair target is clear enough to improve.",
  "Use Readiness Control at $597/month when the business needs watch, refresh, and adjustment.",
] as const;

const PLAN_TRUST_RULES = [
  "Category-defining authority, not agency clutter.",
  "No fake urgency.",
  "No unsupported outcome promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
] as const;

const PLAN_AFTER_PURCHASE_STANDARDS = [
  {
    title: "Vault first",
    copy: "Released reports, delivery summaries, and billing documents stay in the verified dashboard/report vault or billing center first.",
  },
  {
    title: "Messages mirrored",
    copy: "Important email actions mirror into the dashboard with the same safe next step and support path.",
  },
  {
    title: "PDFs gated",
    copy: "Downloadable or attached PDFs turn on only after verification, entitlement or provider authority, release, no-leak, and document-safety gates pass.",
  },
] as const;

const primaryButton = "inline-flex min-h-14 items-center justify-center rounded-[1.35rem] border border-slate-950 bg-slate-950 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const secondaryButton = "inline-flex min-h-14 items-center justify-center rounded-[1.35rem] border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `Start ${plan.name} ${plan.price}`;
  const customerPrompt = CUSTOMER_DECISION_PROMPTS[plan.key];

  return (
    <main data-cendorq-plan-detail="category-defining-plan-detail-v2" className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">{data.eyebrow}</p>
        <h1 className="mt-6 max-w-6xl text-[clamp(2.55rem,6.8vw,5.85rem)] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-slate-950">
          {data.title}
          <span className="block text-slate-500">{data.gradient}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {data.intro}
        </p>

        <div className="mt-8 w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <p className="px-5 py-4 text-left text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
              {customerPrompt.question}
            </p>
            <Link href={primaryHref} className={primaryButton}>
              {primaryLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className={secondaryButton}>
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="Plan command summary">
        <div className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.065)] sm:p-8 lg:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Is this the right layer?</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{customerPrompt.question}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{customerPrompt.answer}</p>
            <p className="mt-5 rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-700">{customerPrompt.warning}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={primaryHref} className={primaryButton}>
                {primaryLabel}
              </Link>
              <Link href="/plans" className={secondaryButton}>
                Compare Plans
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_18px_70px_rgba(15,23,42,0.065)]">
            <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{plan.cadence}</div>
            </div>
            <div className="grid gap-0 sm:grid-cols-2">
              {data.stats.slice(0, 4).map((stat) => (
                <article key={stat.label} className="border-b border-slate-200 p-6 last:border-b-0 sm:border-r sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-950">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="After purchase standard">
        <div className="grid gap-4 lg:grid-cols-3">
          {PLAN_AFTER_PURCHASE_STANDARDS.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_50px_rgba(15,23,42,0.045)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">After purchase</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Customer problem this plan solves">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Why this exists</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{data.painTitle}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{data.painCopy}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-10 sm:px-8 lg:grid-cols-3" aria-label="What this plan does">
        {data.features.slice(0, 3).map((item, index) => (
          <PowerCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Choose this when" items={data.fit.good.slice(0, 3)} highlighted />
        <FitPanel title="Do not choose this when" items={data.fit.bad.slice(0, 3)} />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Customer-led plan page. Homepage-aligned plan detail. Category-defining authority. Command-level plan page. Speak directly to the customer. Is this the right layer? Choose this when. Do not choose this when. Plan price. Final fixed plan prices. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/month. Checkout start. Checkout success. Stripe session metadata. Post-payment dashboard activation. Vault first. Messages mirrored. PDFs gated. Verified dashboard/report vault or billing center first. Same safe next step and support path. Verification, entitlement or provider authority, release, no-leak, and document-safety gates pass. Buy the right depth. {data.finalTitle} {data.finalCopy} {PLAN_AFTER_PURCHASE_STANDARDS.map((item) => `${item.title} ${item.copy}`).join(" ")} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
      </section>
    </main>
  );
}

export function PlanOverviewPage() {
  return null;
}

function PowerCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.075)]" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_50px_rgba(15,23,42,0.045)]"}>
      <h3 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p>
    </article>
  );
}

function FitPanel({ title, items, highlighted = false }: { title: string; items: readonly string[]; highlighted?: boolean }) {
  return (
    <section className={highlighted ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.075)]" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_50px_rgba(15,23,42,0.045)]"}>
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-medium leading-7 text-slate-600">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
