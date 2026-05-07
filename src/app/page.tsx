import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

export const metadata = buildMetadata({
  title: "Cendorq | Market Understanding for the AI Search Era",
  description:
    "Cendorq shows whether customers, search, maps, reviews, and AI answers can find, understand, trust, and choose your business.",
  path: "/",
  keywords: [
    "cendorq",
    "market understanding system",
    "ai search visibility",
    "business visibility command system",
    "business discoverability",
    "answer engine visibility",
    "business trust platform",
    "customer choice intelligence",
    "free business visibility scan",
  ],
  image: { alt: "Cendorq market understanding command system." },
});

const FREE_SCAN = getCendorqPlanPrice("free-scan");
const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const MARKET_MAP_SIGNALS = [
  { label: "Findability", value: "Can search, maps, and AI systems surface the business?", score: "78", state: "Watch" },
  { label: "Clarity", value: "Can a buyer understand the offer fast enough to keep moving?", score: "64", state: "Weak" },
  { label: "Trust", value: "Is proof strong enough before the first call?", score: "71", state: "Improve" },
  { label: "Choice", value: "Is the reason to choose this business sharper than competitors?", score: "59", state: "Priority" },
  { label: "Action", value: "Is the next step obvious when the buyer is ready?", score: "83", state: "Clear" },
] as const;

const FINDING_PREVIEW = [
  {
    signal: "Choice gap",
    finding: "The offer is visible, but the reason to choose it is not yet dominant.",
    impact: "Buyers may compare longer or default to the clearer competitor.",
    next: "Diagnose the proof, positioning, and decision path before changing the page blindly.",
  },
  {
    signal: "Trust friction",
    finding: "Proof exists, but it is not carried close enough to the moment of decision.",
    impact: "A ready buyer can still hesitate because safety and confidence are not immediate.",
    next: "Move the strongest proof closer to the primary action path.",
  },
  {
    signal: "AI summary risk",
    finding: "Public information may not describe the business with enough structure.",
    impact: "AI answers can flatten the business into a generic category instead of a clear choice.",
    next: "Strengthen service clarity, audience fit, evidence, and structured page language.",
  },
] as const;

