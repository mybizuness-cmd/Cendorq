import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description:
    "Choose the right AI-readiness depth: Free Scan, AI Readiness Review, Signal Repair, or Readiness Control.",
  path: "/plans",
  keywords: ["cendorq plans", "AI readiness plans", "Free Scan", "AI Readiness Review", "Signal Repair", "Readiness Control"],
  image: { alt: "Cendorq AI readiness plans." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Start Review",
  "build-fix": "Start Repair",
  "ongoing-control": "Start Control",
};

const DETAIL_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Open Free Scan",
  "deep-review": "Review details",
  "build-fix": "Repair details",
  "ongoing-control": "Control details",
};

const STAGE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Find the first place the business may be unclear, under-trusted, or harder to choose.",
  "deep-review": "Understand what is weakening clarity, trust, proof, or choice before bigger work begins.",
  "build-fix": "Improve the page, message, proof, or action path that matters most.",
  "ongoing-control": "Keep readiness from drifting as search, AI answers, competitors, and customers change.",
};

const PLAN_ROUTE_BY_KEY: Record<CendorqPlanKey, string> = {
  "free-scan": "/free-check",
  "deep-review": "/plans/deep-review",
  "build-fix": "/plans/build-fix",
  "ongoing-control": "/plans/ongoing-control",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  actionHref: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
  detailCta: DETAIL_LABEL_BY_PLAN[plan.key],
  stage: STAGE_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
}));

const DECISION_RULES = [
  "Unsure? Start Free Scan.",
  "Need the cause? Start Review.",
  "Know what to improve? Start Repair.",
  "Need ongoing watch? Start Control.",
] as const;

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A clear AI-readiness path for business clarity, trust, proof, signal repair, and ongoing control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_0%,rgba(125,211,252,0.28),transparent_36%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Plan depth</p>
            <h1 className="mt-4 max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.078em] text-slate-950">
              Choose the right AI-readiness depth.
            </h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Keep the buying path simple: choose a depth here, read the plan detail only if needed, then continue to checkout.
            </p>
            <div className="mt-5 grid gap-2 text-sm font-semibold text-slate-700">
              {DECISION_RULES.map((rule) => <p key={rule} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm">{rule}</p>)}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
                Start Free Scan
              </Link>
              <Link href="/checkout/start?plan=deep-review" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
                Start Review
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/70 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.085)] backdrop-blur-2xl sm:rounded-[2.5rem]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#f7fcff_55%,#ffffff)] p-3 sm:rounded-[2rem]">
              <div className="grid gap-3 lg:grid-cols-2">
                {PLAN_CARDS.map((plan, index) => (
                  <article key={plan.key} className={index === 1 ? "rounded-[1.45rem] border border-cyan-200 bg-cyan-50/80 p-4 shadow-[0_12px_36px_rgba(14,165,233,0.08)] sm:rounded-[1.65rem]" : "rounded-[1.45rem] border border-slate-200 bg-white/88 p-4 shadow-[0_10px_32px_rgba(15,23,42,0.045)] sm:rounded-[1.65rem]"}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{plan.stage}</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-3xl">{plan.name}</h2>
                      </div>
                      <p className="shrink-0 text-sm font-black text-slate-950">{plan.price}</p>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{plan.purpose}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <Link href={plan.actionHref} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                        {plan.cta}
                      </Link>
                      <Link href={plan.href} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                        {plan.detailCta}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Plan separation standard">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">One path. Four depths.</h2>
            <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Free Scan finds the first signal. Review explains the likely cause. Repair improves the selected weak point. Control keeps the business watched. Cendorq does not guarantee rankings, leads, revenue, or AI placement.
            </p>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="AI readiness plans guardrails">
        Plans. Choose the right AI-readiness depth. Scan. Review. Repair. Control. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. One path. Four depths. Start review checkout. Start repair checkout. Start control checkout. View review details. View repair details. View control details. No guaranteed rankings, leads, revenue, or AI placement. Premium laptop plans hero scale. Unified Cendorq Experience System. Readiness path system panel. Removed long in-between explanation from purchase path. Shorter checkout path from plans to checkout confirmation.
      </section>
    </main>
  );
}
