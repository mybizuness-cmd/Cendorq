import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

export const metadata = buildMetadata({
  title: "Cendorq | Business Command Intelligence",
  description:
    "Cendorq helps business owners see why customers hesitate, what is weakening trust, and which next move fits before they buy the wrong fix.",
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

const FIRST_READ = [
  { label: "Find", value: "The first visible break in clarity, trust, visibility, or action." },
  { label: "Avoid", value: "Paying for diagnosis, fixes, or monthly work before the problem is clear." },
  { label: "Open", value: "A protected dashboard result after verification." },
] as const;

const DECISION_BREAKS = [
  { title: "People do not understand you fast enough", copy: "Your offer, location, audience, or proof may not become clear before the buyer leaves." },
  { title: "The choice does not feel safe yet", copy: "Reviews, proof, pricing context, and trust signals may not support the decision strongly enough." },
  { title: "Search and AI may read you weakly", copy: "Your website, maps, reviews, directories, and public wording may not make the business easy to understand or compare." },
  { title: "The next step feels harder than leaving", copy: "Calls, forms, booking, pricing, and page flow may create friction at the exact moment a customer should act." },
] as const;

const PUBLIC_CUSTOMER_JOURNEY = [
  {
    label: "1",
    title: "Free Scan",
    stage: "First signal",
    copy: "Start here when you need a useful first read before spending money deeper.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start free scan",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    label: "2",
    title: "Deep Review",
    stage: "Cause-level diagnosis",
    copy: "Use this when the first signal shows you need proof of what is really holding the business back.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW.price}`,
    value: getPlanValueDelivery("deep-review"),
  },
  {
    label: "3",
    title: "Build Fix",
    stage: "Scoped implementation",
    copy: "Use this when the weak page, message, proof point, or action path is ready for bounded improvement.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock ${BUILD_FIX.price}`,
    value: getPlanValueDelivery("build-fix"),
  },
  {
    label: "4",
    title: "Ongoing Control",
    stage: "Monthly decision support",
    copy: "Use this when visibility, trust, and customer acquisition need recurring review and priority control.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-4 text-white sm:px-6 md:pb-12 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-5 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center" aria-label="Cendorq entry">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">Business command intelligence</p>
          <h1 className="system-hero-title mt-3 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl xl:text-[5.35rem]">
            See what makes customers hesitate before they choose someone else.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            {BRAND_NAME} helps you find the break in clarity, trust, visibility, or action so the next move is based on evidence, not guesswork.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:mt-8">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Compare plans
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first signal. Paid depth only when the stage fits. No guaranteed rankings, revenue, or unlimited implementation.</p>
        </div>

        <aside className="system-panel-authority rounded-[1.45rem] p-4 sm:rounded-[1.6rem] sm:p-5" aria-label="First screen decision panel">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-100">Start here</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Get the first read before buying a fix.</h2>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">$0</span>
          </div>
          <div className="mt-4 grid gap-2">
            {FIRST_READ.map((item) => (
              <div key={item.label} className="rounded-[1rem] border border-white/10 bg-slate-950/42 px-4 py-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
                <p className="mt-1 text-sm leading-6 text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
          <Link href="/free-check" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open Free Scan →
          </Link>
        </aside>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch" aria-label="Why Cendorq matters now">
        <div className="rounded-[1.45rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.1),transparent_34%),rgba(2,8,23,0.68)] p-5 shadow-[0_22px_70px_rgba(2,8,23,0.3)] sm:p-6">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your customer is already comparing you before they contact you.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            They check your site, maps, reviews, proof, offer, and what search or AI systems can understand about you. If the story is unclear, the safer choice becomes someone else.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {DECISION_BREAKS.map((block) => (
            <article key={block.title} className="system-surface rounded-[1.2rem] p-4">
              <h3 className="text-lg font-semibold tracking-tight text-white">{block.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{block.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.62),rgba(2,8,23,0.88)_46%,rgba(14,116,144,0.2))] p-4 shadow-[0_24px_82px_rgba(2,8,23,0.36)] sm:p-5" aria-label="Plan stage system">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Plan path</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">One signal. One diagnosis. One scoped fix. One monthly control layer.</h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare all plans →</Link>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          {PUBLIC_CUSTOMER_JOURNEY.map((stage) => (
            <Link key={stage.label} href={stage.href} className="group relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-950/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-900/78 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl font-semibold tracking-tight text-cyan-100/80">{stage.label}</span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{stage.value.price}</span>
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{stage.stage}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{stage.copy}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Homepage elevation guardrails">
        Homepage public frame elevation. Stronger homepage. Cheap-looking blocks removed. Bulky homepage pricing path reduced. No useless final boundary block before footer. Customer-facing copy speaks directly to the owner. Free Scan form stays early on the scan page. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PUBLIC_CUSTOMER_JOURNEY.map((stage) => `${stage.label} ${stage.title} ${stage.stage} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
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
