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
  title: "Become the strongest answer across evolving search",
  description:
    "Cendorq helps businesses strengthen signal, strategy, infrastructure, and continuity so they can become and remain the strongest answer across evolving search.",
  path: "/",
  keywords: [
    "cendorq homepage",
    "search presence os",
    "search presence scan",
    "visibility blueprint",
    "presence infrastructure",
    "presence command",
    "ai search visibility",
    "answer engine visibility",
  ],
  image: {
    alt: "Cendorq homepage - Search Presence OS for businesses that need to become and remain the strongest answer across evolving search.",
  },
});

const HERO_READOUTS = [
  { label: "Entry layer", value: "Search Presence Scan" },
  { label: "Strategy layer", value: "Visibility Blueprint" },
  { label: "Build layer", value: "Presence Infrastructure" },
  { label: "Continuity layer", value: "Presence Command" },
] as const;

const CORE_PROMISES = [
  {
    title: "Cendorq is not a vague marketing promise.",
    copy:
      "It is a search-presence decision system built to help a business become easier to understand, easier to trust, easier to prefer, and harder to replace across evolving search environments.",
  },
  {
    title: "The sequence is part of the product.",
    copy:
      "Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command do different jobs. The route is stronger when a business enters the right layer at the right time instead of jumping into the loudest-looking one.",
  },
  {
    title: "Decision quality comes before heavier spend.",
    copy:
      "The strongest next move is not always the deepest one. The strongest next move is the layer that matches the business's real stage of clarity, readiness, and continuity need.",
  },
] as const;

const SYSTEM_LAYERS = [
  {
    eyebrow: "Layer 01",
    title: "Search Presence Scan",
    strap: "First serious signal",
    copy:
      "The structured entry layer for businesses that need a stronger first read before deeper pressure gets applied.",
    bestFor:
      "Businesses that know something feels weak but still need the cleanest first interpretation before they pay for deeper depth.",
    outcome:
      "Creates a stronger first signal and reduces the chance of wasting money on the wrong next move.",
    href: "/free-check",
    cta: "Start Search Presence Scan",
    highlighted: true,
  },
  {
    eyebrow: "Layer 02",
    title: "Visibility Blueprint",
    strap: "Strategic explanation",
    copy:
      "The deeper explanation layer for businesses that need clearer reasoning about what is weakening visibility, trust, preference, and response.",
    bestFor:
      "Businesses that already know the problem is serious enough that first signal alone is not enough anymore.",
    outcome:
      "Improves strategic clarity before concentrated strengthening begins.",
    href: "/pricing/full-diagnosis",
    cta: "View Visibility Blueprint",
  },
  {
    eyebrow: "Layer 03",
    title: "Presence Infrastructure",
    strap: "Concentrated strengthening",
    copy:
      "The structural strengthening layer for businesses that already know what deserves focused implementation work.",
    bestFor:
      "Businesses with enough clarity to strengthen specific structural systems instead of staying trapped in vague effort.",
    outcome:
      "Builds a stronger visibility foundation instead of reinforcing guesswork.",
    href: "/pricing/optimization",
    cta: "View Presence Infrastructure",
  },
  {
    eyebrow: "Layer 04",
    title: "Presence Command",
    strap: "Recurring continuity",
    copy:
      "The recurring operating layer for businesses ready to compound through monitoring, adaptation, and ongoing strategic control.",
    bestFor:
      "Businesses that are already clear enough to benefit from continuity rather than more early-stage interpretation.",
    outcome:
      "Maintains, adapts, and compounds a path that is already strong enough to operate over time.",
    href: "/pricing/monthly-partner",
    cta: "View Presence Command",
  },
] as const;

const DECISION_RULES = [
  {
    title: "Start with Search Presence Scan",
    copy:
      "when the business still needs a cleaner first read before strategy or implementation depth is justified.",
  },
  {
    title: "Move into Visibility Blueprint",
    copy:
      "when the business already knows first signal is not enough and needs a deeper explanation of what is suppressing visibility and response.",
  },
  {
    title: "Use Presence Infrastructure",
    copy:
      "when the path is already clear enough that concentrated structural strengthening is the real next move.",
  },
  {
    title: "Use Presence Command",
    copy:
      "when the business is already clear enough to benefit from recurring continuity instead of more early-stage interpretation.",
  },
] as const;

const TRUST_BOUNDARIES = [
  {
    label: "No fake certainty",
    value:
      "Cendorq improves decision quality, structural strength, and search-presence control. It does not promise guaranteed rankings, guaranteed leads, or guaranteed revenue.",
  },
  {
    label: "No random escalation",
    value:
      "The system is intentionally sequenced to reduce waste created by entering the wrong depth too early.",
  },
  {
    label: "No vague bundle logic",
    value:
      "Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command stay distinct because each layer has a different job.",
  },
] as const;

