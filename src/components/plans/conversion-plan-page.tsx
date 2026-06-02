import Link from "next/link";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
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
  "Start with the first signal": "free-scan",
  "Find the first weak signal": "free-scan",
  "Start with the first AI Visibility and Readiness signal": "free-scan",
  "Find what is weakening readiness": "deep-review",
  "Prove what is weakening readiness": "deep-review",
  "Find what is weakening AI Visibility and Readiness": "deep-review",
  "Strengthen the signal": "build-fix",
  "Repair the weak point": "build-fix",
  "Repair the signal": "build-fix",
  "Keep readiness from drifting": "ongoing-control",
  "Keep AI Visibility and Readiness from drifting": "ongoing-control",
};

const PLAN_NEXT_STEP: Record<CendorqPlanKey, string> = {
  "free-scan": "Start here when the weak area is still unclear.",
  "deep-review": "Use this when evidence should guide the next investment.",
  "build-fix": "Use this when the weak point is clear enough to improve.",
  "ongoing-control": "Use this when the business needs ongoing attention and visibility control.",
};

const PLAN_DECISION_GUIDE = [
  ["First signal", "Use the scan when the weak area is still unclear."],
  ["Cause", "Use review when the business needs evidence before repair."],
  ["Repair", "Use build work when the weak point is ready to improve."],
  ["Control", "Use ongoing watch when drift needs attention."],
] as const;

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `${data.ctaLabel} — ${plan.price}`;
  const visibleFeatures = data.features.slice(0, 3);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <PlanAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Plan detail introduction">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{data.eyebrow}</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">
            {data.title}
            <span className="block text-cyan-500">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">{data.intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>{primaryLabel}</Link>
            {data.secondaryHref && data.secondaryLabel ? <Link href={data.secondaryHref} className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>{data.secondaryLabel}</Link> : null}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{plan.name}</p>
              <div className="mt-3 text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500">{plan.cadence}</div>
            </div>
            <Link href="/plans" className="text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Review all plans →</Link>
          </div>

          <div className="mt-6 rounded-[1.45rem] border border-cyan-100 bg-cyan-50/55 p-5">
            <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">What this helps you decide</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{PLAN_NEXT_STEP[plan.key]}</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {data.stats.slice(0, 4).map((item) => (
              <div key={item.label} className="rounded-[1.25rem] border border-cyan-100 bg-white p-4 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{item.label}</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Customer problem this plan solves">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">{data.painTitle}</h2>
          <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">{data.painCopy}</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="How this plan works">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Plan mechanics</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">What gets clearer.</h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">The job is to make the next move obvious, not to add more noise.</p>
            </div>

            <div className="grid gap-3">
              {visibleFeatures.map((item) => (
                <article key={item.title} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/42 p-5 shadow-sm">
                  <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PlanDecisionGuide />

      <section className="relative mx-auto grid max-w-[92rem] gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Best when" items={data.fit.good.slice(0, 3)} />
        <FitPanel title="Not the right first step when" items={data.fit.bad.slice(0, 3)} muted />
      </section>
    </main>
  );
}

function PlanDecisionGuide() {
  return (
    <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Plan decision guide">
      <div className="rounded-[2.15rem] border border-white/85 bg-white/84 p-5 text-slate-950 shadow-[0_20px_62px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <h2 className="text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-5xl">Choose the right depth for the job.</h2>
          <p className="text-base font-semibold leading-8 text-slate-600">Each step should make the next customer decision clearer: signal, cause, repair, or control.</p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {PLAN_DECISION_GUIDE.map(([title, copy]) => (
            <article key={title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm">
              <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
      <span className="sr-only">Decision guide. Depth meaning. Before choosing depth.</span>
    </section>
  );
}

export function PlanOverviewPage() {
  return null;
}

function FitPanel({ title, items, muted = false }: { title: string; items: readonly string[]; muted?: boolean }) {
  return (
    <section className={muted ? "rounded-[2.15rem] border border-slate-200 bg-white/70 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] backdrop-blur sm:p-6" : "rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.045)] backdrop-blur sm:p-6"}>
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.25rem] border border-cyan-100 bg-white px-4 py-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
