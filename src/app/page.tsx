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
  title: "Become the strongest answer customers and search systems trust first",
  description:
    "Cendorq helps businesses strengthen visibility, trust, positioning, and response through a clear system: Free Search Presence Snapshot, Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.",
  path: "/",
  keywords: [
    "cendorq homepage",
    "search presence os",
    "answer presence",
    "search presence snapshot",
    "search presence scan",
    "visibility blueprint",
    "presence infrastructure",
    "presence command",
    "ai search visibility",
    "answer engine visibility",
  ],
  image: {
    alt: "Cendorq homepage — a clear Search Presence OS that helps businesses become the strongest answer customers and search systems trust first.",
  },
});

const HERO_READOUTS = [
  { label: "Start here", value: "Free Search Presence Snapshot" },
  { label: "Paid first step", value: "Search Presence Scan" },
  { label: "Flagship strategy", value: "Visibility Blueprint" },
  { label: "Long-term layer", value: "Presence Command" },
] as const;

const PROBLEM_BLOCKS = [
  {
    title: "Customers do not trust what they do not understand quickly.",
    copy:
      "Many businesses are stronger than they look, but their website, positioning, proof, and structure do not help customers understand that fast enough.",
  },
  {
    title: "Search systems cannot favor what the business has not made clear enough.",
    copy:
      "If the business is hard to classify, hard to trust, or hard to compare favorably, stronger visibility usually becomes harder instead of easier.",
  },
  {
    title: "The wrong next move can waste months.",
    copy:
      "A business can easily spend on more activity, more redesign, or more optimization before it has a clear read on what is actually weakening visibility and response.",
  },
] as const;

const SYSTEM_LAYERS = [
  {
    eyebrow: "Free entry",
    title: "Search Presence Snapshot",
    strap: "Fast first signal",
    price: "Free",
    copy:
      "A fast first look that helps the business understand whether the real problem is trust, clarity, positioning, action friction, or broader visibility weakness.",
    bestFor:
      "Businesses that want a serious first signal before they commit to paid diagnostic depth.",
    outcome:
      "A clearer first direction and a recommendation on whether the next move should be Search Presence Scan.",
    href: "/free-check",
    cta: "Start Free Snapshot",
    highlighted: true,
  },
  {
    eyebrow: "Paid layer 01",
    title: "Search Presence Scan",
    strap: "First serious read",
    price: "$195",
    copy:
      "A paid first diagnostic that helps the business understand what is most likely weakening visibility, trust, positioning, and response before bigger money is spent.",
    bestFor:
      "Businesses that know something feels weak but still need the clearest first explanation before they choose deeper strategy or implementation.",
    outcome:
      "A structured first report and a clean recommendation on whether to stay light or move into Visibility Blueprint.",
    href: "/pricing",
    cta: "See pricing and scope",
  },
  {
    eyebrow: "Paid layer 02",
    title: "Visibility Blueprint",
    strap: "Flagship strategy",
    price: "$2,500",
    copy:
      "A deeper strategic explanation of what is really holding the business back and what deserves attention first.",
    bestFor:
      "Businesses that already know first signal is not enough and need a real answer before they make bigger changes.",
    outcome:
      "A clear issue map, stronger priorities, and a smarter next-step plan before concentrated work begins.",
    href: "/pricing/full-diagnosis",
    cta: "View Visibility Blueprint",
  },
  {
    eyebrow: "Paid layer 03",
    title: "Presence Infrastructure",
    strap: "Structural strengthening",
    price: "From $6,000",
    copy:
      "The build layer that strengthens the parts of the business that need to become easier to understand, trust, and choose.",
    bestFor:
      "Businesses that already know what needs to be fixed and are ready for concentrated structural work.",
    outcome:
      "A stronger website, offer structure, trust architecture, and answer-readiness foundation.",
    href: "/pricing/optimization",
    cta: "View Presence Infrastructure",
  },
  {
    eyebrow: "Paid layer 04",
    title: "Presence Command",
    strap: "Ongoing control",
    price: "From $2,500/mo",
    copy:
      "The recurring layer for businesses that need monitoring, refinement, and strategic continuity as search and AI environments keep changing.",
    bestFor:
      "Businesses that already know the direction and now need ongoing control rather than another early-stage diagnosis.",
    outcome:
      "Long-term consistency, stronger adaptation, and cleaner operational discipline over time.",
    href: "/pricing/monthly-partner",
    cta: "View Presence Command",
  },
] as const;

