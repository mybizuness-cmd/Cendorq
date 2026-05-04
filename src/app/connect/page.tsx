import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const directEmailHref = contactEmail ? `mailto:${contactEmail}` : "";

export const metadata = buildMetadata({
  title: "Connect | Cendorq",
  description:
    "Choose the right Cendorq next move: start the free scan, view pricing, or contact Cendorq when fit and scope are already clear.",
  path: "/connect",
  keywords: ["cendorq connect", "cendorq contact", "free scan", "pricing", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq connect page." },
});

const CONTACT_RULES = [
  "Start free if the problem is unclear.",
  "View pricing if you know the depth you need.",
  "Contact when fit, scope, or timing is already clear.",
] as const;

const FAQS = [
  {
    question: "Should I contact first or start the free scan?",
    answer:
      "Start the free scan if the problem is still unclear. Use direct contact when you already know the stage and need to discuss fit, scope, or timing.",
  },
  {
    question: "What if I am not sure which plan fits?",
    answer:
      "Start free. The scan is designed to reduce guessing before you pay for deeper review, implementation, or monthly control.",
  },
  {
    question: "When does direct contact make sense?",
    answer:
      "Direct contact makes sense when the business already has a clear question about scope, timing, or ongoing control.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Connect",
    description: "A concise routing page that helps businesses choose the right next Cendorq move.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Connection Routing",
    description:
      "A simple routing page for choosing between the free scan, pricing, and direct contact.",
    path: "/connect",
    serviceType: "Business command routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Connect", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <ConnectAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <TopChip>Choose the right lane</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            If you are unsure, start free. If the question is clear, connect.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} works best when the business enters the right lane. The Free Scan finds the first pressure. Pricing shows the deeper paths. Contact is for fit, scope, and timing when the question is already sharp.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              View pricing
            </Link>
          </div>
        </div>

        <div className="system-panel-authority rounded-[2.25rem] p-6 sm:p-8">
          <TopChip>Direct contact</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Use contact for clear fit and scope questions.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Direct contact should not replace the first read when the business still needs clarity. It is strongest when you already know the stage and need to discuss fit, scope, timing, or ongoing control.
          </p>
          <div className="mt-6 grid gap-2">
            {CONTACT_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">{rule}</div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {contactEmail ? (
              <a href={directEmailHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
                Email Cendorq
              </a>
            ) : null}
            <Link href="/free-check" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free instead
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
    </main>
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

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function ConnectAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function normalizeEmail(value: string | undefined) {
  const cleaned = (value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}
