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
    "Start the Cendorq free scan and find what is making people hesitate, compare, leave, or choose someone else before spending more.",
  path: "/",
  keywords: [
    "cendorq free scan",
    "search presence scan",
    "business visibility scan",
    "website trust scan",
    "business clarity scan",
    "ai search visibility",
    "answer engine visibility",
  ],
  image: {
    alt: "Cendorq free search presence scan homepage.",
  },
});

const HERO_POINTS = [
  "Free guided scan",
  "Built to expose hesitation",
  "Clear next move",
] as const;

const DECISION_BREAKS = [
  {
    title: "They do not understand fast enough",
    copy:
      "If the business takes work to understand, people leave before they ever see the value.",
  },
  {
    title: "They do not trust fast enough",
    copy:
      "If the page does not feel clear, strong, and believable, even good customers hesitate.",
  },
  {
    title: "They choose the easier option",
    copy:
      "If a competitor feels safer, clearer, or simpler, the better business can still lose the decision.",
  },
] as const;

const SCAN_STEPS = [
  {
    label: "01",
    title: "Show the business",
    copy: "Name the website, location, category, and offer so the scan starts with the real thing customers see.",
  },
  {
    label: "02",
    title: "Name the pressure",
    copy: "Tell us what feels weak: low calls, weak trust, poor bookings, confusion, or people choosing competitors.",
  },
  {
    label: "03",
    title: "Get the first read",
    copy: "The scan helps reveal what may be blocking trust, clarity, and action before you spend more.",
  },
] as const;

const FAQS = [
  {
    question: "Who should start here?",
    answer:
      "Start here if the business looks better in real life than it feels online, or if people are visiting but not choosing you fast enough.",
  },
  {
    question: "What does the free scan help with?",
    answer:
      "It helps spot what may be hurting the decision: unclear words, weak trust, confusing offers, poor flow, or competitors feeling easier to choose.",
  },
  {
    question: "Why not start with the paid work?",
    answer:
      "Because the wrong fix wastes money. The free scan helps find the first problem before deeper work is chosen.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A focused conversion funnel that sends businesses into a guided free scan before deeper work is chosen.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A guided free scan that helps businesses find what may be making people hesitate, leave, compare, or choose someone else.",
    path: "/",
    serviceType: "Free Search Presence Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-7 text-white sm:px-6 md:py-9 xl:py-10">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <TopChip>{CATEGORY_LINE}</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.85rem]">
            Find what is making people hesitate before they choose you.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} gives your business a free guided scan that helps reveal why people may be confused, unsure, comparing you away, or leaving before they act.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start free scan
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              The safest first move before paying for deeper strategy, rebuilds, or ongoing support.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {HERO_POINTS.map((item) => (
              <ProofPill key={item}>{item}</ProofPill>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2.25rem] bg-cyan-400/10 blur-3xl" />
          <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-5 shadow-[0_30px_100px_rgba(8,47,73,0.24)] sm:p-7 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.1),transparent_30%)]" />
            <div className="system-grid-wide absolute inset-0 opacity-[0.06]" />
            <div className="relative z-10">
              <TopChip>What the scan exposes</TopChip>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                The problem is not always traffic. Often, it is the split-second decision people make before they contact you.
              </h2>

              <div className="mt-6 grid gap-3">
                {DECISION_BREAKS.map((item) => (
                  <ProblemCard key={item.title} title={item.title} copy={item.copy} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <TopChip>Guided, not overwhelming</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            A high-level scan broken into simple steps.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            The scan does not throw a wall of fields at people. It guides the right customer through the right questions so the first read is easier to finish and more useful.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {SCAN_STEPS.map((item) => (
            <StepCard key={item.label} label={item.label} title={item.title} copy={item.copy} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Why start here</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Before the business spends more, it needs to know what is making people pause.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            The free scan is not a weak offer. It is the smartest first move for a serious business that wants to stop guessing, avoid the wrong fix, and choose the next step with more confidence.
          </p>
          <div className="mt-7">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start free scan
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {FAQS.map((item) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} />
          ))}
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
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
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
  return (
    <div className="system-surface rounded-full px-4 py-2 text-sm font-semibold text-slate-200">
      {children}
    </div>
  );
}

function ProblemCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 transition duration-200 hover:border-cyan-300/20 hover:bg-white/[0.06] sm:p-5">
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function StepCard({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.6rem] p-5 transition duration-200 hover:border-cyan-300/18 hover:bg-white/[0.05]">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.5rem] p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
