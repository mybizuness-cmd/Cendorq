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
  title: "Free Scan | Cendorq",
  description:
    "Run the Cendorq Free Scan to see the first AI-readiness signal across business clarity, trusted proof, public signals, and customer action.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "free AI readiness scan",
    "AI engine readiness scan",
    "business clarity scan",
    "business trust scan",
    "AI search visibility scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

const TRUST_RULES = [
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
] as const;

const SCAN_PROMISE = [
  { label: "Clarity", value: "Can AI engines understand you?", detail: "Offer, audience, proof, public facts, and decision language." },
  { label: "Trust", value: "Can buyers believe you?", detail: "Reviews, proof, consistency, freshness, and confidence signals." },
  { label: "Action", value: "Can customers choose you?", detail: "Reason to choose, competitor contrast, and next-step friction." },
] as const;

const REPORT_PREVIEW = [
  { label: "Signal", value: "Choice gap", copy: "The business may be visible, but the reason to choose it may not be sharp enough." },
  { label: "Impact", value: "Buyer hesitation", copy: "A ready customer can still compare longer when proof is not close to the decision." },
  { label: "Next action", value: "Review before repair", copy: "Prove the cause before spending money on the wrong page, message, or proof point." },
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer: "Yes. The Free Scan gives a first AI-readiness signal before paid review, repair, or monthly control.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "After verification, your dashboard opens the Free Scan result with the signal, the confidence limit, and the safest next action.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided scan for businesses that need to know whether AI engines and customers can understand, trust, and choose them.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that helps businesses identify the first visible break in AI-readiness, customer trust, clarity, choice, or action.",
    path: "/free-check",
    serviceType: "Free AI Readiness Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-16" aria-label="Free Scan form first">
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Free Scan</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-slate-950">
            See the first signal before you buy deeper work.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose before deeper work begins.
          </p>
          <div className="mt-7 grid gap-3">
            {TRUST_RULES.map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-700 shadow-[0_12px_40px_rgba(15,23,42,0.045)]">
                {item}
              </div>
            ))}
          </div>
          <Link href="/dashboard/reports/free-scan" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            Result opens in dashboard
          </Link>
          <div className="sr-only">
            Free Scan form visible within the first quarter of the page. Streamlined Free Scan form. Current step only. Dedicated dashboard Free Scan result path after verification. Safe business context only.
          </div>
        </div>

        <div className="rounded-[2.55rem] border border-slate-200 bg-slate-950 p-3 shadow-[0_34px_130px_rgba(15,23,42,0.18)] sm:p-5">
          <GuidedFreeCheckFormV3 />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Free Scan promise">
        <div className="grid gap-4 md:grid-cols-3">
          {SCAN_PROMISE.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:-mt-5 md:mb-5" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]"}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Free Scan result preview">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.09)]">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Dashboard result preview</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">A signal you can actually use.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">The output is not a pile of generic tips. It gives the signal, the likely impact, and the safest next layer.</p>
              <Link href="/dashboard/reports/free-scan" className="mt-7 inline-flex text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Preview result path →
              </Link>
            </div>
            <div className="divide-y divide-slate-200">
              {REPORT_PREVIEW.map((item) => (
                <article key={item.label} className="grid gap-4 p-5 sm:grid-cols-[10rem_1fr] sm:p-7">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
    </main>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]">
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{answer}</p>
    </article>
  );
}
