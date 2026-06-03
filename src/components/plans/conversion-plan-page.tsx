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

const PLAN_STAGE_PROOF: Record<CendorqPlanKey, readonly [string, string][]> = {
  "free-scan": [
    ["What it reads", "A first public signal around visibility, understanding, trust, choice, and action."],
    ["What it avoids", "A heavy diagnosis before real business context exists."],
    ["Next safe move", "Open the result and decide whether deeper proof is worth it."],
  ],
  "deep-review": [
    ["What it proves", "The cause behind the weak signal before repair is purchased."],
    ["What it avoids", "Fixing the wrong layer because the surface symptom looked obvious."],
    ["Next safe move", "Choose repair only when the evidence supports it."],
  ],
  "build-fix": [
    ["What it repairs", "The scoped weak point that is clear enough to improve."],
    ["What it avoids", "Broad implementation that hides the actual choice blocker."],
    ["Next safe move", "Improve the blocker and check whether the public signal strengthens."],
  ],
  "ongoing-control": [
    ["What it watches", "Visibility, readiness, trust, and choice signals that can drift over time."],
    ["What it avoids", "Treating a one-time improvement like it will stay clean forever."],
    ["Next safe move", "Keep the signal monitored once the baseline is known."],
  ],
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
  const stageProof = PLAN_STAGE_PROOF[plan.key];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f6fbff_38%,#ffffff_100%)] text-slate-950">
      <PlanAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Plan detail introduction">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">{data.eyebrow}</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.4vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">
            {data.title}
            <span className="block text-cyan-500">{data.gradient}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">{data.intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>{primaryLabel}</Link>
            {data.secondaryHref && data.secondaryLabel ? <Link href={data.secondaryHref} className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>{data.secondaryLabel}</Link> : null}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.12),transparent_40%)]" aria-hidden="true" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-700">{plan.name}</p>
              <div className="mt-3 text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-6xl">{plan.price}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500">{plan.cadence}</div>
            </div>
            <Link href="/plans" className="text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Review all plans →</Link>
          </div>

          <div className="relative mt-6 rounded-[1.35rem] border border-slate-200 bg-white/88 p-5 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">What this helps you decide</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{PLAN_NEXT_STEP[plan.key]}</p>
          </div>

          <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
            {data.stats.slice(0, 4).map((item) => (
              <div key={item.label} className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                <div className="text-sm font-semibold text-cyan-700">{item.label}</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Plan stage proof">
        <div className="grid gap-3 md:grid-cols-3">
          {stageProof.map(([label, copy]) => (
            <article key={label} className="rounded-[1.25rem] border border-white/80 bg-white/88 p-4 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <p className="text-sm font-semibold text-cyan-700">{label}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Customer problem this plan solves">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur sm:p-7">
          <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-5xl">{data.painTitle}</h2>
          <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">{data.painCopy}</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="How this plan works">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-cyan-700">Plan mechanics</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">What gets clearer.</h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">The job is to make the next move obvious, not to add more noise.</p>
            </div>

            <div className="grid gap-3">
              {visibleFeatures.map((item) => (
                <article key={item.title} className="rounded-[1.25rem] border border-slate-200 bg-white/88 p-5 shadow-sm">
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
      <div className="rounded-[2.15rem] border border-white/85 bg-white/86 p-5 text-slate-950 shadow-[0_20px_62px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <h2 className="text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-5xl">Choose the right depth for the job.</h2>
          <p className="text-base font-semibold leading-8 text-slate-600">Each step should make the next customer decision clearer: signal, cause, repair, or control.</p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {PLAN_DECISION_GUIDE.map(([title, copy]) => (
            <article key={title} className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
              <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
      <span className="sr-only">Decision guide. Depth meaning. Before choosing depth. Plan stage proof. What it reads. What it proves. What it repairs. What it watches.</span>
    </section>
  );
}

export function PlanOverviewPage() {
  return null;
}

function FitPanel({ title, items, muted = false }: { title: string; items: readonly string[]; muted?: boolean }) {
  return (
    <section className={muted ? "rounded-[2.15rem] border border-slate-200 bg-white/70 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] backdrop-blur sm:p-6" : "rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.045)] backdrop-blur sm:p-6"}>
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.1),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(246,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/18 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
