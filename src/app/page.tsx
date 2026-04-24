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
  title: "Search Presence OS",
  description:
    "Cendorq helps businesses become the strongest answer across evolving search through stronger signal, sharper strategy, stronger infrastructure, and stronger ongoing command.",
  path: "/",
  keywords: [
    "cendorq homepage",
    "search presence os",
    "ai search visibility",
    "answer engine visibility",
    "search presence strategy",
    "search presence scan",
    "visibility blueprint",
    "presence infrastructure",
    "presence command",
  ],
  image: {
    alt: "Cendorq homepage — Search Presence OS for businesses that need to become the strongest answer across evolving search.",
  },
});

const HERO_READOUTS = [
  {
    label: "Best first move",
    value: "Search Presence Scan",
  },
  {
    label: "Core strategy layer",
    value: "Visibility Blueprint",
  },
  {
    label: "Implementation layer",
    value: "Presence Infrastructure",
  },
  {
    label: "Continuity layer",
    value: "Presence Command",
  },
] as const;

const CORE_POINTS = [
  {
    title: "This is not generic marketing polish.",
    copy:
      "Cendorq is built to help the business become the strongest answer across evolving search, recommendation, and comparison environments, not just look busier online.",
  },
  {
    title: "The sequence is the product.",
    copy:
      "First signal, then explanation, then concentrated strengthening, then recurring command. That order is how the platform protects businesses from buying the wrong depth too early.",
  },
  {
    title: "Decision quality comes before heavier force.",
    copy:
      "The strongest move is not always the biggest-looking one. It is the next layer that matches the business's actual stage of clarity, readiness, and continuity need.",
  },
] as const;

const LAYER_PREVIEWS = [
  {
    eyebrow: "Layer 01",
    title: "Search Presence Scan",
    copy:
      "The first serious signal layer for businesses that need a cleaner read before they spend deeper.",
    outcome: "Clarifies what feels weak before the wrong fix gets chosen.",
    href: "/free-check",
    cta: "Start Search Presence Scan",
    highlighted: true,
  },
  {
    eyebrow: "Layer 02",
    title: "Visibility Blueprint",
    copy:
      "The deeper explanation layer for businesses that already know first signal alone is not enough.",
    outcome: "Explains what is weakening visibility, preference, and response.",
    href: "/pricing/full-diagnosis",
    cta: "View Visibility Blueprint",
  },
  {
    eyebrow: "Layer 03",
    title: "Presence Infrastructure",
    copy:
      "The concentrated strengthening layer for businesses that are already clear enough to build with force.",
    outcome: "Strengthens the structural visibility foundation instead of reinforcing guesswork.",
    href: "/pricing/optimization",
    cta: "View Presence Infrastructure",
  },
  {
    eyebrow: "Layer 04",
    title: "Presence Command",
    copy:
      "The recurring continuity layer for businesses that need compounding strategic control over time.",
    outcome: "Maintains, adapts, and compounds a path that is already clear enough to run.",
    href: "/pricing/monthly-partner",
    cta: "View Presence Command",
  },
] as const;

const PRESSURE_SIGNALS = [
  {
    title: "People find you but still do not trust you enough.",
    copy:
      "The business may be visible, but not yet credible, differentiated, or preference-worthy at the moment comparison happens.",
  },
  {
    title: "People do not understand the offer fast enough.",
    copy:
      "The business may know what it does, but the market may still be reading a weaker or slower version of that truth.",
  },
  {
    title: "You keep doing more without getting clearer.",
    copy:
      "That usually means the business is adding force before the sequence is properly solved.",
  },
] as const;

const FAQS = [
  {
    question: "What is Cendorq in simple terms?",
    answer:
      "Cendorq is a search-presence operating system built to help businesses become the strongest answer across evolving search environments by improving signal, strategy, structure, and continuity in the right order.",
  },
  {
    question: "Where should most businesses start?",
    answer:
      "Most businesses should start with Search Presence Scan because it creates a cleaner first signal before deeper strategy, implementation, or recurring command is chosen.",
  },
  {
    question: "Why not jump straight to the deepest layer?",
    answer:
      "Because a heavier-looking layer is not automatically the stronger one. If the business is still unclear, deeper force can reinforce the wrong assumption faster.",
  },
  {
    question: "What is the point of the full system path?",
    answer:
      "The system path exists to improve decision quality at every stage so the business can move deeper only when the previous layer has done enough to justify the next one.",
  },
] as const;

