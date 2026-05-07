import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormV3 } from "@/components/free-check/guided-free-check-form-v3";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Free Visibility Scan | Cendorq",
  description:
    "Run the Cendorq Free Scan to find the first break in business visibility, clarity, trust, or customer action.",
  path: "/free-check",
  keywords: [
    "free business visibility scan",
    "cendorq free scan",
    "ai search visibility scan",
    "business discoverability scan",
    "website trust scan",
    "business clarity scan",
    "customer choice analysis",
  ],
  image: { alt: "Cendorq Free Visibility Scan." },
});

const TRUST_RULES = [
  "Business context only",
  "No passwords, cards, private keys, or tokens",
  "Verified customers get the dashboard result path",
] as const;

const SCAN_PROMISE = [
  { label: "Find", value: "The first visible break", detail: "Visibility, clarity, trust, or action." },
  { label: "Avoid", value: "The wrong fix", detail: "Do not pay deeper before the signal is clear." },
  { label: "Open", value: "A dashboard result", detail: "The result stays protected after verification." },
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer: "Yes. The Free Scan gives a first signal before paid diagnosis, implementation, or monthly control.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "After verification, your dashboard opens the Free Scan result with the signal, the limit of confidence, and the safest next action.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Visibility Scan",
    description:
      "A guided scan for businesses that need to know whether the market can find, understand, trust, and choose them.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Visibility Scan",
    description:
      "A guided intake that helps businesses identify the first visible break in AI-search visibility, customer trust, clarity, choice, or action.",
    path: "/free-check",
    serviceType: "Free Visibility Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-3 text-white sm:px-6 md:pb-12 md:pt-6 xl:pb-14">
      <FreeCheckAtmosphere />
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-4 lg:grid-cols-[0.5fr_1.5fr] lg:items-start" aria-label="Free Visibility Scan form first">
        <div className="relative overflow-hidden rounded-[1.55rem] border border-cyan-300/18 bg-[linear-gradient(145deg,rgba(8,47,73,0.82),rgba(2,8,23,0.94)_52%,rgba(14,116,144,0.24))] p-4 shadow-[0_34px_120px_rgba(2,8,23,0.48)] sm:p-5 lg:sticky lg:top-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
          <p className="text-sm font-semibold text-cyan-100">Free Visibility Scan</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find the first break before you buy the fix.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Cendorq checks whether your business is clear enough to be found, understood, trusted, and acted on before deeper work begins.
          </p>
          <div className="mt-4 grid gap-2">
            {TRUST_RULES.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-xs font-semibold leading-5 text-cyan-50">
                {item}
              </div>
            ))}
          </div>
          <Link href="/dashboard/reports/free-scan" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Result opens in dashboard
          </Link>
          <div className="sr-only">
            Free Visibility Scan form visible within the first quarter of the page. Streamlined Free Scan form. No four visible step badges. Current step only. Dedicated dashboard Free Scan result path after verification. Safe business context only.
          </div>
        </div>

        <GuidedFreeCheckFormV3 className="relative z-10" />
      </section>

      <section className="relative z-10 mt-6 grid gap-3 md:grid-cols-3" aria-label="Free Scan promise">
        {SCAN_PROMISE.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.2rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-6 grid gap-3 md:grid-cols-2">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
    </main>
  );
}

function FreeCheckAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.02]" />
    </div>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
