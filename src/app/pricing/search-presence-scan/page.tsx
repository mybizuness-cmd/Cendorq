import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

export const metadata = buildMetadata({
  title: "Search Presence Scan",
  description:
    "Search Presence Scan is Cendorq's first serious paid diagnostic layer for businesses that already used the free snapshot or already know they need a stronger first paid read before deeper strategy or implementation begins.",
  path: "/pricing/search-presence-scan",
  keywords: [
    "cendorq search presence scan",
    "search presence scan pricing",
    "first paid visibility diagnostic",
    "business visibility first paid review",
    "trust clarity positioning review",
  ],
  image: {
    alt: "Cendorq Search Presence Scan page — the first serious paid diagnostic layer for businesses that need a clearer first read before deeper strategy begins.",
  },
});

const HERO_READOUTS = [
  { label: "Price", value: "$195" },
  { label: "Primary role", value: "First serious paid read" },
  { label: "Usually after", value: "Free Search Presence Snapshot" },
  { label: "Usually leads to", value: "Visibility Blueprint" },
] as const;

const FAQS = [
  {
    question: "What is Search Presence Scan in simple terms?",
    answer:
      "It is the first serious paid diagnostic layer inside Cendorq. It gives the business a cleaner paid read on what is most likely weakening trust, clarity, positioning, and response before deeper strategy or implementation begins.",
  },
  {
    question: "How is this different from the free snapshot?",
    answer:
      "The free snapshot creates the first signal. Search Presence Scan is the paid layer that makes that signal more serious, more structured, and easier to act on before the business escalates further.",
  },
  {
    question: "How is this different from Visibility Blueprint?",
    answer:
      "Search Presence Scan is the first serious paid read. Visibility Blueprint is the flagship strategy review for businesses that already know they need a deeper explanation than a first read can provide.",
  },
  {
    question: "What usually comes after Search Presence Scan?",
    answer:
      "For many businesses, the next step is Visibility Blueprint, especially when the paid first read shows that the business needs a deeper explanation before implementation begins.",
  },
] as const;

