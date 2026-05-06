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
  "Find the pressure": "free-scan",
  "Know what is broken": "deep-review",
  "Strengthen the parts": "build-fix",
  "Keep the business sharp": "ongoing-control",
};

const CUSTOMER_DECISION_PROMPTS: Record<CendorqPlanKey, { question: string; answer: string; warning: string }> = {
  "free-scan": {
    question: "You know something is off, but not what to fix first.",
    answer: "Start here. Get the first signal without paying for deeper work too early.",
    warning: "Do not treat this as full diagnosis, implementation, or monthly monitoring.",
  },
  "deep-review": {
    question: "You need the real reason before spending bigger money.",
    answer: "Use Deep Review to understand the cause, priority, and safest next move.",
    warning: "Do not buy this expecting done-for-you implementation or unlimited revisions.",
  },
  "build-fix": {
    question: "You know the weak point and need it improved.",
    answer: "Use Build Fix when the page, message, proof, or action path is ready for scoped work.",
    warning: "Do not use this as a substitute for diagnosis when the cause is still unclear.",
  },
  "ongoing-control": {
    question: "You need the business watched and guided monthly.",
    answer: "Use Ongoing Control to keep visibility, trust, friction, and priorities under review.",
    warning: "Do not treat this as unlimited Build Fix or guaranteed search/AI placement.",
  },
};

const PLAN_DECISION_PRINCIPLES = [
  "Start free when the cause is unclear.",
  "Use Deep Review at $497 when the business needs the real reason.",
  "Use Build Fix at $1,497 when the direction is clear enough to improve.",
  "Use Ongoing Control at $597/month when the business needs monthly attention.",
] as const;

const PLAN_TRUST_RULES = [
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
] as const;

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `Unlock ${plan.name} ${plan.price}`;
  const customerPrompt = CUSTOMER_DECISION_PROMPTS[plan.key];

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-28 pt-6 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />

      <section className="relative z-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">{data.eyebrow}</p>
          <h1 className="system-hero-title mt-3 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
            {data.title}
            <span className="system-gradient-text block">{data.gradient}</span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            {data.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:mt-8">
            <Link href={primaryHref} className="system-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              {primaryLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="system-button-secondary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="system-panel-authority rounded-[1.45rem] p-4 sm:rounded-[1.7rem] sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-5xl font-semibold tracking-tight text-cyan-100 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{plan.cadence}</div>
            </div>
            <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare pricing →</Link>
          </div>
          <div className="mt-5 rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="text-sm font-semibold text-cyan-100">Is this the right plan?</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{customerPrompt.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">{customerPrompt.answer}</p>
            <p className="mt-3 rounded-[1rem] border border-white/10 bg-slate-950/45 p-3 text-xs leading-5 text-slate-400">{customerPrompt.warning}</p>
          </div>
          {plan.stripeMode !== "none" ? (
            <div className="mt-4 rounded-[1.1rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200">
              After payment: {plan.afterPaymentNextStep}
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Customer problem this plan solves">
        <p className="text-sm font-semibold text-cyan-100">Why this exists</p>
        <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">{data.painTitle}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{data.painCopy}</p>
      </section>

      <section className="relative z-10 mt-8 grid gap-3 lg:grid-cols-3" aria-label="What this plan does">
        {data.features.slice(0, 3).map((item, index) => (
          <PowerCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-3 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Best for you if" items={data.fit.good.slice(0, 3)} highlighted />
        <FitPanel title="Do not choose this if" items={data.fit.bad.slice(0, 3)} />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Customer-led plan page. Speak directly to the customer. Is this the right plan? Best for you if. Do not choose this if. Plan price. Final fixed plan prices. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Checkout start. Checkout success. Stripe session metadata. Post-payment dashboard activation. Buy the right depth. {data.finalTitle} {data.finalCopy} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
      </section>
    </main>
  );
}

export function PlanOverviewPage() {
  return null;
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

function PowerCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.3rem] p-4 sm:rounded-[1.45rem] sm:p-5" : "system-surface rounded-[1.3rem] p-4 sm:rounded-[1.45rem] sm:p-5"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function FitPanel({ title, items, highlighted = false }: { title: string; items: readonly string[]; highlighted?: boolean }) {
  return (
    <section className={highlighted ? "system-panel-authority rounded-[1.35rem] p-4 sm:rounded-[1.55rem] sm:p-5" : "system-surface rounded-[1.35rem] p-4 sm:rounded-[1.55rem] sm:p-5"}>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.1rem] border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-medium leading-7 text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
