import { FreeScanConciergeNudge } from "@/components/public/free-scan-concierge-nudge";
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
    "Cendorq helps business owners understand why customers hesitate, how search and AI discovery affect trust, and what next move to make before spending on the wrong fix.",
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

const HERO_POINTS = ["Plain diagnosis", "AI-search aware", "Protected dashboard", "Clear next move"] as const;

const DECISION_BREAKS = [
  {
    title: "Search changed",
    copy: "People now ask Google, maps, reviews, social platforms, and AI tools who looks trustworthy. If your business is unclear, you may never hear why they passed.",
  },
  {
    title: "Customers compare fast",
    copy: "They scan your page, proof, price, reviews, and next step quickly. If it feels confusing or risky, they choose the easier option.",
  },
  {
    title: "Cendorq finds the break",
    copy: "We look for the point where clarity, trust, visibility, or action is failing so you do not buy the wrong fix first.",
  },
] as const;

const PLAN_LADDER = [
  { title: "Free Scan", price: "$0", copy: "Find the first visible pressure before spending deeper.", href: "/free-check" },
  { title: "Deep Review", price: "$300", copy: "Get the deeper diagnosis with evidence, priorities, and limits.", href: "/plans/deep-review" },
  { title: "Build Fix", price: "$750+", copy: "Improve the weak page, message, trust, or action path.", href: "/plans/build-fix" },
  { title: "Ongoing Control", price: "$300/mo", copy: "Keep the business sharp as search, AI, competitors, and customers change.", href: "/plans/ongoing-control" },
] as const;

const TRUST_RULES = [
  "No fake urgency.",
  "No guaranteed revenue claims.",
  "No protected results before verification.",
  "No confusing plan push before the problem is clear.",
] as const;

const FAQS = [
  {
    question: "What is Cendorq?",
    answer:
      "Cendorq is a business command intelligence system. It helps owners understand why customers hesitate, how trust and discovery are changing, and what next move fits the business stage.",
  },
  {
    question: "Why does AI search matter?",
    answer:
      "Customers are not only clicking websites anymore. They compare businesses through search results, maps, reviews, summaries, social platforms, and AI answers. Clear trust signals and plain positioning matter more now.",
  },
  {
    question: "Where should I start?",
    answer:
      "Start with the Free Scan when the cause is unclear. Move to Deep Review when you need a full diagnosis, Build Fix when the direction is clear, and Ongoing Control when the base needs continued attention.",
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-7 text-white sm:px-6 md:py-9 xl:py-10">
      <HomeAtmosphere />
      <FreeScanConciergeNudge />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <TopChip>{CATEGORY_LINE}</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.75rem]">
            Customers are deciding faster than most businesses can explain themselves.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} shows where your business is losing clarity, trust, AI-search visibility, or action — then guides the right next move without making you buy the wrong depth first.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See pricing
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {HERO_POINTS.map((item) => <ProofPill key={item}>{item}</ProofPill>)}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-5 shadow-[0_30px_100px_rgba(8,47,73,0.24)] sm:p-7 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.1),transparent_30%)]" />
          <div className="relative z-10">
            <TopChip>What this means</TopChip>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              If customers do not understand you, trust you, find you, or know what to do next, they leave quietly.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Most owners only see the symptom: fewer calls, weak bookings, ignored pages, or people choosing someone else. Cendorq is built to show the pressure behind the symptom in plain English.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 lg:grid-cols-3" aria-label="Plain education">
        {DECISION_BREAKS.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.5rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8" aria-label="Pricing ladder">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <TopChip>Plan ladder</TopChip>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start free. Pay when the next depth is clear.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              Pricing should be easy to see. The only hard part should be the truth of what the business needs next.
            </p>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">Compare plans →</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_LADDER.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-cyan-100">{item.price}</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Trust rules</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Strong enough to sell. Plain enough to understand.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Cendorq should educate while converting. The language stays simple, but the system stays precise: no fake certainty, no hidden pressure, no protected data exposure.
          </p>
          <div className="mt-6 grid gap-2">
            {TRUST_RULES.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {FAQS.map((item) => <FaqCard key={item.question} question={item.question} answer={item.answer} />)}
        </div>
      </section>

      <section className="relative z-10 mt-10">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best first move</TopChip>
          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Find the pressure before buying the fix.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
            Start with the Free Scan when the cause is unclear. The protected dashboard and report vault continue the path after verification.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HomeAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-16 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
      <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function ProofPill({ children }: { children: ReactNode }) {
  return <div className="system-surface rounded-full px-4 py-2 text-sm font-semibold text-slate-200">{children}</div>;
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.5rem] p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
