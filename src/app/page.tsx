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
const CATEGORY_LINE = "Search Presence OS";

export const metadata = buildMetadata({
  title: "Free Search Presence Scan | Cendorq",
  description:
    "Start with Cendorq's free scan to see what is making the business harder to understand, trust, or choose before spending more.",
  path: "/",
  keywords: [
    "cendorq free scan",
    "search presence scan",
    "search presence snapshot",
    "business visibility scan",
    "trust and clarity scan",
    "ai search visibility",
    "answer engine visibility",
  ],
  image: {
    alt: "Cendorq free search presence scan homepage.",
  },
});

const HERO_POINTS = [
  "Free first read.",
  "One clear next step.",
  "No wrong-package push.",
] as const;

const SCAN_OUTCOMES = [
  {
    title: "See the real block",
    copy:
      "Find whether the business is being weakened by weak trust, weak clarity, weak positioning, or weak response flow.",
  },
  {
    title: "Stop guessing",
    copy:
      "Get a clearer first read before paying for heavier strategy, build work, or ongoing support.",
  },
  {
    title: "Know the next move",
    copy:
      "If deeper work is needed, the scan makes the next step easier to understand and easier to choose correctly.",
  },
] as const;

const SCAN_SIGNALS = [
  {
    label: "Trust",
    copy: "Does the business feel believable fast enough?",
  },
  {
    label: "Clarity",
    copy: "Can customers understand what you do without work?",
  },
  {
    label: "Positioning",
    copy: "Does the business feel distinct or does it blur in?",
  },
  {
    label: "Friction",
    copy: "Are customers being slowed down before they act?",
  },
] as const;

const FAQS = [
  {
    question: "Who should start here?",
    answer:
      "Businesses that feel under-read, under-trusted, or harder to choose than they should be should start with the free scan first.",
  },
  {
    question: "What happens after the scan?",
    answer:
      "If the business needs more depth, the scan helps show the right next step instead of pushing you into the wrong one.",
  },
  {
    question: "Why is the homepage focused on one offer?",
    answer:
      "Because the strongest first move is clarity. The homepage is built to drive one decision well: start with the free scan.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A short, clear homepage funnel that drives businesses into the free first-read scan before deeper work.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A free first-read scan that helps businesses see what is making them harder to understand, trust, and choose.",
    path: "/",
    serviceType: "Free Search Presence Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div>
          <TopChip>{CATEGORY_LINE}</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-[4.8rem]">
            Start with the
            <span className="system-gradient-text block">free scan.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} helps businesses see what is making them harder to understand, harder to trust, or harder to choose before they spend more money in the wrong place.
          </p>

          <div className="mt-8">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start free scan
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {HERO_POINTS.map((item, index) => (
              <MiniTrustCard key={item} value={item} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6 md:p-7">
            <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />
            <div className="system-scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

            <div className="relative z-10">
              <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                What the free scan helps expose
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                See the problem before you buy the wrong depth.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                The free scan is built to show whether the business needs stronger trust, clearer explanation, better positioning, cleaner structure, or a different next move.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SCAN_SIGNALS.map((item) => (
                  <GuideTile key={item.label} label={item.label} value={item.copy} />
                ))}
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-cyan-300/16 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Best use
                </p>
                <p className="mt-2 text-sm leading-7 text-white">
                  Start here when the business feels better than the current online read but the next fix is still unclear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-14">
        <div className="max-w-3xl">
          <TopChip>What you get</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            A stronger first read. A cleaner next move.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            The scan is designed to help the customer stop wandering, stop guessing, and stop buying the wrong thing first.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {SCAN_OUTCOMES.map((item, index) => (
            <BenefitCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-14 grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Why this page is focused</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The homepage has one job: get the right customer into the free scan.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            This page does not try to sell every layer at once. It exists to drive one clear decision at the highest level: start with the free scan first.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InsightCard label="What it avoids" value="Wrong-package purchases" />
            <InsightCard label="What it improves" value="Clarity before spend" />
            <InsightCard label="What it protects" value="Time, money, and trust" />
            <InsightCard label="What comes after" value="Only the right next step" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
          {FAQS.map((item, index) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-14">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best next move</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start the free scan.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
            If the business needs more depth after that, you will know more clearly what the next step should be.
          </p>
          <div className="mt-8">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start free scan
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
      <div className="absolute -right-8 top-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
      {children}
    </div>
  );
}

function GuideTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.2rem] px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}

function MiniTrustCard({ value, highlighted = false }: { value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.2rem] px-4 py-4" : "system-surface rounded-[1.2rem] px-4 py-4"}>
      <p className="text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}

function BenefitCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.75rem] p-6" : "system-surface rounded-[1.75rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function InsightCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.25rem] px-4 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function FaqCard({ question, answer, highlighted = false }: { question: string; answer: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-5" : "system-surface rounded-[1.7rem] p-5"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
