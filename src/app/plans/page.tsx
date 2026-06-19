import Link from "next/link";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description: "Choose the right Cendorq depth: Scan, Review, Repair, or Control.",
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
  "free-scan": "Start Free Scan",
  "deep-review": "Open Review",
  "build-fix": "Open Repair",
  "ongoing-control": "Open Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Find the first visible Decision Gap before paying for deeper work.",
  "deep-review": "Understand why buyers, search, or AI may hesitate.",
  "build-fix": "Repair the clearest public proof and clarity blockers.",
  "ongoing-control": "Keep the business presence from drifting after repair.",
};

const PATH_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  cta: CTA_LABEL_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
  path: PATH_BY_PLAN[plan.key],
}));

const LINK_PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_58%,#a78bfa)] px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,0.18),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const LINK_SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-white/82 px-8 py-4 text-base font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A concise path for choosing Scan, Review, Repair, or Control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#eef8ff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <PlansAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100svh-4.35rem)] max-w-[98rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.58fr_1.42fr] lg:items-center lg:px-8 lg:py-14" aria-label="Cendorq plans">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-[clamp(3.05rem,7.2vw,6.35rem)] font-black leading-[0.86] tracking-[-0.095em] text-slate-950">
            Choose the next repair depth.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Start with the Free Scan when the Decision Gap is unknown. Move deeper only when the next repair is clear.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={LINK_PRIMARY}>Start Free Scan</Link>
            <Link href="/faq" className={LINK_SECONDARY}>Read FAQ</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            No guaranteed rankings, leads, revenue, or AI placement. Each plan is a controlled step in the same repair path.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLAN_CARDS.map((plan, index) => (
            <article key={plan.key} className="relative overflow-hidden rounded-[2rem] border border-white/82 bg-white/76 p-5 shadow-[0_24px_80px_rgba(15,23,42,.10),inset_0_1px_0_rgba(255,255,255,.94)] backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-sky-700">{String(index + 1).padStart(2, "0")} / {plan.path}</p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.075em] text-slate-950">{plan.name}</h2>
                </div>
                <div className="shrink-0 rounded-2xl border border-cyan-100 bg-white/80 px-4 py-3 text-right shadow-[0_12px_34px_rgba(15,23,42,.06)]">
                  <p className="text-sm font-black text-slate-950">{plan.price}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{plan.cadence}</p>
                </div>
              </div>
              <p className="mt-5 min-h-16 text-sm font-semibold leading-7 text-slate-600">{plan.purpose}</p>
              <Link href={plan.href} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-black text-slate-950 shadow-[0_12px_32px_rgba(14,165,233,.10)] transition hover:-translate-y-0.5 hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Plans validation anchors">
        Plans page is one clear page. Scan, Review, Repair, Control. Free Scan. Deep Review. Build Fix. Ongoing Control. Decision Gap. Start Free Scan. Read FAQ. No crowded plan hero. No visible eyebrow label blocks. No rounded-full buttons. No rankings, leads, revenue, ROI, or AI placement guarantee.
      </section>
    </main>
  );
}

function PlansAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(186,230,253,.9),transparent_30%),radial-gradient(circle_at_88%_6%,rgba(219,234,254,.82),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef9ff_46%,#f8fcff_100%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:96px_96px]" />
    </div>
  );
}