const NEXT_STEPS = [
  {
    title: "Start with signal",
    copy:
      "Use Search Presence Scan when the business still needs the cleanest first read before spending deeper.",
    href: "/free-check",
    cta: "Start Search Presence Scan",
    highlighted: true,
  },
  {
    title: "Learn the sequence",
    copy:
      "Use Diagnosis when the business needs to understand how the system path works before choosing the wrong layer.",
    href: "/diagnosis",
    cta: "See how it works",
  },
  {
    title: "Compare all four layers",
    copy:
      "Use System Layers when the business needs a side-by-side decision view across the entire Cendorq path.",
    href: "/pricing",
    cta: "Compare system layers",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: `${BRAND_NAME} Search Presence OS`,
    description:
      "Search Presence OS for businesses that need to become the strongest answer across evolving search.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: `${BRAND_NAME} Search Presence OS`,
    description:
      "A structured system for strengthening signal, strategy, infrastructure, and continuity across evolving search environments.",
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
          <span className="text-cyan-100">Home</span>
        </div>
      </section>

      <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <div>
          <TopChip>Search Presence OS</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Become the strongest answer
            <span className="system-gradient-text block">
              before the market decides for you.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} helps businesses strengthen signal, strategy, infrastructure, and ongoing command so they can become and remain the answer customers and search systems trust first.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This is not about doing more random marketing. It is about reading the business correctly, choosing the right layer at the right time, and building a cleaner path that can actually compound.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AuthorityPill>Signal before force</AuthorityPill>
            <AuthorityPill>Explanation before build</AuthorityPill>
            <AuthorityPill>Continuity after clarity</AuthorityPill>
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
            <p className="system-eyebrow">What Cendorq is really doing</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              It helps the business choose the correct next move before deeper pressure begins.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              The strongest path is not the loudest one. It is the one that matches the actual stage of the business, improves decision quality first, and reduces waste caused by buying the wrong depth too early.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <GuideTile label="Primary objective" value="Improve decision quality before heavier commitment" />
              <GuideTile label="Main protection" value="Prevent the wrong layer from looking like the right one" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <TopChip>Platform posture</TopChip>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Read the business clearly before prescribing stronger pressure.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  The Cendorq path starts with first signal, deepens into explanation, strengthens the highest-priority structural layers, and only then moves into ongoing command when continuity is justified.
                </p>
              </div>

              <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">
                {HERO_READOUTS.map((item, index) => (
                  <ReadoutTile
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    highlighted={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                <span>System rule</span>
                <span>Sequence before escalation</span>
              </div>
              <div className="system-status-bar mt-2 h-2">
                <span style={{ width: "88%" }} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CORE_POINTS.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>System layers</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Four layers. Four different responsibilities. One cleaner path.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {LAYER_PREVIEWS.map((item) => (
            <LayerPreviewCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Why businesses come here</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Most businesses do not need more random effort. They need a cleaner read.
          </h2>
          <div className="mt-8 grid gap-4">
            {PRESSURE_SIGNALS.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {NEXT_STEPS.map((item, index) => (
            <NextMoveCard key={item.title} {...item} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>Practical questions</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The system gets stronger when the real questions are answered directly.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
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
            The strongest first move for most businesses is still Search Presence Scan. That creates a cleaner first signal, lowers the chance of mis-sequencing, and gives the platform a more trustworthy basis for the next decision.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start Search Presence Scan
            </Link>
            <Link
              href="/diagnosis"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              See how the system works
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
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
      {children}
    </div>
  );
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

function ReadoutTile({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.3rem] p-4" : "system-surface rounded-[1.3rem] p-4"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-base font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function ReasonCard({
  title,
  copy,
  highlighted = false,
}: {
  title: string;
  copy: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function LayerPreviewCard({
  eyebrow,
  title,
  copy,
  outcome,
  href,
  cta,
  highlighted = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  outcome: string;
  href: string;
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.85rem] p-6 sm:p-7" : "system-surface rounded-[1.85rem] p-6 sm:p-7"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
      <div className="system-surface mt-5 rounded-[1.15rem] p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Primary outcome</div>
        <div className="mt-2 text-sm leading-7 text-slate-200">{outcome}</div>
      </div>
      <div className="mt-6">
        <Link
          href={href}
          className={highlighted ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}

function FaqCard({
  question,
  answer,
  highlighted = false,
}: {
  question: string;
  answer: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-5" : "system-surface rounded-[1.7rem] p-5"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}

function NextMoveCard({
  title,
  copy,
  href,
  cta,
  highlighted = false,
}: {
  title: string;
  copy: string;
  href: string;
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.8rem] p-6" : "system-surface rounded-[1.8rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
      <div className="mt-6">
        <Link
          href={href}
          className={highlighted ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