const FAQS = [
  {
    question: "What is Cendorq in plain English?",
    answer:
      "Cendorq is a search-presence operating system that helps a business become easier to trust, easier to understand, easier to prefer, and more likely to be treated as the strongest answer across evolving search.",
  },
  {
    question: "Where should most businesses start?",
    answer:
      "Most businesses should start with Search Presence Scan because it creates a stronger first signal before deeper strategic or implementation layers are chosen.",
  },
  {
    question: "Why not jump straight to the biggest-looking layer?",
    answer:
      "Because a deeper layer only becomes stronger when the business has earned the clarity needed to use it well. Entering the wrong depth too early usually creates waste, confusion, or misdirected effort.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq",
    description:
      "Cendorq helps businesses become and remain the strongest answer across evolving search through stronger signal, sharper strategy, stronger infrastructure, and stronger continuity.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Search Presence OS",
    description:
      "A structured search-presence system that helps businesses strengthen signal, explanation, infrastructure, and recurring command across evolving search.",
    path: "/",
    serviceType: "Search Presence OS",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 border-b border-white/8 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">{BRAND_NAME}</span>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{CATEGORY_LINE}</span>
          <span className="text-white/20">/</span>
          <span className="text-cyan-100">Homepage</span>
        </div>
      </section>

      <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
        <div>
          <TopChip>Search Presence OS</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Become the strongest answer
            <span className="system-gradient-text block">across evolving search.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq helps businesses strengthen signal, strategy, infrastructure, and continuity so they can become easier to trust, easier to prefer, and harder to replace across evolving search environments.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This is not generic marketing help. It is a controlled search-presence system designed to improve the quality of the next decision before heavier action is chosen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AuthorityPill>Signal before force</AuthorityPill>
            <AuthorityPill>Explanation before build</AuthorityPill>
            <AuthorityPill>Right layer, right time</AuthorityPill>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start Search Presence Scan
            </Link>
            <Link
              href="/pricing"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Compare system layers
            </Link>
          </div>

          <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
            <p className="system-eyebrow">What this homepage should do</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Make the whole system legible before the business enters the wrong layer.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              The homepage should help a serious business understand what Cendorq is, why the sequence matters, what each layer is responsible for, and where to begin without creating false urgency or vague promises.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <GuideTile label="Primary objective" value="Clarify the system before deeper commitment" />
              <GuideTile label="Main failure avoided" value="Entering the wrong depth too early" />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6 md:p-7">
            <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />
            <div className="system-scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <div className="relative z-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    System route active
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    The route is strongest when each layer keeps its job clear.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    Search Presence Scan creates first signal. Visibility Blueprint deepens explanation. Presence Infrastructure strengthens what already deserves concentrated work. Presence Command compounds through recurring continuity.
                  </p>
                </div>

                <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">
                  {HERO_READOUTS.map((item, index) => (
                    <ReadoutTile key={item.label} label={item.label} value={item.value} highlighted={index === 0} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                  <span>Sequence posture</span>
                  <span>Decision quality before escalation</span>
                </div>
                <div className="system-status-bar mt-2 h-2">
                  <span style={{ width: "91%" }} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {CORE_PROMISES.map((item, index) => (
                  <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>System layers</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Four layers. Four different responsibilities. One stronger system.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {SYSTEM_LAYERS.map((item, index) => (
            <LayerCardView
              key={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              strap={item.strap}
              copy={item.copy}
              bestFor={item.bestFor}
              outcome={item.outcome}
              href={item.href}
              cta={item.cta}
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Decision rules</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The strongest next move usually becomes clear when the business asks the right stage question.
          </h2>
          <div className="mt-8 grid gap-4">
            {DECISION_RULES.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {TRUST_BOUNDARIES.map((item, index) => (
            <TrustTile key={item.label} label={item.label} value={item.value} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>Practical questions</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The system becomes easier to trust when the main questions are answered clearly.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FAQS.map((item, index) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best next move</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start with Search Presence Scan unless the business already clearly needs deeper explanation.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            Most businesses should begin with the first serious signal layer. That keeps the path clean, improves the quality of the next decision, and reduces the chance of paying for the wrong kind of depth too early.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start Search Presence Scan
            </Link>
            <Link href="/diagnosis" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              See how it works
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
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">{children}</div>;
}

function AuthorityPill({ children }: { children: ReactNode }) {
  return <div className="system-tag-strong rounded-full px-4 py-2 text-sm">{children}</div>;
}

function GuideTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.2rem] px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function ReadoutTile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.3rem] p-4" : "system-surface rounded-[1.3rem] p-4"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-base font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function ReasonCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function LayerCardView({ eyebrow, title, strap, copy, bestFor, outcome, href, cta, highlighted = false }: { eyebrow: string; title: string; strap: string; copy: string; bestFor: string; outcome: string; href: string; cta: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.85rem] p-6 sm:p-7" : "system-surface rounded-[1.85rem] p-6 sm:p-7"}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{strap}</div>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
      <div className="mt-5 grid gap-3">
        <DetailPanel label="Best for" value={bestFor} />
        <DetailPanel label="Primary outcome" value={outcome} />
      </div>
      <div className="mt-6">
        <Link href={href} className={highlighted ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}>
          {cta}
        </Link>
      </div>
    </article>
  );
}

function DetailPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.1rem] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-7 text-slate-200">{value}</div>
    </div>
  );
}

function TrustTile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.45rem] p-5" : "system-surface rounded-[1.45rem] p-5"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-white">{value}</div>
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
