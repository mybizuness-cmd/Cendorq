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

const DECISION_SIGNALS = ["Understand", "Trust", "Find", "Act"] as const;

const TRUST_RULES = [
  "No fake urgency.",
  "Start free when the cause is unclear.",
  "Pay only when the next depth is clear.",
  "Protected dashboard and report vault after verification.",
  "Plain answers before bigger spend.",
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-5 text-white sm:px-6 md:pb-14 md:pt-8">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-5 lg:min-h-[calc(100vh-8.5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center" aria-label="Cendorq command entry">
        <div className="max-w-5xl">
          <TopChip>{CATEGORY_LINE}</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.4rem]">
            Find why customers leave before you buy the fix.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} shows where your business loses clarity, trust, visibility, or the next step across search, AI answers, maps, reviews, and your site.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See pricing
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first read. Clear pricing when you need the next depth.</p>
        </div>

        <aside className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_24px_80px_rgba(2,8,23,0.34)] sm:p-5" aria-label="Cendorq identity">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.15rem] border border-cyan-300/15 bg-cyan-300/10 text-xl font-black text-cyan-100">C</div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Cendorq</h2>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Business Command Intelligence</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">A plain diagnosis of the path customers use before they contact you.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {DECISION_SIGNALS.map((signal) => <span key={signal} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200">{signal}</span>)}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_34%),rgba(2,8,23,0.70)] p-5 shadow-[0_26px_90px_rgba(2,8,23,0.38)] sm:p-7" aria-label="Customer decision pressure">
        <TopChip>Silent decision pressure</TopChip>
        <h2 className="mt-5 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          If they do not understand you, trust you, find you, or know what to do next, they move on quietly.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          Most owners see the symptom: fewer calls, weak bookings, ignored pages, or people choosing someone else. Cendorq looks for the pressure behind it in plain English.
        </p>
      </section>

      <section className="relative z-10 mt-7 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch" aria-label="Why Cendorq matters now">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <h2 className="text-3xl font-semibold tracking-tight text-white">Search changed.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">Customers compare you through Google, maps, reviews, social platforms, and AI answers before they decide who feels safe to contact.</p>
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <h2 className="text-3xl font-semibold tracking-tight text-white">The first move is clarity.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">Start with the Free Scan when the cause is unclear. Move deeper only when the business needs a fuller diagnosis, a scoped fix, or monthly control.</p>
        </article>
      </section>

      <section className="relative z-10 mt-7 rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 sm:p-7" aria-label="Trust and next step">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <TopChip>Trust lock</TopChip>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Proof first. No pressure.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">Cendorq helps you see the break before you spend deeper. Your protected dashboard and report vault continue the path after verification.</p>
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
