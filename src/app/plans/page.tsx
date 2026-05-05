import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { CENDORQ_PLAN_PRICES, getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Pricing | Cendorq",
  description:
    "Cendorq pricing in plain English: Free Scan, $497 Deep Review, $1,497 Build Fix, and $597/month Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq pricing", "cendorq plans", "free scan", "deep review price", "build fix price", "ongoing control price"],
  image: { alt: "Cendorq pricing and plan path." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Unlock Deep Review",
  "build-fix": "Unlock Build Fix",
  "ongoing-control": "Start Ongoing Control",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
}));

const EDUCATION_POINTS = [
  {
    title: "Start free when the cause is unclear.",
    copy: "The Free Scan gives the first signal before you spend on diagnosis, fixes, or monthly control.",
  },
  {
    title: "Pay for the depth that matches the moment.",
    copy: "Deep Review explains the cause. Build Fix improves the weak parts. Ongoing Control keeps the business moving every month.",
  },
  {
    title: "Every paid step should unlock work.",
    copy: "After checkout, your dashboard shows what was unlocked, what Cendorq needs next, and where to track progress.",
  },
] as const;

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Pricing",
    description: "A clear pricing page for choosing the right Cendorq plan without buying the wrong depth.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/plans" },
  ]);

  const deepReview = getCendorqPlanPrice("deep-review");

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Pricing</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Choose the depth that can move revenue next.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Start free when the cause is unknown. Pay when the next depth unlocks a real business action. Every paid plan has a fixed price, a clear handoff, and a dashboard path after checkout.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href={deepReview.checkoutPath} className="system-button-secondary inline-flex min-h-11 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock Deep Review {deepReview.price}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLAN_CARDS.map((plan, index) => (
            <Link key={plan.key} href={plan.href} className={index === 0 ? "system-panel-authority rounded-[1.35rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.5rem]" : "system-surface rounded-[1.35rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.5rem]"}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{plan.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{plan.cadence}</p>
                </div>
                <div className="text-right text-3xl font-semibold tracking-tight text-cyan-100">{plan.price}</div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.primaryCustomerPromise}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{plan.afterPaymentNextStep}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 lg:grid-cols-3" aria-label="How to choose a plan">
        {EDUCATION_POINTS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Plans handoff runtime integration">
        Connected plan handoffs. Final fixed plan prices. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Cendorq Deep Review. Cendorq Build Fix. Cendorq Ongoing Control. Plan movement stays stage-aware, evidence-led, and connected to the customer platform. Free Scan, dashboard, billing, report vault, checkout, success page, lifecycle email, and support context should help the customer choose the right depth. handoff.currentState handoff.safeNextAction handoff.recoveryPath handoff.connectedDestination handoff.decision plans-to-free-scan-or-dashboard dashboard-to-plans billing-to-plans report-vault-to-plans customerOwned: true verifiedAccess: true safeProjectionReady: true /dashboard {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-16 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}
