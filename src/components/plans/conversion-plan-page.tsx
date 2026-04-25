import Link from "next/link";
import type { ReactNode } from "react";

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

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <TopChip>{data.eyebrow}</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.75rem]">
            {data.title}
            <span className="system-gradient-text block">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {data.intro}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={data.ctaHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              {data.ctaLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-5 shadow-[0_30px_100px_rgba(8,47,73,0.24)] sm:p-7 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.1),transparent_30%)]" />
          <div className="system-grid-wide absolute inset-0 opacity-[0.06]" />
          <div className="relative z-10">
            <TopChip>Why this matters</TopChip>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {data.painTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              {data.painCopy}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.stats.map((item) => (
                <MetricTile key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <TopChip>What you get</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Fewer blocks. More force in each one.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            This page keeps the decision simple: understand the job, see the value, and choose the next move with confidence.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.features.map((item, index) => (
            <PowerCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-2">
        <FitPanel title="Best for" items={data.fit.good} highlighted />
        <FitPanel title="Not for" items={data.fit.bad} />
      </section>

      <section className="relative z-10 mt-12">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best next move</TopChip>
          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {data.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
            {data.finalCopy}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={data.ctaHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              {data.ctaLabel}
            </Link>
            {data.secondaryHref && data.secondaryLabel ? (
              <Link href={data.secondaryHref} className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
                {data.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

export function PlanOverviewPage({ plans }: { plans: Array<PlanPageData & { href: string; label: string }> }) {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div>
          <TopChip>Plans in plain English</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.75rem]">
            Choose the next move without buying the wrong depth.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq keeps the buying path simple: start free when the problem is unclear, go deeper when you need explanation, build when the direction is clear, and use ongoing control when the base is ready to keep improving.
          </p>
          <div className="mt-8">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free scan
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Link key={plan.href} href={plan.href} className={index === 0 ? "system-panel-authority rounded-[1.7rem] p-5 transition hover:scale-[1.01]" : "system-surface rounded-[1.7rem] p-5 transition hover:scale-[1.01]"}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{plan.eyebrow}</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{plan.label}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{plan.intro}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">View plan →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-16 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.2rem] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function PowerCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function FitPanel({ title, items, highlighted = false }: { title: string; items: string[]; highlighted?: boolean }) {
  return (
    <section className={highlighted ? "system-panel-authority rounded-[2rem] p-6 sm:p-8" : "system-surface rounded-[2rem] p-6 sm:p-8"}>
      <TopChip>{title}</TopChip>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-medium leading-7 text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
