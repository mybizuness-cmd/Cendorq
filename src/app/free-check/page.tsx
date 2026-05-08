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
  "Protected dashboard result after verification",
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
    <main className="relative isolate overflow-hidden text-white">
      <FreeCheckAtmosphere />
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start" aria-label="Free Market Signal Scan form first">
        <div className="relative z-10 lg:sticky lg:top-24">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Free Market Signal Scan
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            See the first signal before you buy the fix.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Cendorq checks whether your business is clear enough to be found, understood, trusted, and chosen before deeper work begins.
          </p>
          <div className="mt-7 grid gap-3">
            {TRUST_RULES.map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold leading-6 text-cyan-50 shadow-[0_18px_70px_rgba(2,8,23,0.22)]">
                {item}
              </div>
            ))}
          </div>
          <Link href="/dashboard/reports/free-scan" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Result opens in dashboard
          </Link>
          <div className="sr-only">
            Free Market Signal Scan form visible within the first quarter of the page. Streamlined Free Scan form. Current step only. Dedicated dashboard Free Scan result path after verification. Safe business context only.
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-4 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <GuidedFreeCheckFormV3 className="relative z-10" />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Free Scan promise">
        <div className="grid gap-4 md:grid-cols-3">
          {SCAN_PROMISE.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Free Scan result preview">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Dashboard result preview</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">A signal you can actually use.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">The output is not a pile of generic tips. It gives the signal, the likely impact, and the safest next command.</p>
              <Link href="/dashboard/reports/free-scan" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Preview result path →
              </Link>
            </div>
            <div className="divide-y divide-white/10">
              {REPORT_PREVIEW.map((item) => (
                <article key={item.label} className="grid gap-4 p-5 sm:grid-cols-[10rem_1fr] sm:p-7">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
    </main>
  );
}

function FreeCheckAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]">
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
