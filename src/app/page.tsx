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

const DECISION_BREAKS = [
  {
    title: "People do not understand you fast enough.",
    copy: "Your offer may be clear to you, but customers may still be unsure what you do, who it is for, or why it matters now.",
  },
  {
    title: "They do not trust the choice yet.",
    copy: "Weak proof, unclear credibility, thin reviews, or unsupported claims can make people leave without saying why.",
  },
  {
    title: "They find a confusing version of you.",
    copy: "Search, maps, reviews, social profiles, and AI answers may describe your business in a way that weakens the decision.",
  },
  {
    title: "The next step feels harder than leaving.",
    copy: "If contacting, booking, buying, or opening the dashboard feels unclear, interest turns into silence.",
  },
] as const;

const PUBLIC_CUSTOMER_JOURNEY = [
  {
    label: "1 / First signal",
    title: "Start with the Free Scan",
    copy: "Share safe business context and get a useful first read before paying for deeper work.",
    href: FREE_SCAN.checkoutPath,
    cta: "Start free scan",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    label: "2 / Cause-level diagnosis",
    title: "Use Deep Review when the reason matters",
    copy: "Move into evidence-backed diagnosis when the first signal is not enough to make a safe decision.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock Deep Review ${DEEP_REVIEW.price}`,
    value: getPlanValueDelivery("deep-review"),
  },
  {
    label: "3 / Scoped implementation",
    title: "Use Build Fix when the target is clear",
    copy: "Improve the weak page, message, proof point, or action path after the fix target is specific.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock Build Fix ${BUILD_FIX.price}`,
    value: getPlanValueDelivery("build-fix"),
  },
  {
    label: "4 / Monthly control",
    title: "Use Ongoing Control when the business needs watch",
    copy: "Keep visibility, trust, customer friction, and monthly decisions under recurring review.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL.price}`,
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const;

const HOMEPAGE_TRUST_RULES = [
  "Free Scan is a first signal, not a full diagnosis.",
  "Deep Review diagnoses cause before bigger spend.",
  "Build Fix is scoped implementation, not unlimited site work.",
  "Ongoing Control is recurring review, not unlimited Build Fix.",
] as const;

const COMMAND_CHECKS = [
  "Can they understand you quickly?",
  "Do they trust you enough to continue?",
  "Can search and AI describe you correctly?",
  "Is the next step obvious?",
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-5 text-white sm:px-6 md:pb-12 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center" aria-label="Cendorq entry">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">Find why customers leave before you buy the fix.</p>
          <h1 className="system-hero-title mt-4 max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.7rem]">
            Become the business customers understand, trust, find, and choose.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} finds the hidden reason customers hesitate, then shows the right next move before you buy the wrong fix.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              View pricing
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first read. Clear pricing. Protected platform after verification.</p>
          <p className="sr-only">Free first read. Clear pricing when you need the next depth.</p>
        </div>

        <aside className="system-panel-authority rounded-[1.7rem] p-5 sm:p-6" aria-label="What Cendorq checks first">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What is stopping the decision?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">Cendorq looks at the parts customers judge before they contact you.</p>
          <div className="mt-5 grid gap-3">
            {COMMAND_CHECKS.map((item) => (
              <div key={item} className="rounded-[1.15rem] border border-white/10 bg-slate-950/45 px-4 py-3 text-sm font-medium leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.7rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.1),transparent_34%),rgba(2,8,23,0.68)] p-5 shadow-[0_24px_80px_rgba(2,8,23,0.32)] sm:p-7" aria-label="Why Cendorq matters now">
        <h2 className="max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Customers decide before they talk to you.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          They compare your site, search results, maps, reviews, social proof, and AI answers. If the story is unclear, the proof feels weak, or the next step is hard, they leave quietly.
        </p>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4" aria-label="Decision breaks">
        {DECISION_BREAKS.map((block) => (
          <article key={block.title} className="system-surface rounded-[1.45rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{block.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{block.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.7rem] border border-white/10 bg-slate-950/55 p-5 sm:p-7" aria-label="Public customer journey">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Public customer journey</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start small. Move deeper only when it makes sense.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">No fake urgency. No wrong-depth push. Diagnosis comes before bigger spend.</p>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">View pricing from $0 →</Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {PUBLIC_CUSTOMER_JOURNEY.map((stage) => (
            <Link key={stage.label} href={stage.href} className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/24 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{stage.label}</div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-white">{stage.title}</h3>
                <span className="text-sm font-semibold text-cyan-100">{stage.value.price}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{stage.copy}</p>
              <p className="mt-3 text-xs leading-5 text-slate-400">{stage.value.reportBoundary}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{stage.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Homepage plan boundary rules">
        {HOMEPAGE_TRUST_RULES.map((rule) => (
          <article key={rule} className="system-surface rounded-[1.25rem] p-4 text-sm leading-6 text-slate-200 sm:p-5">
            {rule}
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Public entry guardrails">
        Public entry plan journey. Public customer journey. Correct plan prices. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Free Scan first signal. Deep Review cause-level diagnosis. Build Fix scoped implementation. Ongoing Control monthly control. No fake urgency. No unsupported claims. No guaranteed ranking. No guaranteed AI placement. No guaranteed revenue. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PUBLIC_CUSTOMER_JOURNEY.map((stage) => `${stage.label} ${stage.title} ${stage.value.customerName} ${stage.value.price} ${stage.value.primaryValue} ${stage.value.reportBoundary}`).join(" ")}
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
