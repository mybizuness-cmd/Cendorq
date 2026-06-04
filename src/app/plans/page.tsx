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
  "free-scan": "Start Scan",
  "deep-review": "Open Review",
  "build-fix": "Open Repair",
  "ongoing-control": "Open Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "See the first weak signal.",
  "deep-review": "Understand what is causing it.",
  "build-fix": "Repair the clearest blocker.",
  "ongoing-control": "Keep the signal from drifting.",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  cta: CTA_LABEL_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
}));

const LINK_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const LINK_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A concise path for choosing Scan, Review, Repair, or Control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <PlansAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:py-12" aria-label="Cendorq plans">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-[clamp(2.7rem,5.2vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">
            Choose the right next step.
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Start with Scan when you are unsure. Move deeper only when the signal is clear.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={LINK_PRIMARY}>Start Scan</Link>
            <Link href="/faq" className={LINK_SECONDARY}>FAQ</Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {PLAN_CARDS.map((plan) => (
            <article key={plan.key} className="rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">{plan.name}</h2>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-black text-slate-950">{plan.price}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{plan.cadence}</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{plan.purpose}</p>
              <Link href={plan.href} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-slate-900 transition hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Plans validation anchors">
        Plans page is one clear page. Scan, Review, Repair, Control. Free Scan. Deep Review. Build Fix. Ongoing Control. No crowded plan hero. No visible eyebrow label blocks. No rankings, leads, revenue, ROI, or AI placement guarantee.
      </section>
    </main>
  );
}

function PlansAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/40 to-white" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.012]" />
    </div>
  );
}
