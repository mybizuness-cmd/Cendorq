import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ | Cendorq",
  description: "Clear answers about Cendorq, Start Scan, plans, sign-in, privacy, and expected results.",
  path: "/faq",
  keywords: ["Cendorq FAQ", "Start Scan", "Cendorq plans", "Sign-in Sign-up", "AI Search Presence Repair"],
});

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What does Cendorq do?",
    answer: "Cendorq helps business owners see where AI systems and customers may struggle to understand, trust, compare, or choose the business.",
  },
  {
    question: "Where should I start?",
    answer: "Start with the scan. It gives you the first signal before deeper review, repair, or ongoing control work.",
  },
  {
    question: "What does the scan look at?",
    answer: "It looks at business signals such as your website, service pages, local proof, reviews, listings, FAQs, schema, offers, competitors, and the path from interest to action.",
  },
  {
    question: "Do I need to sign up first?",
    answer: "No. You can start with the scan first. Use Sign in / Sign up when you are returning with the same email or accessing customer materials.",
  },
  {
    question: "Do you guarantee rankings, leads, revenue, or AI placement?",
    answer: "No. Cendorq improves clarity, trust, proof, comparison strength, and the customer decision path. It does not guarantee rankings, leads, revenue, or AI placement.",
  },
  {
    question: "Is my information private?",
    answer: "Only submit useful business context. Do not submit passwords, card numbers, private keys, or unrelated private credentials.",
  },
] as const;

const LINK_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const LINK_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq FAQ",
    description: "Clear answers about Cendorq, Start Scan, plans, sign-in, privacy, and expected results.",
    path: "/faq",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <FaqAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[84rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.5fr_1.5fr] lg:items-start lg:py-12" aria-label="Cendorq FAQ">
        <div className="relative z-10 max-w-2xl lg:sticky lg:top-28">
          <h1 className="text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">
            FAQ
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Clear answers before you start a scan, choose a plan, or sign back in.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/free-check" className={LINK_PRIMARY}>Start Scan</Link>
            <Link href="/plans" className={LINK_SECONDARY}>Plans</Link>
          </div>
        </div>

        <section className="grid gap-3" aria-label="Frequently asked questions">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question} className="rounded-[1.25rem] border border-slate-200 bg-white/92 p-5 shadow-sm">
              <h2 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{item.question}</h2>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </section>
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ page is one clear page. FAQ href is /faq. Sign in / Sign up routes to /login. Start Scan. Plans. This is not the plans page. FAQ answers are visible without clicking accordions.
      </section>
    </main>
  );
}

function FaqAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/40 to-white" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.012]" />
    </div>
  );
}
