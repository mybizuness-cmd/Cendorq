import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Visibility and Business Trust",
  description:
    "Cendorq helps businesses become easier to find, understand, trust, and choose as search moves from links to AI answers.",
  path: "/",
  keywords: [
    "cendorq",
    "ai search visibility",
    "business visibility command system",
    "business discoverability",
    "answer engine visibility",
    "business trust platform",
    "customer choice intelligence",
    "free business visibility scan",
  ],
  image: { alt: "Cendorq AI search visibility and business trust homepage." },
});

const FREE_SCAN = getCendorqPlanPrice("free-scan");
const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const MARKET_TEST = [
  { label: "Find", value: "Can customers and AI search discover the business clearly?" },
  { label: "Understand", value: "Can they tell what you do, who you serve, and why it matters?" },
  { label: "Trust", value: "Is there enough proof for the choice to feel safe?" },
  { label: "Act", value: "Is the next step obvious when the buyer is ready?" },
] as const;

const COMMAND_PATH = [
  {
    verb: "Scan",
    plan: "Free Scan",
    price: "$0",
    copy: "Find the first break in visibility, clarity, trust, or action.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start free scan",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    verb: "Diagnose",
    plan: "Deep Review",
    price: DEEP_REVIEW.price,
    copy: "Expose the real reason the business is not being found, trusted, or chosen.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW.price}`,
    value: getPlanValueDelivery("deep-review"),
  },
  {
    verb: "Fix",
    plan: "Build Fix",
    price: BUILD_FIX.price,
    copy: "Improve the page, proof, message, or action path that matters most.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock ${BUILD_FIX.price}`,
    value: getPlanValueDelivery("build-fix"),
  },
  {
    verb: "Control",
    plan: "Ongoing Control",
    price: ONGOING_CONTROL.price,
    copy: "Keep visibility, trust, and priority under watch as AI search and competitors move.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-4 text-white sm:px-6 md:pb-12 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-5 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-center" aria-label="Cendorq AI search visibility command system">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">AI search visibility · business trust · customer choice</p>
          <h1 className="system-hero-title mt-3 max-w-6xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl xl:text-[5.35rem]">
            Own the way the market understands you.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Search is changing from links to answers. Customers, Google, maps, reviews, and AI systems are deciding what your business means before anyone speaks to you. {BRAND_NAME} shows what they can find, what they can trust, and what must be fixed first.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:mt-8">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See the command path
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-400">No tricks. No fake guarantees. No guesswork dressed up as strategy. Just the truth about whether your business can be found, understood, trusted, and chosen.</p>
        </div>

        <aside className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/18 bg-[linear-gradient(145deg,rgba(8,47,73,0.85),rgba(2,8,23,0.94)_50%,rgba(14,116,144,0.28))] p-4 shadow-[0_38px_130px_rgba(2,8,23,0.58)] sm:p-5" aria-label="Market understanding test">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-100">Market test</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Four questions decide whether the business gets chosen.</h2>
            </div>
            <span className="rounded-full border border-cyan-300/24 bg-cyan-300/12 px-3 py-1 text-sm font-semibold text-cyan-100">$0</span>
          </div>
          <div className="mt-5 divide-y divide-white/10 rounded-[1.2rem] border border-white/10 bg-slate-950/46">
            {MARKET_TEST.map((item) => (
              <div key={item.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
                <p className="text-sm leading-6 text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
          <Link href="/free-check" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Run the first scan →
          </Link>
        </aside>
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_26px_95px_rgba(2,8,23,0.34)] sm:p-6" aria-label="Cendorq market standard">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">The new standard</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ranking is not enough. The business has to be understood.
            </h2>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 sm:p-6">
            <p className="text-base leading-8 text-slate-200">
              The strongest business is not only visible. It is clear, trusted, and easy to choose. Cendorq is built for the moment where search, AI answers, reviews, proof, and customer judgment all meet.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.62),rgba(2,8,23,0.9)_46%,rgba(14,116,144,0.2))] p-4 shadow-[0_30px_110px_rgba(2,8,23,0.42)] sm:p-5" aria-label="Cendorq command path">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Command path</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Scan. Diagnose. Fix. Control.</h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare all plans →</Link>
        </div>
        <div className="mt-5 divide-y divide-white/10 rounded-[1.2rem] border border-white/10 bg-slate-950/50">
          {COMMAND_PATH.map((stage) => (
            <Link key={stage.verb} href={stage.href} className="group grid gap-3 px-4 py-4 transition hover:bg-cyan-300/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:px-5">
              <div>
                <div className="text-2xl font-semibold tracking-tight text-white">{stage.verb}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{stage.plan}</div>
              </div>
              <p className="text-sm leading-6 text-slate-300">{stage.copy}</p>
              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <div className="text-sm font-semibold text-cyan-100">{stage.price}</div>
                <span className="mt-1 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="AI search visibility homepage guardrails">
        AI search visibility homepage. Business visibility command system. Own the way the market understands you. Search is changing from links to answers. Customers, Google, maps, reviews, and AI systems decide what the business means before anyone speaks to the business. No tricks. No fake guarantees. No guesswork dressed up as strategy. Find. Understand. Trust. Act. Ranking is not enough. The business has to be understood. Scan. Diagnose. Fix. Control. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {COMMAND_PATH.map((stage) => `${stage.verb} ${stage.plan} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
      </section>
    </main>
  );
}

function HomeAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-20 top-32 h-64 w-64 rounded-full bg-sky-400/8 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