const WHY_SEQUENCE_MATTERS = [
  {
    title: "The system is designed to stop customers from buying the wrong depth too early.",
    copy:
      "The strongest layer is not the biggest-looking one. It is the layer that matches how clear the business already is today.",
  },
  {
    title: "The best next move changes as the business becomes clearer.",
    copy:
      "Some businesses need first signal. Some need deeper strategy. Some need structural work. Some need ongoing command. The sequence protects all four.",
  },
  {
    title: "Decision quality comes before heavier spend.",
    copy:
      "Cendorq is built to help the business make better decisions before it commits to bigger work, bigger budgets, or recurring support.",
  },
] as const;

const TRUST_BOUNDARIES = [
  {
    label: "No fake guarantees",
    value:
      "Cendorq helps customers make stronger visibility decisions. It does not promise guaranteed rankings, guaranteed leads, or guaranteed revenue.",
  },
  {
    label: "Clear pricing ladder",
    value:
      "The system stays easier to understand when every stage has a clear role, clear reason, and clear price range.",
  },
  {
    label: "Customers understand the route inside out",
    value:
      "The homepage should make it obvious where to start, what each stage does, and what happens next without overwhelming the customer.",
  },
] as const;

const FAQS = [
  {
    question: "What is Cendorq in plain English?",
    answer:
      "Cendorq is a Search Presence OS that helps businesses become easier to understand, easier to trust, and easier to choose across search, local, and AI-driven discovery.",
  },
  {
    question: "Where should most customers start?",
    answer:
      "Most customers should start with Free Search Presence Snapshot, then move into Search Presence Scan if the business needs a more serious first diagnostic.",
  },
  {
    question: "Why not jump straight into the biggest package?",
    answer:
      "Because the wrong depth at the wrong time wastes money. The strongest next move is the one that matches how clear the business already is.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq",
    description:
      "Cendorq helps businesses become the strongest answer customers and search systems trust first through a clear Search Presence OS.",
    path: "/",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Search Presence OS",
    description:
      "A clear system that helps businesses strengthen visibility, trust, positioning, and response through Snapshot, Scan, Blueprint, Infrastructure, and Command.",
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
            <span className="system-gradient-text block">customers and search systems trust first.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq helps businesses strengthen visibility, trust, positioning, and response through a clear system: Free Search Presence Snapshot, Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Customers understand the system inside out when the route is simple: start with the clearest first signal, move deeper only when it makes sense, and never pay for the wrong next move too early.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AuthorityPill>Clear first step</AuthorityPill>
            <AuthorityPill>Better decisions before bigger spend</AuthorityPill>
            <AuthorityPill>Right layer, right time</AuthorityPill>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start Free Snapshot
            </Link>
            <Link
              href="/diagnosis"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              See how the system works
            </Link>
          </div>

          <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
            <p className="system-eyebrow">What this homepage should do</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Help the customer understand the whole system before the customer enters the wrong layer.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              The homepage should make Cendorq easy to understand, easy to trust, and easy to act on. That means naming the problem clearly, showing the full route simply, and making the starting point obvious.
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
                    Conversion-first route active
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    The route becomes stronger when customers understand what each stage is actually for.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    Free Search Presence Snapshot gives the first signal. Search Presence Scan gives the first serious read. Visibility Blueprint gives the deeper explanation. Infrastructure strengthens the business. Command keeps it strong.
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
                  <span>Route rule</span>
                  <span>Clarity before escalation</span>
                </div>
                <div className="system-status-bar mt-2 h-2">
                  <span style={{ width: "92%" }} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {PROBLEM_BLOCKS.map((item, index) => (
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
            One system. Five steps. The right depth at the right time.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {SYSTEM_LAYERS.map((item, index) => (
            <LayerCardView
              key={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              strap={item.strap}
              price={item.price}
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
          <TopChip>Why sequence matters</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The best next move usually becomes clear when the business stops trying to buy the largest-looking offer first.
          </h2>
          <div className="mt-8 grid gap-4">
            {WHY_SEQUENCE_MATTERS.map((item, index) => (
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
            The system converts better when the main questions are answered in plain English.
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
            Start with the clearest first move.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            Most customers should begin with Free Search Presence Snapshot. From there, Search Presence Scan becomes the first serious paid step, Visibility Blueprint becomes the deeper strategy layer, and the system grows only when the business is ready.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start Free Snapshot
            </Link>
            <Link href="/pricing" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Compare pricing and scope
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

function LayerCardView({ eyebrow, title, strap, price, copy, bestFor, outcome, href, cta, highlighted = false }: { eyebrow: string; title: string; strap: string; price: string; copy: string; bestFor: string; outcome: string; href: string; cta: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.85rem] p-6 sm:p-7" : "system-surface rounded-[1.85rem] p-6 sm:p-7"}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{strap}</div>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <div className="mt-3 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-100">{price}</div>
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
