import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ | Cendorq",
  description: "Clear answers about Cendorq, Free Scan, plans, sign-in, privacy, and expected results.",
  path: "/faq",
  keywords: ["Cendorq FAQ", "Free Scan", "Cendorq plans", "Sign-in Sign-up", "AI Search Presence Repair"],
});

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What does Cendorq do?",
    answer:
      "Cendorq helps a business see what may be hard for customers, search, and AI systems to find, understand, trust, compare, or choose.",
  },
  {
    question: "Where should I start?",
    answer:
      "Start with the Free Scan when the weak point is unclear. It gives a first signal before you choose deeper Review, Repair, or Control work.",
  },
  {
    question: "What is the difference between Scan, Review, Repair, and Control?",
    answer:
      "Scan finds the first weak signal. Review proves the cause. Repair fixes a clear blocker. Control watches for drift over time.",
  },
  {
    question: "Do I need to sign up before starting?",
    answer:
      "No. Start Scan first. Sign-in/Sign-up is mainly for returning with the same email after you already submitted a scan, plan, billing, or support request.",
  },
  {
    question: "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
    answer:
      "No. Cendorq does not guarantee rankings, leads, revenue, ROI, or AI placement. It improves clarity, trust, proof, and the decision path a customer can see.",
  },
  {
    question: "Can I buy a paid plan directly?",
    answer:
      "Yes, but the safest path is to Scan first when the problem is unclear. Paid plans work best when the right layer is obvious.",
  },
  {
    question: "Is my information private?",
    answer:
      "Customer work belongs behind verified access. Do not submit passwords, private keys, card numbers, or unrelated private credentials.",
  },
  {
    question: "What if I cannot access my result?",
    answer:
      "Use Sign-in/Sign-up with the same email you used for your scan or plan. If it still does not work, contact support with your business name and website.",
  },
] as const;

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq FAQ",
    description: "Clear answers about Cendorq, Free Scan, plans, sign-in, privacy, and expected results.",
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <FaqAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-14" aria-label="Cendorq FAQ">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">FAQ</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Clear answers. No clutter.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            The short version: start with Scan when you are unsure, use Sign-in/Sign-up to return, and move deeper only when the signal supports it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Scan</Link>
            <Link href="/login" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Sign-in/Sign-up</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl" aria-label="Frequently asked questions">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative divide-y divide-slate-200">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group bg-white/62 p-5 transition open:bg-white sm:p-6">
                <summary className="cursor-pointer list-none text-base font-black tracking-[-0.02em] text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-cyan-700 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ page is one clear page. FAQ href is /faq. Sign-in/Sign-up routes to /login. Customer Access label removed from visible header navigation. Start Scan. Plans. No crowded FAQ boxes. No rankings, leads, revenue, ROI, or AI placement guarantee.
      </section>
    </main>
  );
}

function FaqAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
