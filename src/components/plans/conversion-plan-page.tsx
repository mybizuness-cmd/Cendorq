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
  "Repair the weak point": "build-fix",
  "Keep readiness from drifting": "ongoing-control",
};

const PLAN_NEXT_STEP: Record<CendorqPlanKey, string> = {
  "free-scan": "Start with a first signal before choosing deeper work.",
  "deep-review": "Use this when evidence should guide the next investment.",
  "build-fix": "Use this when the weak point is clear enough to improve.",
  "ongoing-control": "Use this when the business needs ongoing attention and readiness control.",
};

const PLAN_DECISION_PRINCIPLES = [
  "Start free when the first weak signal is unclear.",
  "Use AI Readiness Review when the business needs evidence before repair.",
  "Use Signal Repair when the weak point is clear enough to improve.",
  "Use Readiness Control when the business needs ongoing attention.",
] as const;

const PLAN_TRUST_RULES = [
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No guaranteed ranking or AI placement.",
  "No paid pressure before the right depth is clear.",
] as const;

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:border-slate-700 hover:bg-slate-50 hover:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),0_10px_28px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `${data.ctaLabel} — ${plan.price}`;

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">{data.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">
            {data.title}
            <span className="block text-cyan-500">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={primaryHref} className={CTA_CLASS}>
              {primaryLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{plan.name}</p>
              <div className="mt-2 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500">{plan.cadence}</div>
            </div>
            <Link href="/plans" className="text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Review all plans →
            </Link>
          </div>
          <div className="mt-7 rounded-[1.55rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">What this helps you decide</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{PLAN_NEXT_STEP[plan.key]}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.stats.slice(0, 4).map((item) => (
              <div key={item.label} className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Customer problem this plan solves">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{data.painTitle}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{data.painCopy}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="What this plan does">
        <div className="grid gap-4 lg:grid-cols-3">
          {data.features.slice(0, 3).map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]">
              <h3 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Best when" items={data.fit.good.slice(0, 3)} />
        <FitPanel title="Not the right first step when" items={data.fit.bad.slice(0, 3)} muted />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Customer-led plan page. Speak directly to the customer. What this helps you decide. Best when. Not the right first step when. Plan price. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. Checkout start. Checkout success. Stripe session metadata. Post-payment workspace activation. Buy the right depth. {data.finalTitle} {data.finalCopy} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
      </section>
    </main>
  );
}

export function PlanOverviewPage() {
  return null;
}

function FitPanel({ title, items, muted = false }: { title: string; items: readonly string[]; muted?: boolean }) {
  return (
    <section className={muted ? "rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_14px_48px_rgba(15,23,42,0.045)]" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]"}>
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold leading-7 text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
