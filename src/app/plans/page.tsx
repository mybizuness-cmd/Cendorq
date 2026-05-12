import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CENDORQ_PLAN_PRICES, getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

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
  "deep-review": "Start review checkout",
  "build-fix": "Start repair checkout",
  "ongoing-control": "Start control checkout",
};

const DETAIL_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Open Free Scan",
  "deep-review": "View review details",
  "build-fix": "View repair details",
  "ongoing-control": "View control details",
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

const PLAN_PATH = [
  { stage: "Scan", copy: "Start with the first visible signal before committing to deeper work." },
  { stage: "Review", copy: "Use evidence to understand what is weakening the business path." },
  { stage: "Repair", copy: "Improve the selected weak point only after the cause is clear." },
  { stage: "Control", copy: "Keep readiness from drifting as the market, AI answers, and customers change." },
] as const;

const deepReview = getCendorqPlanPrice("deep-review");

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

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-12 xl:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_0%,rgba(125,211,252,0.28),transparent_36%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-8 lg:min-h-[min(42rem,calc(100vh-4.25rem))] lg:grid-cols-[0.74fr_1.26fr] lg:items-center xl:min-h-[calc(100vh-4.25rem)]">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Plan depth</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3rem,5.35vw,5.95rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950 xl:text-[clamp(3.4rem,6vw,6.45rem)]">
              Choose the right AI-readiness depth.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Start free when the first signal is unclear. When you already know the right paid depth, go straight to checkout confirmation.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
                Start Free Scan
              </Link>
              <Link href="/checkout/start?plan=deep-review" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
                Start review checkout
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/70 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:rounded-[2.7rem]">
            <div className="rounded-[1.9rem] border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#f7fcff_55%,#ffffff)] p-3 sm:rounded-[2.2rem] sm:p-4">
              <div className="grid gap-3 lg:grid-cols-2">
                {PLAN_CARDS.map((plan, index) => (
                  <article key={plan.key} className={index === 1 ? "rounded-[1.6rem] border border-cyan-200 bg-cyan-50/80 p-5 shadow-[0_16px_48px_rgba(14,165,233,0.1)] sm:rounded-[1.8rem]" : "rounded-[1.6rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.05)] sm:rounded-[1.8rem]"}>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{plan.stage}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{plan.name}</h2>
                    <p className="mt-2 text-base font-bold text-slate-950">{plan.price} <span className="text-sm font-semibold text-slate-500">{plan.cadence}</span></p>
                    <p className="mt-4 min-h-[4.25rem] text-sm font-medium leading-7 text-slate-600">{plan.purpose}</p>
                    <div className="mt-5 grid gap-2">
                      <Link href={plan.actionHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                        {plan.cta}
                      </Link>
                      <Link href={plan.href} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
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

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="How the readiness path works">
        <div className="overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-[0_30px_110px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#020617,#172554_62%,#083344)] p-6 text-white sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.32),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(99,102,241,0.24),transparent_34%)]" aria-hidden="true" />
              <div className="relative">
                <p className="text-sm font-bold text-cyan-200">Readiness path</p>
                <h2 className="mt-4 max-w-3xl text-[clamp(2.45rem,4.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.07em]">
                  Each plan is a deeper layer of the same system.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-200">
                  The customer should not have to decode a pricing table. Start free when the first signal is unclear; use checkout when the right paid depth is already obvious.
                </p>
              </div>
            </div>

            <div className="relative bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-7 lg:p-8">
              <div className="absolute left-12 top-10 hidden h-[calc(100%-5rem)] w-px bg-gradient-to-b from-cyan-200 via-slate-300 to-indigo-200 sm:block" aria-hidden="true" />
              <div className="grid gap-3">
                {PLAN_PATH.map((item, index) => (
                  <div key={item.stage} className="relative grid gap-4 rounded-[1.8rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[4rem_1fr] sm:items-start">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-950 shadow-sm">{index + 1}</div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.stage}</h3>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Plan separation standard">
        <div className="overflow-hidden rounded-[3rem] border border-slate-800 bg-[linear-gradient(135deg,#020617,#172554_58%,#083344)] p-6 text-white shadow-[0_36px_130px_rgba(15,23,42,0.28)] sm:p-8 lg:p-10">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">One path. Four depths.</h2>
          <p className="mt-5 max-w-4xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
            Free Scan finds the first signal. AI Readiness Review explains the likely cause. Signal Repair improves the selected weak point. Readiness Control keeps the business watched as search, AI answers, and customers move.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Current pricing: AI Readiness Review {deepReview.price}, Signal Repair $1,497, Readiness Control $597/mo. Cendorq does not guarantee rankings, leads, revenue, or AI placement.
          </p>
        </div>
      </section>

      <section className="sr-only" aria-label="AI readiness plans guardrails">
        Plans. Choose the right AI-readiness depth. Scan. Review. Repair. Control. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. One path. Four depths. Start review checkout. Start repair checkout. Start control checkout. View review details. View repair details. View control details. No guaranteed rankings, leads, revenue, or AI placement. Premium laptop plans hero scale. Unified Cendorq Experience System. Readiness path system panel. No standalone generic decision card row. Shorter checkout path from plans to checkout confirmation.
      </section>
    </main>
  );
}
