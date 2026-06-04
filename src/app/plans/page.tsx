import Link from "next/link";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description: "Choose the right Cendorq depth: Free Scan, Deep Review, Build Fix, or Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq plans", "AI Search Presence Repair", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq plans." },
});

const PLAN_ROUTE_BY_KEY: Record<CendorqPlanKey, string> = {
  "free-scan": "/free-check",
  "deep-review": "/plans/deep-review",
  "build-fix": "/plans/build-fix",
  "ongoing-control": "/plans/ongoing-control",
};

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Scan",
  "deep-review": "Open Review",
  "build-fix": "Open Repair",
  "ongoing-control": "Open Control",
};

const STAGE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Find the first weak signal.",
  "deep-review": "Prove the cause before bigger work.",
  "build-fix": "Repair the clearest blocker.",
  "ongoing-control": "Keep the signal from drifting.",
};

const WHEN_TO_USE: Record<CendorqPlanKey, string> = {
  "free-scan": "Start here when the problem is still unclear.",
  "deep-review": "Use this when you need proof before a fix.",
  "build-fix": "Use this when the weak point is already clear.",
  "ongoing-control": "Use this when the business needs monthly monitoring.",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  cta: CTA_LABEL_BY_PLAN[plan.key],
  stage: STAGE_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
  when: WHEN_TO_USE[plan.key],
}));

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A concise path for choosing Free Scan, Deep Review, Build Fix, or Ongoing Control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <PlansAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Cendorq plans">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Plans</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.8vw,7rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Buy the right layer, not the biggest one.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Start with Scan when the weak point is unclear. Move into Review, Repair, or Control only when the signal supports it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Scan</Link>
            <Link href="/faq" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Read FAQ</Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {PLAN_CARDS.map((plan) => (
            <article key={plan.key} className="rounded-[1.35rem] border border-white/80 bg-white/88 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">{plan.stage}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{plan.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-950">{plan.price}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{plan.cadence}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-black leading-6 text-slate-800">{plan.purpose}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{plan.when}</p>
              <Link href={plan.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cyan-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Plans validation anchors">
        Plans page is one clear page. Scan, Review, Repair, Control. Free Scan. Deep Review. Build Fix. Ongoing Control. No crowded report preview. No sample report body section. No plan clutter. No rankings, leads, revenue, ROI, or AI placement guarantee.
      </section>
    </main>
  );
}

function PlansAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.1),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(246,252,255,0.62)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
