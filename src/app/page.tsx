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
  title: "Get found, understood, and trusted before customers move on",
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
    alt: "Cendorq homepage — a clear Search Presence OS that helps businesses get found, understood, and trusted before customers move on.",
  },
});

const HERO_POINTS = [
  "Start with a free first signal.",
  "Move deeper only when it makes sense.",
  "Fix the real problem before spending bigger money.",
] as const;

const STARTING_PATH = [
  {
    label: "Free entry",
    title: "Search Presence Snapshot",
    price: "Free",
    copy:
      "A fast first look that helps you see whether the main weakness is trust, clarity, positioning, action friction, or broader visibility.",
    href: "/free-check",
    cta: "Start free snapshot",
    highlighted: true,
  },
  {
    label: "Paid layer 01",
    title: "Search Presence Scan",
    price: "$195",
    copy:
      "The first serious paid read for businesses that need a clearer explanation before they spend more.",
    href: "/pricing",
    cta: "See scan and pricing",
  },
  {
    label: "Paid layer 02",
    title: "Visibility Blueprint",
    price: "$2,500",
    copy:
      "A deeper strategy layer that shows what is really holding the business back and what should happen first.",
    href: "/pricing/full-diagnosis",
    cta: "View blueprint",
  },
  {
    label: "Paid layer 03",
    title: "Presence Infrastructure",
    price: "From $6,000",
    copy:
      "The build layer that strengthens the website, offer structure, trust architecture, and answer-readiness foundation.",
    href: "/pricing/optimization",
    cta: "View infrastructure",
  },
  {
    label: "Paid layer 04",
    title: "Presence Command",
    price: "From $2,500/mo",
    copy:
      "The recurring operating layer for businesses that need continuity, adaptation, and ongoing control.",
    href: "/pricing/monthly-partner",
    cta: "View command",
  },
] as const;

const CORE_PROBLEMS = [
  {
    title: "The business is stronger than the website makes it look.",
    copy:
      "Customers hesitate when the business feels hard to understand, hard to compare, or hard to trust fast enough.",
  },
  {
    title: "Search systems cannot rank what the business has not made clear.",
    copy:
      "If the business is vague, weakly positioned, or poorly structured, more activity usually does not fix the real issue.",
  },
  {
    title: "The wrong next move wastes time and money.",
    copy:
      "Many businesses push harder before they know whether they need first signal, deeper strategy, structural work, or ongoing support.",
  },
] as const;

const WHY_CENDORQ = [
  {
    title: "Clear first step",
    copy: "Most customers should start with Free Search Presence Snapshot, not with the biggest-looking offer.",
  },
  {
    title: "Clear route",
    copy: "Every layer has one job, one reason, and one next move. That makes the system easier to trust and easier to buy correctly.",
  },
  {
    title: "Clear boundaries",
    copy: "No fake guarantees. No vague bundle language. No forcing customers into the wrong depth too early.",
  },
] as const;

const FAQS = [
  {
    question: "What is Cendorq in plain English?",
    answer:
      "Cendorq is a Search Presence OS that helps businesses become easier to find, easier to understand, easier to trust, and easier to choose across search, local, and AI-driven discovery.",
  },
  {
    question: "Where should most customers start?",
    answer:
      "Most customers should start with Free Search Presence Snapshot. If the business needs a stronger first paid read, the next step is Search Presence Scan.",
  },
  {
    question: "Why not jump straight into the biggest package?",
    answer:
      "Because the wrong depth at the wrong time wastes money. The strongest next move is the one that matches how clear the business already is today.",
  },
] as const;

export default function HomePage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq",
    description:
      "Cendorq helps businesses get found, understood, and trusted before customers move on through a clear Search Presence OS.",
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <HomeAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div>
          <TopChip>Search Presence OS</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-[4.6rem]">
            Get found, understood,
            <span className="system-gradient-text block">and trusted before customers move on.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq helps businesses strengthen visibility, trust, positioning, and response through a clear step-by-step system. Customers understand the route inside out when the first move is obvious and the next move is earned.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start free snapshot
            </Link>
            <Link
              href="/pricing"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Compare the system
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
                Start here
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Most businesses should not start with the deepest layer.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Start with the clearest first signal. Then move into deeper strategy, stronger build work, or ongoing command only when the business actually needs it.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <GuideTile label="Best first step" value="Free Search Presence Snapshot" />
                <GuideTile label="Best paid first step" value="Search Presence Scan" />
                <GuideTile label="Why this converts better" value="Customers choose faster when the route is simple." />
                <GuideTile label="Main mistake avoided" value="Buying the wrong depth too early." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-16">
        <div className="max-w-3xl">
          <TopChip>Pick the right depth</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            One system. Five steps. The right job at the right time.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Each layer does one job. That makes the path easier to understand, easier to trust, and easier to buy correctly.
          </p>
        </div>
        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {STARTING_PATH.map((item, index) => (
            <LayerCardView
              key={item.title}
              label={item.label}
              title={item.title}
              price={item.price}
              copy={item.copy}
              href={item.href}
              cta={item.cta}
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Why businesses get stuck</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The business usually does not need more noise first. It needs a clearer read first.
          </h2>
          <div className="mt-8 grid gap-4">
            {CORE_PROBLEMS.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {WHY_CENDORQ.map((item, index) => (
            <TrustTile key={item.title} label={item.title} value={item.copy} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-16">
        <div className="max-w-3xl">
          <TopChip>Questions customers ask</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Clear answers make the next move easier.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {FAQS.map((item, index) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-16">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best next move</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start with the clearest first move.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            Most customers should begin with Free Search Presence Snapshot. If the business needs a stronger first paid read, the next step is Search Presence Scan.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free snapshot
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

function ReasonCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function LayerCardView({ label, title, price, copy, href, cta, highlighted = false }: { label: string; title: string; price: string; copy: string; href: string; cta: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.85rem] p-6 sm:p-7" : "system-surface rounded-[1.85rem] p-6 sm:p-7"}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</div>
        <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-100">{price}</div>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
      <div className="mt-6">
        <Link href={href} className={highlighted ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}>
          {cta}
        </Link>
      </div>
    </article>
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
