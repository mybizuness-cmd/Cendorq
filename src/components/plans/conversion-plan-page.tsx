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
  "Start with the first AI Search Presence signal": "free-scan",
  "Prove what is weakening AI Search Presence": "deep-review",
  "Repair the signal": "build-fix",
  "Keep AI Search Presence from drifting": "ongoing-control",
};

const PLAN_STAGE_COPY: Record<CendorqPlanKey, string> = {
  "free-scan": "Use Scan when the first weak signal is still unclear.",
  "deep-review": "Use Review when the business needs cause proof before buying a fix.",
  "build-fix": "Use Repair when the weak point is clear enough to improve.",
  "ongoing-control": "Use Control when the signal needs recurring attention over time.",
};

const CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `${data.ctaLabel} — ${plan.price}`;
  const visibleFeatures = data.features.slice(0, 3);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <PlanAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-14" aria-label="Plan detail">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">{data.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            {data.title}
            <span className="block text-cyan-500">{data.gradient}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">{data.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className={CTA_CLASS}>{primaryLabel}</Link>
            {data.secondaryHref && data.secondaryLabel ? <Link href={data.secondaryHref} className={SECONDARY_CTA_CLASS}>{data.secondaryLabel}</Link> : null}
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">{PLAN_STAGE_COPY[plan.key]}</p>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Plan summary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-700">{plan.name}</p>
                <div className="mt-3 text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-6xl">{plan.price}</div>
                <div className="mt-2 text-sm font-semibold text-slate-500">{plan.cadence}</div>
              </div>
              <Link href="/plans" className="text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">All plans →</Link>
            </div>

            <div className="mt-7 grid gap-3">
              {visibleFeatures.map((item) => (
                <article key={item.title} className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>

            <p className="mt-5 rounded-[1.15rem] border border-cyan-100 bg-cyan-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
              {data.finalCopy}
            </p>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Plan page validation anchors">
        Plan detail page. One clear page. No crowded stage proof. No decision guide wall. No fit panel grid. Scan Review Repair Control. Start Scan. View Plans. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

export function PlanOverviewPage() {
  return null;
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(246,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
