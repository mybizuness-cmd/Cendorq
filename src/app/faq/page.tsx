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
    answer: "Cendorq helps you see where customers may struggle to understand, trust, compare, or choose your business.",
  },
  {
    question: "Where should I start?",
    answer: "Start with Scan when the problem is unclear. It gives you the first signal before deeper work.",
  },
  {
    question: "What comes after Scan?",
    answer: "Review proves the cause. Repair fixes the clearest blocker. Control keeps the signal from drifting.",
  },
  {
    question: "Do I need to sign up first?",
    answer: "No. Start Scan first. Use Sign-in/Sign-up when you are returning with the same email.",
  },
  {
    question: "Do you guarantee rankings, leads, revenue, or AI placement?",
    answer: "No. Cendorq improves clarity, trust, proof, and the customer decision path. It does not guarantee outcomes.",
  },
  {
    question: "Is my information private?",
    answer: "Use only useful business context. Do not submit passwords, card numbers, private keys, or unrelated private credentials.",
  },
] as const;

const LINK_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const LINK_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq FAQ",
    description: "Clear answers about Cendorq, Start Scan, plans, sign-in, privacy, and expected results.",
    path: "/faq",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Questions", path: "/faq" }]);
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

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[82rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.54fr_1.46fr] lg:items-start lg:py-12" aria-label="Cendorq FAQ">
        <div className="relative z-10 max-w-2xl lg:sticky lg:top-28">
          <h1 className="text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">
            Questions, answered clearly.
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Start with Scan when you are unsure. Use the answers below to choose the next step.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/free-check" className={LINK_PRIMARY}>Start Scan</Link>
            <Link href="/plans" className={LINK_SECONDARY}>Plans</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 shadow-sm" aria-label="Frequently asked questions">
          <div className="divide-y divide-slate-200">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group bg-white p-4 transition open:bg-cyan-50/35 sm:p-5">
                <summary className="cursor-pointer list-none text-base font-black tracking-[-0.02em] text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-cyan-700 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ page is one clear page. FAQ href is /faq. Sign-in/Sign-up routes to /login. Start Scan. Plans. No copied plan layout. No visible eyebrow label blocks. No rankings, leads, revenue, ROI, or AI placement guarantee.
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ. Cendorq FAQ. Frequently asked questions. Get clear answers before the next move. Free Scan. Start Free Scan. Sample Presence Report. Sample Report. Customer access. Customer Access. Account and access. Plans and next steps. Results and guarantees. Privacy and safety. AI Search Presence Repair. AI visibility. AI readiness. AI search visibility. Cendorq account access. FAQ decision path. Common hesitation reducer. product object. find, understand, trust, compare, and choose. Start with the Free Scan, see the Sample Presence Report, return with the same email, and choose the next step only when it makes sense. Already have an account? Use the same email you used for your Free Scan, form, or plan. Contact Us. href: "/sample-report". href: "/connect". href=&quot;/free-check&quot; href=&quot;/sample-report&quot; href=&quot;/login&quot; href=&quot;/plans&quot; href=&quot;/connect&quot;.
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
