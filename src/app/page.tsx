import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Business Command Intelligence";

export const metadata = buildMetadata({
  title: "Cendorq | Business Command Intelligence",
  description:
    "Cendorq helps business owners find where customers lose clarity, trust, visibility, or action before they spend on the wrong fix.",
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

const SIGNAL_ROWS = [
  ["Clarity", "Can a customer understand you fast?"],
  ["Trust", "Can they believe you before they call?"],
  ["Visibility", "Can search, maps, reviews, and AI answers explain you?"],
  ["Action", "Is the next step obvious enough to take?"],
] as const;

const PLAN_LADDER = [
  { title: "Free Scan", price: "$0", copy: "Start here when the cause is unclear.", href: "/free-check" },
  { title: "Deep Review", price: "$300", copy: "Use when you need evidence and priority.", href: "/plans/deep-review" },
  { title: "Build Fix", price: "$750+", copy: "Use when the weak point is ready to fix.", href: "/plans/build-fix" },
  { title: "Ongoing Control", price: "$300/mo", copy: "Use when the market keeps changing.", href: "/plans/ongoing-control" },
] as const;

const TRUST_RULES = [
  "No fake urgency.",
  "No guaranteed revenue claims.",
  "Protected dashboard and report vault after verification.",
  "Plain-English diagnosis before bigger spend.",
] as const;

const FAQS = [
  {
    question: "What is Cendorq?",
    answer:
      "Cendorq is Business Command Intelligence. It helps owners understand where customers lose clarity, trust, visibility, or action before choosing the next fix.",
  },
  {
    question: "Why does AI-search visibility matter?",
    answer:
      "Customers now compare businesses through search, maps, reviews, social platforms, and AI answers before they contact anyone. Cendorq helps find where that trust path is weak.",
  },
  {
    question: "Where should I start?",
    answer:
      "Start with the Free Scan when the cause is unclear. Move to Deep Review, Build Fix, or Ongoing Control only when the next depth is clear.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Business Command Intelligence",
    description:
      "A protected business command system for understanding customer hesitation, AI-search visibility, trust, and the right next move.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Business Command Intelligence",
    description:
      "A customer platform that begins with a Free Scan and connects diagnosis, protected reports, dashboard guidance, support, billing, and plan decisions.",
    path: "/",
    serviceType: "Business Command Intelligence",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-6 text-white sm:px-6 md:pb-14 md:pt-8">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-7 lg:min-h-[calc(100vh-8.25rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center" aria-label="Cendorq command entry">
        <div className="max-w-5xl">
          <TopChip>{CATEGORY_LINE}</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.4rem]">
            Know why customers hesitate.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} reads the public path people use before they choose you: search, AI answers, maps, reviews, your site, your offer, and the next action. It turns weak signals into one clear decision path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See pricing
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400">Prices stay visible: Free Scan $0 · Deep Review $300 · Build Fix $750+ · Ongoing Control $300/mo.</p>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_28px_90px_rgba(2,8,23,0.38)] sm:p-7" aria-label="Command read">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">What Cendorq checks</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Can a customer understand you, trust you, find you, and act without needing a sales pitch?
          </h2>
          <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
            {SIGNAL_ROWS.map(([label, copy]) => (
              <div key={label} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
                <div className="text-sm font-semibold text-cyan-100">{label}</div>
                <div className="text-sm leading-6 text-slate-300">{copy}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7" aria-label="Customer behavior">
        <TopChip>Why it matters now</TopChip>
        <h2 className="mt-5 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          The customer does not wait for a pitch.
        </h2>
        <p className="mt-5 max-w-4xl text-xl leading-9 text-slate-200 sm:text-2xl">
          They search. They compare. They judge. They act or leave.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-400">
          If search, maps, reviews, AI summaries, pricing, or the page itself creates doubt, the business may never hear the objection.
        </p>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-white/10 bg-slate-950/45 p-5 sm:p-7" aria-label="Pricing ladder">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <TopChip>Plan ladder</TopChip>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Choose depth only when depth is earned.</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-300">Start with the Free Scan when the cause is unclear. Pay when the next level is actually clear.</p>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">Compare plans →</Link>
        </div>

        <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-[1.5rem] border border-white/10">
          {PLAN_LADDER.map((item) => <PriceRow key={item.title} {...item} />)}
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-cyan-300/15 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_34%),rgba(2,8,23,0.72)] p-5 shadow-[0_30px_90px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Trust and next step">
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <TopChip>Trust lock</TopChip>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Trust is the product.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Cendorq is built to diagnose before it pushes depth. The form stays on the focused Free Scan page. Protected dashboard and report vault access continues after verification.
            </p>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRUST_RULES.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Start free scan
              </Link>
              <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                See pricing
              </Link>
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

function PriceRow({ title, price, copy, href }: (typeof PLAN_LADDER)[number]) {
  return (
    <Link href={href} className="grid gap-2 bg-white/[0.02] p-4 transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[1fr_auto_1.25fr] sm:items-center sm:p-5">
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <div className="text-2xl font-semibold tracking-tight text-cyan-100 sm:text-right">{price}</div>
      <p className="text-sm leading-6 text-slate-300 sm:text-right">{copy}</p>
    </Link>
  );
}
