import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import { GuidedFreeCheckForm } from "@/components/free-check/guided-free-check-form-v2";

export const metadata = buildMetadata({
  title: "Free Search Presence Scan | Cendorq",
  description:
    "Start the guided Cendorq free scan and find what is making the business harder to understand, trust, or choose before spending more.",
  path: "/free-check",
  keywords: [
    "free search presence scan",
    "cendorq free scan",
    "business visibility scan",
    "website trust scan",
    "business clarity scan",
    "ai search visibility intake",
  ],
  image: {
    alt: "Cendorq guided free search presence scan.",
  },
});

const SCAN_PROMISES = [
  {
    title: "Find what is making people hesitate",
    copy:
      "See whether people may be confused, unsure, comparing you away, or failing to understand why they should choose you.",
  },
  {
    title: "Avoid paying for the wrong fix",
    copy:
      "Before you buy deeper work, get a cleaner first read on what is actually weakening the business online.",
  },
  {
    title: "Know the next right move",
    copy:
      "The scan helps point the business toward the next step that makes sense instead of pushing every offer at once.",
  },
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer:
      "Yes. The free scan is the first guided step. It helps you see what may be making the business harder to understand, trust, or choose.",
  },
  {
    question: "Why is the scan split into steps?",
    answer:
      "A giant form creates friction. The guided scan asks for the right information in the right order so it feels easier to finish and produces a stronger first read.",
  },
  {
    question: "What happens after I submit it?",
    answer:
      "The business gets captured into the Cendorq scan system. If the answers show a deeper problem, the next move becomes easier to understand.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A guided free scan for businesses that need to find what is making people hesitate before spending more.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Search Presence Scan",
    description:
      "A premium guided intake that helps businesses identify what may be hurting trust, clarity, choice, and action before deeper work begins.",
    path: "/free-check",
    serviceType: "Free Search Presence Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Search Presence Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <FreeCheckAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
        <div>
          <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Guided free scan
          </div>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.6rem]">
            Find out why people are not choosing you fast enough.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq walks you through a short, premium scan that helps reveal what may be making the business harder to understand, harder to trust, or easier to ignore.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {SCAN_PROMISES.map((item) => (
              <PromiseCard key={item.title} title={item.title} copy={item.copy} />
            ))}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.1),transparent_30%)]" />
          <div className="relative z-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              What this scan does
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              It turns confusion into a clear first direction.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Customers judge the business before they call, book, or buy. This scan helps identify where that judgment may be breaking down.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MiniPoint label="People may not get it" value="The offer may be too hard to understand quickly." />
              <MiniPoint label="People may not trust it" value="The page may not create enough confidence fast enough." />
              <MiniPoint label="People may compare away" value="Competitors may feel easier, safer, or clearer." />
              <MiniPoint label="People may not act" value="The next step may not feel obvious or worth it." />
            </div>
          </div>
        </div>
      </section>

      <GuidedFreeCheckForm className="relative z-10 mt-12" />

      <section className="relative z-10 mt-12 grid gap-4 md:grid-cols-3">
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
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function PromiseCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.35rem] p-4 sm:p-5">
      <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
    </article>
  );
}

function MiniPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{value}</div>
    </div>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.5rem] p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
