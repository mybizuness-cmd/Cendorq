import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

export const metadata = buildMetadata({
  title: "Cendorq | Business Command Intelligence",
  description:
    "Cendorq helps business owners find the hidden reason customers do not choose them, then shows the right next move before they buy the wrong fix.",
  path: "/",
  keywords: [
    "cendorq",
    "business command intelligence",
    "ai search visibility",
    "customer hesitation analysis",
    "business clarity system",
    "website trust analysis",
    "conversion decision system",
    "free business scan",
  ],
  image: { alt: "Cendorq business command intelligence homepage." },
});

const FREE_SCAN = getCendorqPlanPrice("free-scan");
const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const ABOVE_FOLD_DECISION = [
  { label: "Problem", value: "Customers hesitate before they ever contact you." },
  { label: "Checks", value: "Clarity, trust, visibility, and the next step." },
  { label: "Move", value: "Start with the Free Scan before paying for deeper work." },
] as const;

const DECISION_BREAKS = [
  { title: "Unclear in seconds", copy: "People do not understand the business fast enough." },
  { title: "Not trusted yet", copy: "The proof is not strong enough to make the choice feel safe." },
  { title: "Found incorrectly", copy: "Search, maps, reviews, and AI answers weaken the story." },
  { title: "Hard to act", copy: "The next step feels easier to avoid than complete." },
] as const;

const PUBLIC_CUSTOMER_JOURNEY = [
  {
    label: "01",
    title: "Free Scan",
    stage: "First signal",
    copy: "A useful first read before you pay for diagnosis, implementation, or monthly control.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start free scan",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    label: "02",
    title: "Deep Review",
    stage: "Cause-level diagnosis",
    copy: "Use it when the first signal is not enough and guessing would cost more than diagnosis.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW.price}`,
    value: getPlanValueDelivery("deep-review"),
  },
  {
    label: "03",
    title: "Build Fix",
    stage: "Scoped implementation",
    copy: "Use it when the weak page, message, proof point, or action path is ready to improve.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock ${BUILD_FIX.price}`,
    value: getPlanValueDelivery("build-fix"),
  },
  {
    label: "04",
    title: "Ongoing Control",
    stage: "Monthly decision support",
    copy: "Use it when the business needs recurring review, alerts, priorities, and control.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-4 text-white sm:px-6 md:pb-12 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-5 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center" aria-label="Cendorq entry">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">Business command intelligence</p>
          <h1 className="system-hero-title mt-3 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl xl:text-[5.5rem]">
            Find why customers do not choose you.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            {BRAND_NAME} finds the hidden break in clarity, trust, visibility, or action before you buy the wrong fix.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:mt-8">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              View pricing
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first read. Clear pricing. Protected platform after verification.</p>
        </div>

        <aside className="system-panel-authority rounded-[1.55rem] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Above fold decision panel">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-100">First screen decision</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Start with the safest read.</h2>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">$0</span>
          </div>
          <div className="mt-4 grid gap-3">
            {ABOVE_FOLD_DECISION.map((item) => (
              <div key={item.label} className="rounded-[1.05rem] border border-white/10 bg-slate-950/45 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                <p className="mt-1 text-sm leading-6 text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
          <Link href="/free-check" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open Free Scan →
          </Link>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.1),transparent_34%),rgba(2,8,23,0.68)] p-5 shadow-[0_24px_80px_rgba(2,8,23,0.32)] sm:rounded-[1.7rem] sm:p-7" aria-label="Why Cendorq matters now">
        <h2 className="max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Customers decide before they talk to you.
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
          They compare your site, search results, maps, reviews, social proof, and AI answers. If the story is unclear, the proof feels weak, or the next step is hard, they leave quietly.
        </p>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Decision breaks">
        {DECISION_BREAKS.map((block) => (
          <article key={block.title} className="system-surface rounded-[1.3rem] p-4 sm:rounded-[1.45rem] sm:p-5">
            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{block.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">{block.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.86)_46%,rgba(14,116,144,0.28))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Premium plan stage system">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Plan path</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Four levels. Four different jobs. No cheap bundle confusion.</h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare all plans →</Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {PUBLIC_CUSTOMER_JOURNEY.map((stage) => (
            <Link key={stage.label} href={stage.href} className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl font-semibold tracking-tight text-cyan-100/80">{stage.label}</span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{stage.value.price}</span>
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{stage.stage}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{stage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{stage.copy}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Premium plan block guardrails">
        Premium plan blocks. Four levels. Four different jobs. No cheap bundle confusion. Remove useless final boundary block before footer. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PUBLIC_CUSTOMER_JOURNEY.map((stage) => `${stage.label} ${stage.title} ${stage.stage} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
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
