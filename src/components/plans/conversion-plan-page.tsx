import Link from "next/link";

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

const PRICE_BY_PLAN: Record<string, { price: string; note: string }> = {
  "Find the pressure": { price: "$0", note: "first read" },
  "Know what is broken": { price: "$300", note: "full diagnosis" },
  "Strengthen the parts": { price: "$750+", note: "scoped implementation" },
  "Keep the business sharp": { price: "$300/mo", note: "monthly command" },
};

const PLAN_DECISION_PRINCIPLES = [
  "Start free when the cause is unclear.",
  "Use Deep Review when the business needs the real reason.",
  "Use Build Fix when the direction is clear enough to improve.",
  "Use Ongoing Control when the base needs monthly attention.",
] as const;

const PLAN_TRUST_RULES = [
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
] as const;

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const pricing = PRICE_BY_PLAN[data.title] ?? { price: "See fit", note: "stage based" };

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">{data.eyebrow}</p>
          <h1 className="system-hero-title mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {data.title}
            <span className="system-gradient-text block">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={data.ctaHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              {data.ctaLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="system-panel-authority rounded-[1.7rem] p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-5xl font-semibold tracking-tight text-cyan-100 sm:text-6xl">{pricing.price}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{pricing.note}</div>
            </div>
            <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">Compare pricing →</Link>
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {data.painTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            {data.painCopy}
          </p>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3" aria-label="What this plan does">
        {data.features.slice(0, 3).map((item, index) => (
          <PowerCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Best for" items={data.fit.good.slice(0, 3)} highlighted />
        <FitPanel title="Not for" items={data.fit.bad.slice(0, 3)} />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Plan price. How to choose. Buy the right depth. Best next move. {data.finalTitle} {data.finalCopy} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
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
    <article className={highlighted ? "system-panel-authority rounded-[1.45rem] p-5" : "system-surface rounded-[1.45rem] p-5"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function FitPanel({ title, items, highlighted = false }: { title: string; items: readonly string[]; highlighted?: boolean }) {
  return (
    <section className={highlighted ? "system-panel-authority rounded-[1.55rem] p-5" : "system-surface rounded-[1.55rem] p-5"}>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.1rem] border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-medium leading-7 text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
