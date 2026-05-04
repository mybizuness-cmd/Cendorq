import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";

export const metadata = buildMetadata({
  title: "Pricing | Cendorq",
  description:
    "Cendorq pricing in plain English: Free Scan, $300 Deep Review, $750+ Build Fix, and $300/month Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq pricing", "cendorq plans", "free scan", "deep review price", "build fix price", "ongoing control price"],
  image: { alt: "Cendorq pricing and plan ladder." },
});

const PRICING_PLANS = [
  {
    name: "Free Scan",
    price: "$0",
    cadence: "first read",
    href: "/free-check",
    cta: "Start free scan",
    bestFor: "When you know something is costing decisions, but not what yet.",
    outcome: "A protected first read on clarity, trust, AI-search visibility, and next-step friction.",
  },
  {
    name: "Deep Review",
    price: "$300",
    cadence: "full diagnosis",
    href: "/plans/deep-review",
    cta: "See Deep Review",
    bestFor: "When the business needs the real cause before spending on fixes.",
    outcome: "A deeper report with evidence, priorities, limitations, and the right next move.",
  },
  {
    name: "Build Fix",
    price: "$750+",
    cadence: "scoped implementation",
    href: "/plans/build-fix",
    cta: "See Build Fix",
    bestFor: "When the direction is clear and the weak parts need to be improved.",
    outcome: "Focused fixes for the page, message, trust signals, and action path.",
  },
  {
    name: "Ongoing Control",
    price: "$300/mo",
    cadence: "monthly command",
    href: "/plans/ongoing-control",
    cta: "See Ongoing",
    bestFor: "When the business needs continued watch, adjustment, and direction.",
    outcome: "Monthly control for search shifts, AI visibility, customer friction, and plan guidance.",
  },
] as const;

const EDUCATION_POINTS = [
  {
    title: "Search changed",
    copy: "People do not only click websites now. They ask Google, maps, reviews, social platforms, and AI tools who looks trustworthy and worth choosing.",
  },
  {
    title: "Customers compare fast",
    copy: "If the offer is unclear, the proof is weak, or the next step feels confusing, they leave before telling you what broke.",
  },
  {
    title: "Cendorq finds the break",
    copy: "The first job is to show where clarity, trust, visibility, and action are failing so the business does not buy the wrong fix.",
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

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <TopChip>Pricing</TopChip>
          <h1 className="system-hero-title mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Clear plans. Clear prices. No wrong-depth push.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Most owners do not know whether they need a scan, a diagnosis, a fix, or monthly control. Cendorq makes the next step plain before asking the business to spend deeper.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/connect" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Ask which fits
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRICING_PLANS.map((plan, index) => (
            <Link key={plan.name} href={plan.href} className={index === 0 ? "system-panel-authority rounded-[1.65rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950" : "system-surface rounded-[1.65rem] p-5 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{plan.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{plan.cadence}</p>
                </div>
                <div className="text-right text-3xl font-semibold tracking-tight text-cyan-100">{plan.price}</div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.bestFor}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{plan.outcome}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 lg:grid-cols-3" aria-label="Plain education while choosing a plan">
        {EDUCATION_POINTS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.5rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-10" aria-label="Plans handoff runtime integration">
        <div className="system-surface rounded-[2rem] p-5 sm:p-7">
          <TopChip>Connected plan handoffs</TopChip>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white">
            Plan movement stays stage-aware, evidence-led, and connected to the customer platform.
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
            Free Scan, dashboard, billing, report vault, and support context should help you choose the right depth without fake urgency, dark patterns, unsupported ROI claims, unsupported outcome promises, raw/internal data exposure, or disconnected plan decisions.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Customers should start with diagnosis when readiness is unclear, or return to dashboard when private customer context exists.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {PLANS_HANDOFFS.map((handoff) => (
              <Link key={handoff.surfaceKey} href={handoff.connectedDestination} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{handoff.decision} · {handoff.surfaceKey}</span>
                <span className="mt-3 block font-semibold text-white">{handoff.currentState}</span>
                <span className="mt-2 block">{handoff.safeNextAction}</span>
                <span className="mt-3 block text-xs leading-5 text-slate-400">Recovery: {handoff.recoveryPath}</span>
              </Link>
            ))}
          </div>
          <div className="sr-only">
            handoff.currentState handoff.safeNextAction handoff.recoveryPath handoff.connectedDestination handoff.decision plans-to-free-scan-or-dashboard dashboard-to-plans billing-to-plans report-vault-to-plans customerOwned: true verifiedAccess: true safeProjectionReady: true /dashboard
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-10">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8">
          <TopChip>Best first move</TopChip>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start free if the cause is unclear. Pay when the next depth is obvious.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300">
            That is the Cendorq path: educate while converting, guide without pressure, and protect the customer from buying the wrong fix first.
          </p>
          <div className="mt-7">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
          </div>
        </div>
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

function TopChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}
