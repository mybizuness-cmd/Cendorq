import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormFocused } from "@/components/free-check/guided-free-check-form-focused";
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
    "Start the guided Cendorq Free Scan to find what may be making customers hesitate before spending on the wrong fix.",
  path: "/free-check",
  keywords: [
    "free business scan",
    "cendorq free scan",
    "business visibility scan",
    "website trust scan",
    "business clarity scan",
    "customer hesitation analysis",
    "ai search visibility intake",
  ],
  image: { alt: "Cendorq Free Scan." },
});

const TRUST_RULES = [
  "Business context only",
  "No passwords, cards, private keys, or tokens",
  "Verified customers get the dashboard result path",
] as const;

const FREE_SCAN_PROMISE = [
  { label: "Gives", value: "A first signal", detail: "Useful direction before you pay." },
  { label: "Does not give", value: "Full diagnosis", detail: "Deep Review handles cause-level proof." },
  { label: "Next", value: "Right paid depth", detail: "Choose only when the result supports it." },
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer: "Yes. The Free Scan gives a useful first signal before paid diagnosis, implementation, or monthly control.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "After verification, your dashboard takes you to the dedicated Free Scan result path with confidence posture, limitations, and the safest next action.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided Free Scan for businesses that need to find what is making people hesitate before spending more.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that helps businesses identify what may be hurting trust, clarity, AI-search visibility, choice, and action before deeper work begins.",
    path: "/free-check",
    serviceType: "Free Scan",
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

      <section className="relative z-10 grid gap-4 lg:grid-cols-[0.48fr_1.52fr] lg:items-start" aria-label="Free Scan form first">
        <div className="system-panel-authority rounded-[1.4rem] p-4 sm:rounded-[1.55rem] sm:p-5 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-cyan-100">Free first read</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start the scan now.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            The form is intentionally early and focused. Cendorq looks for the first visible break in clarity, trust, visibility, or action before you pay for deeper work.
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
            Free Scan form visible within the first quarter of the page. Streamlined Free Scan form. No four visible step badges. Current step only. Dedicated dashboard Free Scan result path after verification. Safe business context only.
          </div>
        </div>

        <GuidedFreeCheckFormFocused className="relative z-10" />
      </section>

      <section className="relative z-10 mt-6 grid gap-3 md:grid-cols-3" aria-label="Free Scan promise">
        {FREE_SCAN_PROMISE.map((item) => (
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
