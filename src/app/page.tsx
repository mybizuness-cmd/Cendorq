import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Business Command Intelligence";

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

const COMMAND_SIGNALS = [
  { label: "Clarity", value: "Can they understand you fast?" },
  { label: "Trust", value: "Do they believe you are safe to choose?" },
  { label: "Visibility", value: "Can search, maps, reviews, and AI describe you correctly?" },
  { label: "Action", value: "Is the next step obvious?" },
] as const;

const CONTROL_BLOCKS = [
  {
    title: "Message command",
    copy: "Sharpens what you do, who it is for, why it matters, and what customers should believe first.",
  },
  {
    title: "Proof command",
    copy: "Surfaces weak trust signals, missing evidence, unclear credibility, and unsupported claims before they cost decisions.",
  },
  {
    title: "Search command",
    copy: "Reads how customers may find, compare, and judge you across search, maps, reviews, social, and AI answers.",
  },
  {
    title: "Action command",
    copy: "Finds friction in the path from interest to contact, booking, purchase, dashboard, report, or support handoff.",
  },
] as const;

const PLAN_PATH = [
  {
    step: "01",
    title: "Free Scan",
    price: "$0",
    copy: "A fast first read when the real decision break is unclear.",
    href: "/free-check",
    cta: "Start free scan",
  },
  {
    step: "02",
    title: "Deep Review",
    price: "$300",
    copy: "A fuller diagnosis when the business needs evidence, priority, and the right next move.",
    href: "/plans/deep-review",
    cta: "See Deep Review",
  },
  {
    step: "03",
    title: "Build Fix or Ongoing Control",
    price: "$750+ / $300 mo",
    copy: "Focused improvement or monthly command only when the next depth is clear.",
    href: "/plans",
    cta: "Compare plans",
  },
] as const;

const TRUST_RULES = [
  "No fake urgency.",
  "Pay only when the next depth is clear.",
  "Plain diagnosis before bigger spend.",
  "Protected dashboard and report vault after verification.",
  "Clear next move, not a confusing wall of tools.",
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-5 text-white sm:px-6 md:pb-14 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-6 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center" aria-label="Cendorq command entry">
        <div className="max-w-5xl">
          <TopChip>{CATEGORY_LINE}</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.7rem]">
            Become the business customers understand, trust, find, and choose.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} finds the hidden reason customers hesitate, then shows the right next move before you buy the wrong fix.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-cyan-100">Find why customers leave before you buy the fix.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See the command path
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first read. Clear pricing. Protected platform after verification.</p>
          <p className="mt-2 max-w-2xl text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Free first read. Clear pricing when you need the next depth.</p>
        </div>

        <aside className="system-panel-authority rounded-[2rem] p-5 sm:p-6" aria-label="Cendorq command readout">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Command readout</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">The decision path</h2>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.15rem] border border-cyan-300/15 bg-cyan-300/10 text-xl font-black text-cyan-100">C</div>
          </div>
          <div className="mt-5 grid gap-3">
            {COMMAND_SIGNALS.map((signal) => (
              <div key={signal.label} className="rounded-[1.25rem] border border-white/10 bg-slate-950/48 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{signal.label}</h3>
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{signal.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_34%),rgba(2,8,23,0.70)] p-5 shadow-[0_26px_90px_rgba(2,8,23,0.38)] sm:p-7" aria-label="Why Cendorq matters now">
        <TopChip>Silent decision pressure</TopChip>
        <h2 className="mt-5 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Customers decide before they talk to you.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          They compare your site, search results, maps, reviews, social proof, and AI answers. If the story is unclear, the proof feels weak, or the next step is hard, they leave quietly.
        </p>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4" aria-label="Command controls">
        {CONTROL_BLOCKS.map((block) => (
          <article key={block.title} className="system-surface rounded-[1.6rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{block.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{block.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 sm:p-7" aria-label="Cendorq plan path">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <TopChip>Highest-converting path</TopChip>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start with diagnosis. Move deeper only when the next depth is clear.</h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">View pricing from $0 -&gt;</Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PLAN_PATH.map((plan) => (
            <Link key={plan.title} href={plan.href} className="rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/24 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{plan.step}</span>
                <span className="text-sm font-semibold text-cyan-100">{plan.price}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{plan.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{plan.copy}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} -&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 sm:p-7" aria-label="Trust and conversion lock">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <TopChip>Conversion without pressure</TopChip>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Clear. Fast. Protected. Easy to act on.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">The public surface stays concise. The deeper intelligence stays protected. The next action stays obvious.</p>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRUST_RULES.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /><span>{item}</span></div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Start free scan</Link>
              <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">See pricing</Link>
            </div>
          </div>
        </div>
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

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}