const COMMAND_PATH = [
  {
    verb: "Scan",
    plan: "Free Scan",
    price: "$0",
    copy: "Find the first break in visibility, clarity, trust, or action.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start Free Scan",
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

const TRUST_BOUNDARIES = [
  "No fake ranking promise.",
  "No vague audit theater.",
  "No guesswork sold as strategy.",
  "Evidence, confidence, boundary, next action.",
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-4 text-white sm:px-6 md:pb-14 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center" aria-label="Cendorq market understanding command system">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">Market understanding · AI search visibility · customer choice</p>
          <h1 className="system-hero-title mt-3 max-w-6xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl xl:text-[5.35rem]">
            Own how the market understands your business.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Search is no longer only a list of links. Customers, Google, maps, reviews, and AI answers form an opinion before anyone speaks to you. {BRAND_NAME} shows whether your business is clear enough to be found, trusted, and chosen — and what to fix first if it is not.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See the command path
            </Link>
          </div>
          <div className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
            {TRUST_BOUNDARIES.map((item) => (
              <p key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold leading-5 text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>

        <MarketUnderstandingMap />
      </section>

      <section className="relative z-10 mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_28px_100px_rgba(2,8,23,0.34)] sm:p-7" aria-label="Cendorq market standard">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">The new standard</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ranking is not enough. The business has to become the clear choice.
            </h2>
          </div>
          <div className="grid gap-3">
            <p className="rounded-[1.35rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 text-base leading-8 text-slate-200 sm:p-6">
              The strongest business is visible, understandable, trusted, and easy to choose. Cendorq is built for the moment where search, AI answers, reviews, proof, and customer judgment all meet.
            </p>
            <p className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300 sm:p-6">
              The goal is not more noise. The goal is a sharper public presence, a clearer decision path, and a safer way to know what deserves attention first.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.9)_46%,rgba(14,116,144,0.24))] p-5 shadow-[0_30px_110px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Cendorq first signal preview">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">What Cendorq surfaces</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Not an opinion. A decision signal.
            </h2>
          </div>
          <Link href="/free-check" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Start the first scan →
          </Link>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {FINDING_PREVIEW.map((item) => (
            <article key={item.signal} className="rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.signal}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.finding}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.impact}</p>
              <p className="mt-4 rounded-[1rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-3 text-sm leading-6 text-cyan-50">{item.next}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.62),rgba(2,8,23,0.9)_46%,rgba(14,116,144,0.2))] p-5 shadow-[0_30px_110px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Cendorq command path">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">The operating path</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">Scan. Diagnose. Fix. Control.</h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare all plans →</Link>
        </div>
        <div className="mt-6 divide-y divide-white/10 rounded-[1.35rem] border border-white/10 bg-slate-950/50">
          {COMMAND_PATH.map((stage) => (
            <Link key={stage.verb} href={stage.href} className="group grid gap-3 px-4 py-5 transition hover:bg-cyan-300/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:px-5">
              <div>
                <div className="text-3xl font-semibold tracking-tight text-white">{stage.verb}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{stage.plan}</div>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">{stage.copy}</p>
              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <div className="text-sm font-semibold text-cyan-100">{stage.price}</div>
                <span className="mt-1 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-3 lg:grid-cols-[1fr_0.8fr]" aria-label="Cendorq proof and boundaries">
        <article className="system-surface rounded-[1.75rem] p-5 sm:p-7">
          <p className="text-sm font-semibold text-cyan-100">Why this is different</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The scan is valuable because it refuses to pretend.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            Cendorq separates what is visible from what is inferred, what is strong from what is weak, and what can be acted on now from what needs deeper diagnosis. That keeps the business from buying the wrong fix too early.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 sm:p-7">
          <p className="text-sm font-semibold text-cyan-100">First move</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Start with the truth.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">Get the first visibility signal before paying for diagnosis, implementation, or monthly control.</p>
          <Link href="/free-check" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Start Free Scan
          </Link>
        </article>
      </section>

      <section className="sr-only" aria-label="AI search visibility homepage guardrails">
        AI search visibility homepage. Market understanding system. Business visibility command system. Own how the market understands your business. Search is no longer only a list of links. Customers, Google, maps, reviews, and AI answers form an opinion before anyone speaks to the business. Market Understanding Map. Findability. Clarity. Trust. Choice. Action. AI summary risk. Ranking is not enough. The business has to become the clear choice. Scan. Diagnose. Fix. Control. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Evidence, confidence, boundary, next action. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {COMMAND_PATH.map((stage) => `${stage.verb} ${stage.plan} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
      </section>
    </main>
  );
}

function MarketUnderstandingMap() {
  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.18),transparent_38%),linear-gradient(145deg,rgba(8,47,73,0.88),rgba(2,8,23,0.96)_52%,rgba(14,116,144,0.3))] p-4 shadow-[0_42px_150px_rgba(2,8,23,0.62)] sm:p-5" aria-label="Market Understanding Map preview">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/85 to-transparent" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Market Understanding Map</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">A first read on whether the market can choose you.</h2>
        </div>
        <span className="w-fit rounded-full border border-cyan-300/24 bg-cyan-300/12 px-3 py-1 text-sm font-semibold text-cyan-100">First signal</span>
      </div>

      <div className="relative mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/58 p-4">
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.03]" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-slate-950/70" />
        <div className="relative grid gap-3 sm:grid-cols-2">
          {MARKET_MAP_SIGNALS.map((signal) => (
            <div key={signal.label} className="rounded-[1.15rem] border border-white/10 bg-black/24 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{signal.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{signal.value}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold tracking-tight text-white">{signal.score}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{signal.state}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="rounded-[1.1rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm leading-6 text-cyan-50">
          Example preview only. The real scan uses your business context and returns a protected dashboard result.
        </p>
        <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
          Run scan →
        </Link>
      </div>
    </aside>
  );
}

function HomeAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-20 top-32 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.035] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
