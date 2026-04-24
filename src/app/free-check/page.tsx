import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import { FreeCheckForm } from "@/components/free-check/free-check-form";
import { FreeCheckIntro } from "@/components/free-check/free-check-intro";
import { FreeCheckTrustStrip } from "@/components/free-check/free-check-trust-strip";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Search Presence Scan",
  description:
    "Start the Cendorq Search Presence Scan to identify whether trust, clarity, positioning, action friction, discoverability, or recommendation visibility weakness may be suppressing results.",
  path: "/free-check",
  keywords: [
    "search presence scan",
    "free visibility check",
    "cendorq free check",
    "search presence intake",
    "visibility intake form",
    "first signal business scan",
  ],
  image: {
    alt: "Cendorq Search Presence Scan — the first serious signal layer for businesses that need a stronger first read before deeper pressure is applied.",
  },
});

const FAQS = [
  {
    question: "What is Search Presence Scan in simple terms?",
    answer:
      "It is the first serious review layer. It helps the business get a cleaner read on what may be weakening trust, clarity, positioning, action, discoverability, and recommendation visibility before deeper pressure is chosen.",
  },
  {
    question: "Who should start here?",
    answer:
      "Most businesses should start here if they know something feels weak but still need a cleaner first explanation before deeper strategy or concentrated implementation is chosen.",
  },
  {
    question: "What happens after submission?",
    answer:
      "The business enters the system with a stronger first signal. From there, the next move becomes easier to judge, whether that means staying at first-read level or moving into Visibility Blueprint.",
  },
] as const;

const POST_SUBMISSION_GUIDE = [
  {
    title: "What this route is protecting",
    copy:
      "It protects the business from buying a heavier layer before the first real signal is clear enough to justify the next move.",
  },
  {
    title: "What the form is trying to surface",
    copy:
      "It is trying to surface whether the core weakness is more about trust, clarity, positioning, action friction, discoverability, or answer-system inclusion pressure.",
  },
  {
    title: "What usually comes next",
    copy:
      "If the signal is strong enough, Visibility Blueprint is usually the strongest next layer because it deepens explanation before concentrated strengthening begins.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Search Presence Scan",
    description:
      "The first serious signal layer inside Cendorq for businesses that need a stronger first read before deeper pressure is applied.",
    path: "/free-check",
  });
  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Search Presence Scan",
    description:
      "A structured first-read intake designed to improve the quality of the next decision before strategy, implementation, or recurring command is chosen.",
    path: "/free-check",
    serviceType: "Initial search-presence review",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Search Presence Scan", path: "/free-check" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <FreeCheckAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <FreeCheckIntro />
      <FreeCheckTrustStrip />
      <FreeCheckForm />

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <div className="system-chip inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Why this route matters
          </div>

          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Search Presence Scan is not a throwaway form. It is the first serious filter in the system.
          </h2>

          <div className="mt-8 grid gap-4">
            {POST_SUBMISSION_GUIDE.map((item, index) => (
              <article
                key={item.title}
                className={
                  index === 0
                    ? "system-panel-authority rounded-[1.7rem] p-6"
                    : "system-surface rounded-[1.7rem] p-6"
                }
              >
                <h3 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {FAQS.map((item, index) => (
            <article
              key={item.question}
              className={
                index === 0
                  ? "system-panel-authority rounded-[1.7rem] p-5"
                  : "system-surface rounded-[1.7rem] p-5"
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight text-white">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <div className="system-chip inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Strongest next move after this
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Most businesses should move into Visibility Blueprint before heavier implementation or recurring command.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            The first signal exists to improve the next decision. If the business is already clear enough after this layer, Visibility Blueprint is usually the strongest next step because it deepens explanation before stronger force begins.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing/full-diagnosis"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              View Visibility Blueprint
            </Link>
            <Link
              href="/pricing"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Review full system path
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FreeCheckAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
