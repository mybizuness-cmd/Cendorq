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
    "Cendorq is a protected business command system for finding why customers hesitate, compare, leave, or choose someone else, then turning that truth into the right next move.",
  path: "/",
  keywords: [
    "cendorq",
    "business command intelligence",
    "business decision intelligence",
    "customer hesitation analysis",
    "business clarity system",
    "website trust analysis",
    "conversion decision system",
    "ai search visibility",
    "answer engine visibility",
    "free business scan",
  ],
  image: {
    alt: "Cendorq business command intelligence homepage.",
  },
});

const HERO_POINTS = [
  "Command first",
  "Truth before spend",
  "Protected customer platform",
  "Clear next move",
] as const;

const FRONT_DOOR_SNAPSHOT = [
  { label: "Identity", value: "Command system", detail: "Cendorq leads with business command intelligence, not a disposable scan tool." },
  { label: "Starting point", value: "Free Scan", detail: "A safe first-read entry into the wider Cendorq command platform." },
  { label: "Core question", value: "Why are they not choosing?", detail: "Clarity, trust, choice, and action are reviewed together." },
  { label: "Next path", value: "Review, fix, or control", detail: "The next step should match the business stage and evidence." },
] as const;

const COMMAND_TRUST_BAR = [
  "Category-command posture",
  "Diagnosis before spend",
  "Protected result handoff",
  "Dashboard-owned journey",
] as const;

const EXECUTIVE_COMMAND_STANDARD = [
  {
    title: "Every pixel must earn trust",
    copy: "The page should feel deliberate, calm, protected, and above ordinary website tools from the first screen.",
  },
  {
    title: "Every claim must stay bounded",
    copy: "Cendorq can be confident without pretending to guarantee revenue, security, inbox placement, or business outcomes.",
  },
  {
    title: "Every action must be obvious",
    copy: "The customer should understand where to start, why it matters, and how the protected dashboard journey continues.",
  },
] as const;

const COMMAND_CENTER_FLOW = [
  {
    title: "Verify to view",
    copy: "Protected results stay behind email confirmation and safe release instead of being exposed on the public page.",
  },
  {
    title: "Report vault",
    copy: "Approved reports, limitations, confidence labels, and next actions live inside the protected report vault.",
  },
  {
    title: "Dashboard inbox",
    copy: "Command-center messages, support status, billing reminders, and plan nudges use one safe next action.",
  },
  {
    title: "Plan ladder",
    copy: "Free Scan, Deep Review, Build Fix, and Ongoing Control stay distinct so paid deliverables do not blur together.",
  },
] as const;

const PLAN_LADDER = [
  { title: "Free Scan", copy: "A protected first-read report that identifies the first visible decision friction." },
  { title: "Deep Review", copy: "A paid full diagnostic with stronger intake, evidence separation, confidence labels, and limitations." },
  { title: "Build Fix", copy: "Scoped implementation work with approval checkpoints, before-after evidence, and safe progress summaries." },
  { title: "Ongoing Control", copy: "Monthly command-center review, controlled monitoring, inbox messages, and plan-fit guidance." },
] as const;

const DECISION_BREAKS = [
  {
    title: "They do not get it",
    copy:
      "If the offer takes too much work to understand, people leave before they see why you are worth choosing.",
  },
  {
    title: "They do not trust it",
    copy:
      "If the page feels thin, vague, outdated, or unsupported, good customers pause and keep looking.",
  },
  {
    title: "They choose the easier business",
    copy:
      "If a competitor feels clearer, safer, or faster to act on, they can win even when you are better.",
  },
] as const;

const CENDORQ_SYSTEM_LAYERS = [
  { title: "Clarity layer", copy: "Can a customer understand the offer quickly and confidently?" },
  { title: "Trust layer", copy: "Does the business feel real, safe, supported, and worth contacting?" },
  { title: "Choice layer", copy: "Does the customer have enough proof to choose this business over alternatives?" },
  { title: "Action layer", copy: "Is the next step obvious, low-friction, and aligned with the customer’s intent?" },
] as const;

const BUSINESS_MODEL_COVERAGE = [
  "Local businesses",
  "Service providers",
  "Appointment and booking businesses",
  "Digital products",
  "Creator and social channels",
  "Marketplaces and platform revenue",
] as const;

const SCAN_STEPS = [
  {
    label: "01",
    title: "Show the business",
    copy: "Website, location, category, and offer. The real things customers judge first.",
  },
  {
    label: "02",
    title: "Name the pressure",
    copy: "Low calls, weak bookings, poor trust, confusion, or competitors getting picked instead.",
  },
  {
    label: "03",
    title: "Get the first direction",
    copy: "See where the decision may be breaking before paying for deeper work.",
  },
] as const;

const TRUST_RULES = [
  "No fake urgency",
  "No unsupported ROI claims",
  "No promise of guaranteed business results",
  "No pressure to buy before the first direction is clear",
] as const;

