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
  title: "Free Search Presence Snapshot",
  description:
    "Start with the free Cendorq Search Presence Snapshot to get a stronger first signal before Search Presence Scan, Visibility Blueprint, or deeper implementation is chosen.",
  path: "/free-check",
  keywords: [
    "free search presence snapshot",
    "cendorq free snapshot",
    "free visibility snapshot",
    "business visibility first signal",
    "search presence intake",
    "ai search visibility intake",
  ],
  image: {
    alt: "Cendorq Free Search Presence Snapshot — the free first-signal entry point for businesses that need a clearer starting direction.",
  },
});

const FAQS = [
  {
    question: "What is Free Search Presence Snapshot in simple terms?",
    answer:
      "It is the free first-signal entry point inside Cendorq. It helps the business get a clearer first look at whether the real problem is trust, clarity, positioning, action friction, or broader visibility weakness.",
  },
  {
    question: "Who should start here?",
    answer:
      "Most customers should start here when they want a serious first direction without jumping straight into paid diagnostic depth too early.",
  },
  {
    question: "What happens after submission?",
    answer:
      "The business receives a clearer first direction. If the signal shows a stronger need, the next step is usually Search Presence Scan, which becomes the first serious paid diagnostic layer.",
  },
] as const;

const ROUTE_MEANING = [
  {
    title: "This route gives customers a clear first signal without pretending a free form can replace premium strategy.",
    copy:
      "The goal is not to give away the deepest work for free. The goal is to help the customer understand what kind of problem is most likely sitting underneath the surface before the wrong next move gets chosen.",
  },
  {
    title: "This route is built to qualify seriousness and improve the next decision.",
    copy:
      "A better first signal helps both the customer and the system. It reduces confusion, improves fit, and makes it much easier to decide whether Search Presence Scan is the right next step.",
  },
  {
    title: "This route should feel simple to understand and serious enough to trust.",
    copy:
      "Customers understand the system inside out when the free entry point is clear, honest, and focused on direction instead of vanity-audit theater.",
  },
] as const;

const NEXT_PATH_SIGNALS = [
  {
    title: "Stay at free-signal level",
    copy:
      "when the business only needs a first direction and is not ready for a deeper paid diagnostic yet.",
  },
  {
    title: "Move into Search Presence Scan",
    copy:
      "when the first signal shows the business needs a more serious read on what is weakening visibility, trust, positioning, and response.",
  },
  {
    title: "Move into Visibility Blueprint later",
    copy:
      "when Search Presence Scan makes it clear the business needs a deeper strategic explanation before implementation begins.",
  },
] as const;

const WHAT_CUSTOMERS_GET = [
  {
    label: "Clearer starting direction",
    value:
      "A first read on whether the business is most likely dealing with trust, clarity, positioning, action friction, or broader visibility weakness.",
  },
  {
    label: "Better next-step fit",
    value:
      "A clearer sense of whether the business should stay light, move into Search Presence Scan, or plan for deeper strategy later.",
  },
  {
    label: "Lower-risk entry point",
    value:
      "A stronger first move for customers who need direction before they need premium diagnostic depth.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Free Search Presence Snapshot",
    description:
      "The free first-signal layer inside Cendorq for businesses that need a clearer starting direction before paid diagnostic depth is chosen.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Search Presence Snapshot",
    description:
      "A structured free first-read intake designed to improve the quality of the next decision before Search Presence Scan, Visibility Blueprint, or implementation is chosen.",
    path: "/free-check",
    serviceType: "Free visibility first-signal intake",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Search Presence Snapshot", path: "/free-check" },
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
            Free Search Presence Snapshot exists to give the customer a stronger starting direction before paid diagnostic depth begins.
          </h2>

          <div className="mt-8 grid gap-4">
            {ROUTE_MEANING.map((item, index) => (
              <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {NEXT_PATH_SIGNALS.map((item, index) => (
            <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 1} />
          ))}

          {WHAT_CUSTOMERS_GET.map((item, index) => (
            <InfoCard key={item.label} label={item.label} value={item.value} highlighted={index === 0} />
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
            The route gets stronger when customers understand what the free entry point is actually for.
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
            Most serious customers should move into Search Presence Scan before Visibility Blueprint or heavier implementation.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            The free layer exists to improve the next decision, not replace deeper diagnostic work. When the first signal shows the business needs more clarity, Search Presence Scan becomes the strongest next step because it turns the first signal into a serious paid read.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Compare pricing and scope
            </Link>
            <Link
              href="/pricing/full-diagnosis"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              View Visibility Blueprint
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

function InfoCard({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-chip rounded-[1.7rem] p-5" : "system-surface rounded-[1.7rem] p-5"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <p className="mt-3 text-sm leading-7 text-slate-200">{value}</p>
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
