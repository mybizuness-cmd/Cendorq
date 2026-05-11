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

export function ConversionPlanPage({ data }: { data: PlanPageData }) {
  const plan = getCendorqPlanPrice(PLAN_KEY_BY_TITLE[data.title] || "free-scan");
  const primaryHref = plan.stripeMode === "none" ? data.ctaHref : plan.checkoutPath;
  const primaryLabel = plan.stripeMode === "none" ? data.ctaLabel : `${data.ctaLabel} — ${plan.price}`;

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-12 xl:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-8 lg:min-h-[min(42rem,calc(100vh-4.25rem))] lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:min-h-[calc(100vh-4.25rem)]">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>{data.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3rem,5.05vw,5.85rem)] font-semibold leading-[0.92] tracking-[-0.078em] text-slate-950 xl:text-[clamp(3.35rem,5.7vw,6.35rem)]">
              {data.title}
              <span className="block text-cyan-500">{data.gradient}</span>
            </h1>
            <p className={`mt-5 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>
              {data.intro}
            </p>
            <div className={`mt-7 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href={primaryHref} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                {primaryLabel}
              </Link>
              {data.secondaryHref && data.secondaryLabel ? (
                <Link href={data.secondaryHref} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                  {data.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2.3rem] border border-white/80 bg-white/72 p-3 shadow-[0_28px_100px_rgba(15,23,42,0.11)] backdrop-blur-2xl">
            <div className="rounded-[1.85rem] border border-slate-200 bg-white p-5 sm:rounded-[2.2rem] sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{plan.name}</p>
                  <div className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{plan.price}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-500">{plan.cadence}</div>
                </div>
                <Link href="/plans" className="text-sm font-bold text-slate-500 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                  Review all plans →
                </Link>
              </div>
              <div className="mt-6 rounded-[1.45rem] border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">What this helps you decide</h2>
                <p className={`mt-3 ${CENDORQ_EXPERIENCE_SYSTEM.supportText}`}>{PLAN_NEXT_STEP[plan.key]}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.stats.slice(0, 4).map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Customer problem this plan solves">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className="max-w-4xl text-[clamp(2.45rem,4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">{data.painTitle}</h2>
          <p className={`mt-5 max-w-4xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>{data.painCopy}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="What this plan does">
        <div className="grid gap-4 lg:grid-cols-3">
          {data.features.slice(0, 3).map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
              <h3 className={CENDORQ_EXPERIENCE_SYSTEM.cardHeadline}>{item.title}</h3>
              <p className={`mt-4 ${CENDORQ_EXPERIENCE_SYSTEM.supportText}`}>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 lg:grid-cols-2" aria-label="Plan fit">
        <FitPanel title="Best when" items={data.fit.good.slice(0, 3)} />
        <FitPanel title="Not the right first step when" items={data.fit.bad.slice(0, 3)} muted />
      </section>

      <section className="sr-only" aria-label="Plan guardrails">
        Customer-led plan page. Speak directly to the customer. What this helps you decide. Best when. Not the right first step when. Plan price. Premium plan detail hero scale. Responsive mobile-first plan detail page. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. Checkout start. Checkout success. Stripe session metadata. Post-payment workspace activation. Buy the right depth. {data.finalTitle} {data.finalCopy} {PLAN_DECISION_PRINCIPLES.join(" ")} {PLAN_TRUST_RULES.join(" ")}
      </section>
    </main>
  );
}

export function PlanOverviewPage() {
  return null;
}

function FitPanel({ title, items, muted = false }: { title: string; items: readonly string[]; muted?: boolean }) {
  return (
    <section className={muted ? "rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_14px_48px_rgba(15,23,42,0.045)]" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]"}>
      <h2 className={CENDORQ_EXPERIENCE_SYSTEM.cardHeadline}>{title}</h2>
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
