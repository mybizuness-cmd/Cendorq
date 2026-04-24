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
    "Start the Cendorq Search Presence Scan to build a stronger first signal before deeper strategy, implementation, or recurring command is chosen.",
  path: "/free-check",
  keywords: [
    "search presence scan",
    "cendorq free check",
    "business visibility intake",
    "search presence intake",
    "visibility first signal",
    "ai search visibility intake",
  ],
  image: {
    alt: "Cendorq Search Presence Scan - the first serious signal layer for businesses that need a stronger first read before deeper pressure is applied.",
  },
});

const FAQS = [
  {
    question: "What is Search Presence Scan in simple terms?",
    answer:
      "It is the first serious review layer inside Cendorq. It helps the business get a cleaner first read on what may be weakening trust, clarity, positioning, discoverability, and response before deeper action is chosen.",
  },
  {
    question: "Who should start here?",
    answer:
      "Most businesses should start here if they know something feels weak but still need a stronger first explanation before strategy, implementation, or recurring continuity becomes justified.",
  },
  {
    question: "What happens after submission?",
    answer:
      "The business enters the system with a stronger first signal. From there, the next move becomes easier to judge, whether that means staying at first-read level or moving into Visibility Blueprint.",
  },
] as const;

const ROUTE_MEANING = [
  {
    title: "This route protects the business from buying the wrong next move too early.",
    copy:
      "The strongest first move for most businesses is not more force. It is a stronger first read that clarifies what deserves deeper attention before money gets pushed into the wrong layer.",
  },
  {
    title: "This intake is built for serious owners, not vanity-audit theater.",
    copy:
      "The goal is to capture enough real business signal that the platform can reason more accurately about trust, clarity, positioning, and action friction without pretending shallow input is enough.",
  },
  {
    title: "A better intake creates a better decision system.",
    copy:
      "The more honest and specific the signal is here, the easier it becomes to choose whether the business should stay lighter, move into deeper explanation, or later earn stronger implementation pressure.",
  },
] as const;

const NEXT_PATH_SIGNALS = [
  {
    title: "Stay at first-signal level",
    copy:
      "when the business still needs a cleaner read before any deeper route should be assumed.",
  },
  {
    title: "Move into Visibility Blueprint",
    copy:
      "when the intake becomes strong enough that a deeper explanation of what is weakening visibility, preference, and response is justified.",
  },
  {
    title: "Do not jump straight into heavier force",
    copy:
      "unless the business is already unusually clear about what deserves concentrated strengthening and why.",
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

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <div className="system-chip inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Route meaning
          </div>

          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Search Presence Scan exists to create a stronger first signal before deeper depth is chosen.
          </h2>

          <div className="mt-8 grid gap-4">
            {ROUTE_MEANING.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {NEXT_PATH_SIGNALS.map((item, index) => (
            <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12">
        <FreeCheckForm />
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Practical questions
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The route gets stronger when the business understands what this layer is for.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FAQS.map((item, index) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index === 0} />
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

function ReasonCard({
  title,
  copy,
  highlighted = false,
}: {
  title: string;
  copy: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function FaqCard({
  question,
  answer,
  highlighted = false,
}: {
  question: string;
  answer: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-5" : "system-surface rounded-[1.7rem] p-5"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
