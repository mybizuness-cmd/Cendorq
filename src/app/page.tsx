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
  { label: "Findability", value: "Can customers, Google, maps, reviews, and AI discovery surface the business?", score: "78", state: "Watch" },
  { label: "Clarity", value: "Can a buyer understand the business fast enough to keep moving?", score: "64", state: "Weak" },
  { label: "Trust", value: "Is proof strong enough before the first call, quote, or booking?", score: "71", state: "Improve" },
  { label: "Choice", value: "Is the reason to choose this business sharper than competitors?", score: "59", state: "Priority" },
  { label: "Action", value: "Is the next step obvious the moment the buyer is ready?", score: "83", state: "Clear" },
] as const;

const DECISION_SIGNALS = [
  {
    signal: "Choice gap",
    finding: "The business may be visible without feeling inevitable.",
    impact: "Buyers compare longer, delay, or choose the cleaner competitor.",
  },
  {
    signal: "Trust friction",
    finding: "Proof exists, but it is not close enough to the decision.",
    impact: "A ready buyer still hesitates because confidence is not immediate.",
  },
  {
    signal: "AI summary risk",
    finding: "Public information may be too loose for answer engines.",
    impact: "AI discovery can flatten the business into a generic category.",
  },
] as const;

const COMMAND_PATH = [
  {
    verb: "Scan",
    plan: "Free Scan",
    price: "$0",
    copy: "Find the first break in visibility, clarity, trust, choice, or action.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start Free Scan",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    verb: "Diagnose",
    plan: "Deep Review",
    price: DEEP_REVIEW.price,
    copy: "Prove the real cause before money goes into the wrong fix.",
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
    <main className="relative isolate overflow-hidden text-white">
      <HomeAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[92rem] px-4 pb-12 pt-6 sm:px-6 md:pb-20 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8" aria-label="Cendorq market understanding command system">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Market understanding · AI search visibility · customer choice
          </div>
          <h1 className="mt-6 max-w-6xl text-[clamp(3.6rem,9vw,8.8rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-white">
            Own how the market understands your business.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Search is no longer only a list of links. Customers, Google, maps, reviews, and AI answers form an opinion before anyone speaks to you. {BRAND_NAME} shows whether your business is clear enough to be found, trusted, and chosen — and what to fix first if it is not.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See the command path
            </Link>
          </div>
        </div>

        <MarketCommandConsole />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Cendorq market standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-5 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">The new standard</p>
              <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Ranking is not enough. The business has to become the clear choice.
              </h2>
            </div>
            <div className="grid gap-4">
              <p className="rounded-[2rem] border border-cyan-200/15 bg-cyan-200/[0.08] p-6 text-lg leading-8 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                The strongest business is visible, understandable, trusted, and easy to choose. Cendorq is built for the moment where search, AI answers, reviews, proof, and customer judgment all meet.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {TRUST_BOUNDARIES.map((item) => (
                  <p key={item} className="rounded-[1.35rem] border border-white/10 bg-black/25 px-5 py-4 text-sm font-bold leading-6 text-slate-200">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Cendorq first signal preview">
        <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[2.25rem] border border-cyan-200/16 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.17),transparent_44%),linear-gradient(180deg,rgba(8,47,73,0.82),rgba(2,8,23,0.92))] p-6 shadow-[0_36px_130px_rgba(2,8,23,0.48)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">What Cendorq surfaces</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Not an opinion. A decision signal.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              The scan is valuable because it refuses to pretend. It separates what is visible, what is inferred, what is strong, what is weak, and what needs deeper diagnosis.
            </p>
            <Link href="/free-check" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-black text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start the first scan
            </Link>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {DECISION_SIGNALS.map((item, index) => (
              <article key={item.signal} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-5 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-100">{item.signal}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white">{item.finding}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Cendorq command path">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">The operating path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Scan. Diagnose. Fix. Control.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">One path. Four depths. No clutter. No fake certainty. Move deeper only when the business has earned the next command.</p>
              <Link href="/plans" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare all plans →</Link>
            </div>
            <div className="divide-y divide-white/10">
              {COMMAND_PATH.map((stage) => (
                <Link key={stage.verb} href={stage.href} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{stage.verb}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{stage.plan}</div>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">{stage.copy}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-100">{stage.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="AI search visibility homepage guardrails">
        AI search visibility homepage. Market understanding system. Business visibility command system. Own how the market understands your business. Search is no longer only a list of links. Customers, Google, maps, reviews, and AI answers form an opinion before anyone speaks to the business. Market Understanding Map. Findability. Clarity. Trust. Choice. Action. Ranking is not enough. The business has to become the clear choice. Scan. Diagnose. Fix. Control. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Evidence, confidence, boundary, next action. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {COMMAND_PATH.map((stage) => `${stage.verb} ${stage.plan} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
      </section>
    </main>
  );
}

function MarketCommandConsole() {
  return (
    <aside className="relative z-10 mt-8 lg:mt-0" aria-label="Market Understanding Map preview">
      <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-4 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-cyan-100">Market Understanding Map</p>
            <h2 className="mt-2 max-w-lg text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">A first read on whether the market can choose you.</h2>
          </div>
          <span className="w-fit rounded-full border border-cyan-300/24 bg-cyan-300/12 px-3 py-1 text-sm font-bold text-cyan-100">First signal</span>
        </div>

        <div className="relative mt-7 rounded-[2rem] border border-white/10 bg-slate-950/58 p-4 sm:p-5">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.03]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/18 bg-slate-950/70" />
          <div className="relative grid gap-3 sm:grid-cols-2">
            {MARKET_MAP_SIGNALS.map((signal, index) => (
              <div key={signal.label} className={index === 3 ? "rounded-[1.4rem] border border-cyan-200/28 bg-cyan-200/[0.1] p-4 shadow-[0_18px_70px_rgba(34,211,238,0.12)] backdrop-blur sm:col-span-2" : "rounded-[1.4rem] border border-white/10 bg-black/24 p-4 backdrop-blur"}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">{signal.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{signal.value}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold tracking-[-0.05em] text-white">{signal.score}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{signal.state}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="rounded-[1.4rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm leading-6 text-cyan-50">
            Example preview only. The real scan uses your business context and returns a protected dashboard result.
          </p>
          <Link href="/free-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Run scan →
          </Link>
        </div>
      </div>
    </aside>
  );
}

function HomeAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_84%_4%,rgba(56,189,248,0.11),transparent_26%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
