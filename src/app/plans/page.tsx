import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description: "Choose the right Cendorq depth: Free Scan, Deep Review, Build Fix, or Ongoing Control for AI Visibility, readiness, repair, and control.",
  path: "/plans",
  keywords: ["cendorq plans", "AI visibility plans", "AI readiness plans", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq AI Visibility plans." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Open Deep Review",
  "build-fix": "Open Build Fix",
  "ongoing-control": "Open Ongoing Control",
};

const STAGE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "See the first place the business may be missing, unclear, under-trusted, or harder to choose.",
  "deep-review": "Understand what is weakening AI Visibility, clarity, trust, proof, or choice before bigger work begins.",
  "build-fix": "Improve the page, message, proof, or action path that matters most.",
  "ongoing-control": "Keep AI Visibility from drifting as search, AI answers, competitors, and customers change.",
};

const PLAN_ROUTE_BY_KEY: Record<CendorqPlanKey, string> = {
  "free-scan": "/free-check",
  "deep-review": "/plans/deep-review",
  "build-fix": "/plans/build-fix",
  "ongoing-control": "/plans/ongoing-control",
};

const PLAN_ACCENT_BY_KEY: Record<CendorqPlanKey, string> = {
  "free-scan": "border-cyan-200 bg-cyan-50/82 shadow-[0_12px_36px_rgba(14,165,233,0.08)]",
  "deep-review": "border-sky-200 bg-sky-50/82 shadow-[0_12px_36px_rgba(14,165,233,0.08)]",
  "build-fix": "border-indigo-200 bg-indigo-50/78 shadow-[0_12px_36px_rgba(99,102,241,0.08)]",
  "ongoing-control": "border-teal-200 bg-teal-50/78 shadow-[0_12px_36px_rgba(20,184,166,0.08)]",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({ ...plan, href: PLAN_ROUTE_BY_KEY[plan.key], cta: CTA_LABEL_BY_PLAN[plan.key], stage: STAGE_BY_PLAN[plan.key], purpose: PURPOSE_BY_PLAN[plan.key], accent: PLAN_ACCENT_BY_KEY[plan.key] }));

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Plans", description: "A clear path for AI Visibility, readiness, proof, repair, and ongoing control.", path: "/plans" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_65%_0%,rgba(125,211,252,0.3),transparent_36%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.64fr_1.36fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.078em] text-slate-950">Choose the right AI Visibility depth.</h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Start with what you need now. Free Scan shows the first signal. Deep Review explains the cause. Build Fix improves the weak point. Ongoing Control keeps AI Visibility from drifting.</p>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/68 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.085)] backdrop-blur-2xl sm:rounded-[2.5rem]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.12),transparent_35%),linear-gradient(145deg,#ffffff,#f7fcff_55%,#ffffff)] p-3 sm:rounded-[2rem]">
              <div className="grid gap-3 lg:grid-cols-2">
                {PLAN_CARDS.map((plan) => (
                  <article key={plan.key} className={`rounded-[1.45rem] p-4 sm:rounded-[1.65rem] ${plan.accent}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="text-xs font-bold text-slate-500">{plan.stage}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-3xl">{plan.name}</h2></div>
                      <p className="shrink-0 text-sm font-black text-slate-950">{plan.price}</p>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{plan.purpose}</p>
                    <Link href={plan.href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cyan-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">{plan.cta}</Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Plan separation standard">
        <div className="rounded-[2.2rem] border border-white/80 bg-white/82 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">One path. Four depths.</h2>
            <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base">Free Scan shows the first signal. Deep Review explains the cause. Build Fix improves the selected weak point. Ongoing Control keeps the business watched. Cendorq does not guarantee rankings, leads, revenue, or AI placement.</p>
          </div>
        </div>
      </section>
    </main>
  );
}