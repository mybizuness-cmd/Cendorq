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
  "Keep readiness from drifting": "ongoing-control",
};

const CUSTOMER_DECISION_PROMPTS: Record<CendorqPlanKey, { question: string; answer: string; warning: string }> = {
  "free-scan": {
    question: "You need the first signal before you spend deeper.",
    answer: "Start here. See what may be unclear, under-proven, or hard to choose without paying for deeper review too early.",
    warning: "Free Scan is a first read, not full diagnosis, implementation, monitoring, or a guaranteed outcome.",
  },
  "deep-review": {
    question: "You need evidence before bigger changes.",
    answer: "Use AI Readiness Review to understand the cause, priority, and safest next move.",
    warning: "Review does not include done-for-you implementation, unlimited revisions, or guaranteed AI placement.",
  },
  "build-fix": {
    question: "The weak signal is clear enough to repair.",
    answer: "Use Signal Repair when the page, message, proof, or action path is ready for scoped implementation.",
    warning: "Do not use this as a substitute for review when the cause is still unclear.",
  },
  "ongoing-control": {
    question: "Readiness needs to be watched over time.",
    answer: "Use Readiness Control to keep clarity, proof, friction, and priorities under recurring review.",
    warning: "Control is not unlimited implementation and does not guarantee rankings, leads, revenue, or AI placement.",
  },
};

const PLAN_DECISION_PRINCIPLES = [
  "Start free when the first signal is unclear.",
  "Use AI Readiness Review at $497 when the business needs evidence.",
  "Use Signal Repair at $1,497 when the repair target is clear enough to improve.",
  "Use Readiness Control at $597/month when the business needs monthly attention.",
] as const;

const PLAN_TRUST_RULES = [
  "No fake urgency.",
  "No unsupported outcome promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
] as const;

const softButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `Start ${plan.name} ${plan.price}`;
  const customerPrompt = CUSTOMER_DECISION_PROMPTS[plan.key];

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{data.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.7rem,6.4vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-slate-950">
            {data.title}
            <span className="block text-slate-500">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={primaryHref} className={`${softButton} border-slate-950 px-8 text-base`}>
              {primaryLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.1)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{plan.cadence}</div>
            </div>
            <Link href="/plans" className="text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">Compare plans -&gt;</Link>
          </div>
          <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Is this the right layer?</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{customerPrompt.question}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{customerPrompt.answer}</p>
            <p className="mt-4 rounded-[1.1rem] border border-slate-200 bg-white p-4 text-xs font-medium leading-6 text-slate-500">{customerPrompt.warning}</p>
          </div>
          {plan.stripeMode !== "none" ? (
            <div className="mt-4 rounded-[1.2rem] border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">
              After payment: {plan.afterPaymentNextStep}
            </div>
          ) : null}
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
        <FitPanel title="Best for you if" items={data.fit.good.slice(0, 3)} highlighted />
        <FitPanel title="Do not choose this if" items={data.fit.bad.slice(0, 3)} />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Customer-led plan page. Speak directly to the customer. Is this the right layer? Best for you if. Do not choose this if. Plan price. Final fixed plan prices. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/month. Checkout start. Checkout success. Stripe session metadata. Post-payment dashboard activation. Buy the right depth. {data.finalTitle} {data.finalCopy} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
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
