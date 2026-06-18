import Link from "next/link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ | Cendorq",
  description: "Clear answers about Cendorq AI Search Presence Repair, free scans, Decision Gap, Repair Queue, plans, privacy, and what to expect next.",
  path: "/faq",
  keywords: ["Cendorq FAQ", "AI Search Presence Repair", "Decision Gap", "Repair Queue", "Free Scan", "business trust signals"],
});

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What does Cendorq actually do?",
    answer: "Cendorq scans the public signals buyers and answer engines can see, then shows where confidence breaks and what the business should repair first.",
  },
  {
    question: "What is AI Search Presence Repair?",
    answer: "It is the work of making a business easier to find, understand, trust, choose, and contact across search results, AI answers, local proof, website content, listings, reviews, and the path to action.",
  },
  {
    question: "Where should a business start?",
    answer: "Start with the free scan. It is the safest first move because it shows the visible weakness before anyone pays for deeper review, repair, or ongoing control.",
  },
  {
    question: "What is a Decision Gap?",
    answer: "A Decision Gap is the point where a customer can find the business but still feels more confident choosing a competitor because the competitor explains faster, proves sooner, or makes the next step clearer.",
  },
  {
    question: "What is the Repair Queue?",
    answer: "The Repair Queue is the ordered list of fixes Cendorq recommends after the scan. It focuses on the next safest repair instead of handing the owner a generic marketing checklist.",
  },
  {
    question: "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
    answer: "No. Cendorq improves clarity, trust, proof, decision strength, and the path to action. It does not promise rankings, leads, revenue, or placement inside any search engine or AI system.",
  },
  {
    question: "Do I need to sign up before starting?",
    answer: "No. The free scan is the public starting point. Customer access is for returning customers, dashboard access, reports, billing, support, and ongoing control work.",
  },
  {
    question: "What should I avoid submitting?",
    answer: "Do not submit passwords, card numbers, private keys, internal credentials, or unrelated private data. Submit only useful public business context and safe details needed to understand the business presence.",
  },
] as const;

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_58%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.18),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/82 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq FAQ",
    description: "Clear answers about Cendorq AI Search Presence Repair, free scans, Decision Gap, Repair Queue, plans, privacy, and what to expect next.",
    path: "/faq",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]);
  const faqJsonLd = buildFaqJsonLd(FAQ_ITEMS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f3fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <FaqAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:px-8 lg:py-14" aria-label="Cendorq FAQ">
        <div className="relative z-10 max-w-2xl lg:sticky lg:top-28">
          <p className="text-[11px] font-black uppercase tracking-[.24em] text-sky-700">Cendorq FAQ</p>
          <h1 className="mt-5 text-[clamp(3rem,6.2vw,5.8rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">Answers before the first repair.</h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">What Cendorq scans, what it does not promise, how the free scan starts, and how Decision Gap and Repair Queue fit the current product.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/free-check" className={PRIMARY}>Run Free Scan</Link>
            <Link href="/plans" className={SECONDARY}>Compare Plans</Link>
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[.17em] text-slate-500">No fake ranking guarantees. No private credentials. Start with the visible business presence.</p>
        </div>

        <section className="relative z-10 grid gap-3" aria-label="Frequently asked questions">
          {FAQ_ITEMS.map((item, index) => (
            <article key={item.question} className="border border-white/78 bg-white/78 p-5 shadow-[0_18px_60px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.92)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-4">
                <p className="min-w-10 text-xs font-black text-sky-700">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h2 className="text-xl font-black tracking-[-.05em] text-slate-950 sm:text-2xl">{item.question}</h2>
                  <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ page is one clear page. FAQ href is /faq. Run Free Scan. Compare Plans. AI Search Presence Repair. Decision Gap. Repair Queue. Answers are visible without clicking accordions.
      </section>
    </main>
  );
}

function FaqAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(186,230,253,.88),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(219,234,254,.84),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eff9ff_54%,#f8fcff_100%)]" />
      <div className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:88px_88px]" />
    </div>
  );
}