export default function SearchPresenceScanPage() {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();
  const webPageJsonLd = buildWebPageJsonLd({
    title: `${BRAND_NAME} Search Presence Scan`,
    description:
      "Search Presence Scan is the first serious paid diagnostic layer for businesses that need a clearer first read before deeper strategy begins.",
    path: "/pricing/search-presence-scan",
  });
  const serviceJsonLd = buildServiceJsonLd({
    title: `${BRAND_NAME} Search Presence Scan`,
    description:
      "A first serious paid diagnostic layer for businesses that need a clearer first read before moving into deeper strategy or concentrated implementation.",
    path: "/pricing/search-presence-scan",
    serviceType: "Business visibility first paid diagnostic",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing and Layers", path: "/pricing" },
    { name: "Search Presence Scan", path: "/pricing/search-presence-scan" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <Atmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }} />
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
          <span className="text-cyan-100">Search Presence Scan</span>
        </div>
      </section>

      <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
        <div>
          <TopChip>Search Presence Scan</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            The first serious paid read
            <span className="system-gradient-text block">before deeper strategy or implementation begins.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Search Presence Scan is the first serious paid diagnostic layer in Cendorq. It exists for businesses that already used the free snapshot or already know they need a stronger first paid read before they choose deeper strategy.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Customers understand this layer inside out when it is explained simply: the free snapshot gives the first signal, Search Presence Scan gives the first serious paid read, and Visibility Blueprint becomes the next step only when the business needs a deeper explanation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3"><Pill>First serious paid read</Pill><Pill>$195</Pill><Pill>Cleaner next-step decision</Pill></div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">Start Free Snapshot</Link>
            <Link href="/pricing/full-diagnosis" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">View Visibility Blueprint</Link>
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
                  <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200"><span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />First serious paid diagnostic active</div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">This layer is for businesses that need more than a first direction, but not yet the full flagship strategy review.</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">It protects the business from jumping straight into deeper strategy, heavier implementation, or recurring support before the first paid diagnostic is strong enough.</p>
                </div>
                <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">{HERO_READOUTS.map((item,index)=><ReadoutTile key={item.label} label={item.label} value={item.value} highlighted={index===0} />)}</div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Card title="Because free first signal and paid first read should not be collapsed into one vague offer." copy="The free snapshot lowers friction. Search Presence Scan raises seriousness. The system converts better when customers can see that difference clearly." highlighted />
                <Card title="Because a stronger paid read improves the next decision before bigger money is spent." copy="This layer helps the business understand what is most likely weakening trust, clarity, positioning, and response before the business commits to a larger strategic or implementation move." />
                <Card title="Because businesses often need a cleaner paid interpretation before they need the full flagship review." copy="Some businesses do not need to jump straight into Visibility Blueprint. They need a stronger paid read first so the next escalation becomes easier to trust." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionHeader chip="What this includes" title="The output is a cleaner paid read that makes the next step easier to choose." />
      <div className="relative z-10 mt-10 grid gap-5 md:grid-cols-2">
        <Tile label="Structured first paid read" value="A stronger explanation of what is most likely weakening trust, clarity, positioning, and action before bigger work begins." highlighted />
        <Tile label="Issue concentration" value="A cleaner sense of which weaknesses are probably real and which ones should not trigger random escalation yet." />
        <Tile label="Routing recommendation" value="A clearer recommendation on whether the business should stay lighter, move into Visibility Blueprint, or prepare for a different next step." />
        <Tile label="Decision protection" value="A lower chance of paying for the wrong depth too early just because the wrong layer looked louder." />
      </div>

      <SectionHeader chip="Best fit" title="Choose Search Presence Scan when the business needs a stronger paid read before it needs a deeper flagship strategy review." />
      <div className="relative z-10 mt-10 grid gap-5 md:grid-cols-3">
        <Card title="Best after Free Snapshot" copy="Use this when the free snapshot already showed that the business needs more than a first direction." highlighted />
        <Card title="Best before Visibility Blueprint" copy="Use this when the business still needs a cleaner paid interpretation before it makes sense to move into the flagship strategy review." />
        <Card title="Best for serious but not over-escalated decisions" copy="Use this when the business wants a stronger next-step recommendation without pretending every situation already demands the deepest review." />
      </div>

      <SectionHeader chip="Practical questions" title="Customers convert better when the first paid layer is explained plainly." />
      <div className="relative z-10 mt-10 grid gap-5 md:grid-cols-2">{FAQS.map((item,index)=><FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index===0} />)}</div>

      <section className="relative z-10 mt-20">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Best next move</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">Use Search Presence Scan when the business needs a stronger paid read before it chooses deeper strategy.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">If the free snapshot already raised real pressure but the business is not ready to jump straight into the flagship strategy review, Search Presence Scan is often the strongest next step. It keeps the route disciplined and makes the next escalation easier to trust.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">Start Free Snapshot</Link>
            <Link href="/pricing/full-diagnosis" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">View Visibility Blueprint</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Atmosphere(){return <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" /><div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" /><div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" /><div className="system-grid-wide absolute inset-0 opacity-[0.03]" /><div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" /></div>}
function SectionHeader({ chip, title }: { chip: string; title: string }) { return <section className="relative z-10 mt-20"><div className="max-w-3xl"><TopChip>{chip}</TopChip><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2></div></section>; }
function TopChip({ children }: { children: ReactNode }) { return <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">{children}</div>; }
function Pill({ children }: { children: ReactNode }) { return <div className="system-tag-strong rounded-full px-4 py-2 text-sm">{children}</div>; }
function ReadoutTile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) { return <div className={highlighted ? "system-chip rounded-[1.3rem] p-4" : "system-surface rounded-[1.3rem] p-4"}><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div><div className="mt-2 text-base font-semibold leading-6 text-white">{value}</div></div>; }
function Card({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) { return <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}><h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p></article>; }
function Tile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) { return <article className={highlighted ? "system-panel-authority rounded-[1.6rem] p-5" : "system-surface rounded-[1.6rem] p-5"}><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p><p className="mt-3 text-sm leading-7 text-slate-200">{value}</p></article>; }
function FaqCard({ question, answer, highlighted = false }: { question: string; answer: string; highlighted?: boolean }) { return <article className={highlighted ? "system-panel-authority rounded-[1.75rem] p-6" : "system-surface rounded-[1.75rem] p-6"}><h3 className="text-2xl font-semibold tracking-tight text-white">{question}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p></article>; }