const PUBLIC_ENTRY_RULES = [
  "The homepage establishes Cendorq as the command system; Free Scan is the protected entry path.",
  "The full scan stays on /free-check so the intake, recovery, and handoff stay focused.",
  "The soft prompt appears after time or intent, not instantly as an aggressive interruption.",
  "Public copy must not expose raw payloads, secrets, private report internals, or customer data.",
  "Conversion must come from clarity, proof, stage fit, and trust — not dark patterns or guaranteed outcomes.",
  "Verify-to-view keeps protected results in the dashboard/report vault, not on the public homepage.",
  "Dashboard inbox messages support the command center; external email remains required for confirmation and lifecycle delivery.",
] as const;

const FAQS = [
  {
    question: "What is Cendorq?",
    answer:
      "Cendorq is a business command intelligence system. It helps owners see why customers may hesitate, compare, leave, or choose someone else, then guides the next move through a protected customer platform.",
  },
  {
    question: "Who should start here?",
    answer:
      "Start here if the business is good, but the website, search presence, or customer path is not making people choose fast enough.",
  },
  {
    question: "What does the free scan look for?",
    answer:
      "It looks for the simple things that cost decisions: unclear words, weak trust, confusing offers, poor flow, missing proof, or competitors feeling easier to choose.",
  },
  {
    question: "Why not start with paid work?",
    answer:
      "Because guessing is expensive. The free scan helps find the first pressure point before you pay for deeper review, fixes, or ongoing control.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Business Command Intelligence",
    description:
      "A protected business command system for finding why customers hesitate, compare, leave, or choose someone else, then guiding the right next move.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Business Command Intelligence",
    description:
      "A command-first customer platform that begins with a Free Scan and connects diagnosis, protected reports, dashboard guidance, billing, support, and plan decisions.",
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

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <TopChip>{CATEGORY_LINE}</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.85rem]">
            The command system for why customers hesitate, compare, and choose someone else.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} is built for owners who need more than a prettier page. It connects diagnosis, protected reports, dashboard guidance, notifications, billing, support, and plan decisions into one customer command platform.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Enter the command path
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Start with the Free Scan, then move through the protected dashboard, report vault, inbox, support, billing, and plan ladder without losing the thread.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {HERO_POINTS.map((item) => (
              <ProofPill key={item}>{item}</ProofPill>
            ))}
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Command public entry trust bar">
            {COMMAND_TRUST_BAR.map((item) => (
              <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-50">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2.25rem] bg-cyan-400/10 blur-3xl" />
          <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-5 shadow-[0_30px_100px_rgba(8,47,73,0.24)] sm:p-7 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.1),transparent_30%)]" />
            <div className="system-grid-wide absolute inset-0 opacity-[0.06]" />
            <div className="relative z-10">
              <TopChip>Command standard</TopChip>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                The first screen has to make the business feel handled before the customer reads the second section.
              </h2>

              <div className="mt-6 grid gap-3">
                {EXECUTIVE_COMMAND_STANDARD.map((item) => (
                  <ProblemCard key={item.title} title={item.title} copy={item.copy} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Public website operating snapshot">
        {FRONT_DOOR_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-12 grid gap-4 lg:grid-cols-4" aria-label="Cendorq command center flow">
        {COMMAND_CENTER_FLOW.map((item) => (
          <article key={item.title} className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <h2 className="text-lg font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-12 grid gap-4 lg:grid-cols-4" aria-label="Cendorq system layers">
        {CENDORQ_SYSTEM_LAYERS.map((item) => (
          <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <TopChip>Simple on purpose</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Answer a few plain questions. Get a sharper first read.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            No maze. No bloated audit. The scan collects the details that help reveal where trust, clarity, and action may be breaking.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {SCAN_STEPS.map((item) => (
            <StepCard key={item.label} label={item.label} title={item.title} copy={item.copy} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8" aria-label="Cendorq plan ladder">
        <div className="max-w-3xl">
          <TopChip>Plan ladder</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start small, then choose the right depth.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Cendorq keeps each plan distinct: first read, deeper diagnosis, scoped implementation, and monthly control. The next step is explained through evidence and readiness, not pressure.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_LADDER.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5">
              <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Before you spend more</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Know what is costing the decision first.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Cendorq is built for business owners who do not want another guess. Start with the scan, find the pressure, then choose the right depth: review, fix, or ongoing control.
          </p>
          <div className="mt-7">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Start free scan
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="system-surface rounded-[1.5rem] p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">Built for more than one revenue path.</h3>
            <div className="mt-4 grid gap-2">
              {BUSINESS_MODEL_COVERAGE.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="system-surface rounded-[1.5rem] p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">Public entry safety rules.</h3>
            <div className="mt-4 grid gap-2">
              {PUBLIC_ENTRY_RULES.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="system-surface rounded-[1.5rem] p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">Trust rules stay visible.</h3>
            <div className="mt-4 grid gap-2">
              {TRUST_RULES.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </article>
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
