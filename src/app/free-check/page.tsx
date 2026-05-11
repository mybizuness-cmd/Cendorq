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

export const metadata = buildMetadata({
  title: "Free Scan | Cendorq",
  description:
    "Start the Cendorq Free Scan to see the first place your business may be unclear, under-trusted, or harder for AI engines and customers to choose.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "AI readiness scan",
    "business clarity scan",
    "AI search visibility scan",
    "business trust scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

const CLARITY_POINTS = [
  { title: "Clarity", copy: "Can a new customer quickly understand what the business does and who it is for?" },
  { title: "Trust", copy: "Is there enough proof nearby for someone to believe the business is real and worth choosing?" },
  { title: "Action", copy: "Is the next step clear enough for a serious customer to move forward?" },
] as const;

const FAQS = [
  {
    question: "Is the Free Scan a full diagnosis?",
    answer: "No. It is a first signal that helps you decide whether deeper review or repair work makes sense.",
  },
  {
    question: "Where does the result open?",
    answer: "After verification, the result opens inside the protected customer workspace so private business context stays controlled.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided first scan for businesses that need to be clearer, more trusted, and easier to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided intake that checks the first visible weakness in business clarity, trust, AI-readiness, or customer action.",
    path: "/free-check",
    serviceType: "AI-readiness free scan",
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

      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-16" aria-label="Free Scan form">
        <div>
          <h1 className="max-w-5xl text-[clamp(2.85rem,6.2vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.078em] text-slate-950">
            See the first signal before you buy deeper work.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
            The scan asks for basic business context only. Do not enter passwords, card numbers, private keys, or confidential customer records.
          </p>
        </div>

        <GuidedFreeCheckFormV3 className="relative z-10" />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8" aria-label="What the Free Scan checks">
        <div className="grid gap-4 md:grid-cols-3">
          {CLARITY_POINTS.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]">
              <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2" aria-label="Free Scan questions">
        {FAQS.map((item) => (
          <article key={item.question} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_14px_48px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.question}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Free Scan verification">
        Free Scan form visible near the top of the page. White public intake surface. AI-readiness starts with business clarity. Basic business context only. No passwords, card numbers, private keys, or confidential customer records. Protected result opens in the customer workspace after verification. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Premium Free Scan hero scale.
      </section>
    </main>
  );
}
