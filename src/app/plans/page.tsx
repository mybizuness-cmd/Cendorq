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
  "deep-review": "Start AI Readiness Review",
  "build-fix": "Start Signal Repair",
  "ongoing-control": "Start Readiness Control",
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
  cta: CTA_LABEL_BY_PLAN[plan.key],
  stage: STAGE_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
}));

const DECISION_STANDARDS = [
  { title: "Scan", copy: "Start when the first weak signal is still unclear." },
  { title: "Review", copy: "Use evidence before spending on deeper repair work." },
  { title: "Repair", copy: "Improve the strongest proven weak point." },
  { title: "Control", copy: "Keep readiness under ongoing review." },
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

      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_0%,rgba(125,211,252,0.28),transparent_36%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Plan depth</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,6.3vw,6.45rem)] font-semibold leading-[0.9] tracking-[-0.084em] text-slate-950">
              Choose the right AI-readiness depth.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Start with a first signal. Move deeper only when the evidence supports it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
                Start Free Scan
              </Link>
              <Link href="/plans/deep-review" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
                See AI Readiness Review
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/76 p-3 shadow-[0_36px_130px_rgba(15,23,42,0.13)] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white">
              <div className="divide-y divide-slate-200">
                {PLAN_CARDS.map((plan) => (
                  <Link key={plan.key} href={plan.href} className="group grid gap-4 p-5 transition hover:bg-sky-50/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:p-6">
                    <div>
                      <h2 className="text-4xl font-semibold tracking-[-0.065em] text-slate-950">{plan.stage}</h2>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{plan.name}</p>
                    </div>
                    <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600">{plan.purpose}</p>
                    <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                      <div className="text-lg font-semibold text-slate-950">{plan.price}</div>
                      <span className="mt-1 inline-flex text-sm font-bold text-slate-500 transition group-hover:text-slate-950">{plan.cta} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="How to choose a plan">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DECISION_STANDARDS.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.06)]">
              <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
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
        Plans. Choose the right AI-readiness depth. Scan. Review. Repair. Control. Free Scan $0. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/mo. One path. Four depths. No guaranteed rankings, leads, revenue, or AI placement. Premium laptop plans hero scale. Unified Cendorq Experience System.
      </section>
    </main>
  );
}
