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
  title: "Free Market Signal Scan | Cendorq",
  description:
    "Run the Cendorq Free Scan to see the first signal in business visibility, clarity, trust, choice, or customer action.",
  path: "/free-check",
  keywords: [
    "free market signal scan",
    "free business visibility scan",
    "cendorq free scan",
    "ai search visibility scan",
    "business discoverability scan",
    "business trust scan",
    "customer choice analysis",
  ],
  image: { alt: "Cendorq Free Market Signal Scan." },
});

const TRUST_RULES = [
  "Business context only",
  "No private credentials or payment details",
  "Verified customers get the protected dashboard result",
] as const;

const SCAN_PROMISE = [
  { label: "Findability", value: "Can the market find you?", detail: "Search, maps, AI answers, and public discovery signals." },
  { label: "Clarity", value: "Can buyers understand you?", detail: "Offer, audience, proof, and decision language." },
  { label: "Choice", value: "Can they choose you?", detail: "Trust, action path, competitor contrast, and next step." },
] as const;

const REPORT_PREVIEW = [
  { label: "Signal", value: "Choice gap", copy: "The business is visible, but the reason to choose it may not be sharp enough." },
  { label: "Impact", value: "Buyer hesitation", copy: "A ready customer can still compare longer when proof is not close to the decision." },
  { label: "Next action", value: "Diagnose before fixing", copy: "Prove the cause before spending money on the wrong page, message, or proof point." },
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer: "Yes. The Free Scan gives a first market signal before paid diagnosis, implementation, or monthly control.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "After verification, your dashboard opens the Free Scan result with the signal, the confidence limit, and the safest next action.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Market Signal Scan",
    description:
      "A guided scan for businesses that need to know whether the market can find, understand, trust, and choose them.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Market Signal Scan",
    description:
      "A guided intake that helps businesses identify the first visible break in AI-search visibility, customer trust, clarity, choice, or action.",
    path: "/free-check",
    serviceType: "Free Market Signal Scan",
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

      <section className="relative z-10 grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-start" aria-label="Free Market Signal Scan form first">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/18 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.16),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.86),rgba(2,8,23,0.95)_52%,rgba(14,116,144,0.26))] p-4 shadow-[0_38px_130px_rgba(2,8,23,0.52)] sm:p-5 lg:sticky lg:top-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
          <p className="text-sm font-semibold text-cyan-100">Free Market Signal Scan</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            See the first signal before you buy the fix.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Cendorq checks whether your business is clear enough to be found, understood, trusted, and chosen before deeper work begins.
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
            Free Market Signal Scan form visible within the first quarter of the page. Streamlined Free Scan form. Current step only. Dedicated dashboard Free Scan result path after verification. Safe business context only.
          </div>
        </div>

        <GuidedFreeCheckFormV3 className="relative z-10" />
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Free Scan promise">
        {SCAN_PROMISE.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-4 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.68),rgba(2,8,23,0.9)_46%,rgba(14,116,144,0.22))] p-5 shadow-[0_28px_100px_rgba(2,8,23,0.38)] sm:p-7" aria-label="Free Scan result preview">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Dashboard result preview</p>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">A signal you can actually use.</h2>
          </div>
          <Link href="/dashboard/reports/free-scan" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Preview result path →
          </Link>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {REPORT_PREVIEW.map((item) => (
            <article key={item.label} className="rounded-[1.25rem] border border-white/10 bg-slate-950/58 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.value}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-2">
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
      <div className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.03] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.022]" />
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
