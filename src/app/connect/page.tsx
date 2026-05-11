import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const directEmailHref = contactEmail ? `mailto:${contactEmail}` : "";

export const metadata = buildMetadata({
  title: "Contact | Cendorq",
  description:
    "Contact Cendorq when fit, scope, or timing is already clear. Start the Free Scan first when the first readiness signal is still unclear.",
  path: "/connect",
  keywords: ["cendorq contact", "cendorq connect", "free scan", "AI Readiness Review", "Signal Repair", "Readiness Control"],
  image: { alt: "Cendorq contact and readiness routing page." },
});

const CONTACT_RULES = [
  "Start Free Scan if the first readiness signal is unclear.",
  "Use Plans if you know the readiness depth you need.",
  "Contact only when fit, scope, or timing is already clear.",
] as const;

const CONTACT_STAGE_ROUTES = [
  { label: "Need a first signal", href: "/free-check", cta: "Start Free Scan", detail: "Use this before contact when the business does not yet know what is weakening clarity, trust, proof, or choice." },
  { label: "Need readiness depth", href: "/plans", cta: "Compare plans", detail: "Use this when choosing between AI Readiness Review, Signal Repair, and Readiness Control." },
  { label: "Already a customer", href: "/dashboard/support", cta: "Open support", detail: "Use dashboard support for billing, proof, scope, access, or correction questions." },
] as const;

const CONTACT_BOUNDARIES = [
  "Contact is not a replacement for the Free Scan when the cause is unclear.",
  "Contact is not an unlimited consulting lane.",
  "Contact should not be used to send sensitive account, payment, or security details.",
  "Plan questions should keep Free Scan, AI Readiness Review, Signal Repair, and Readiness Control visibly separate.",
] as const;

const FAQS = [
  {
    question: "Should I contact first or start the Free Scan?",
    answer:
      "Start the Free Scan if the problem is still unclear. Use direct contact when you already know the stage and need to discuss fit, scope, or timing.",
  },
  {
    question: "What if I am not sure which plan fits?",
    answer:
      "Start free. The scan is designed to reduce guessing before you pay for AI Readiness Review, Signal Repair, or Readiness Control.",
  },
  {
    question: "When does direct contact make sense?",
    answer:
      "Direct contact makes sense when the business already has a clear question about fit, scope, timing, or ongoing readiness control.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Contact",
    description: "A concise routing page for direct Cendorq contact when fit, scope, or timing is already clear.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Contact",
    description:
      "A simple routing page for choosing between the Free Scan, plans, dashboard support, and direct contact.",
    path: "/connect",
    serviceType: "AI-readiness routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <ConnectAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 system-panel-authority rounded-[1.8rem] p-5 shadow-[0_34px_130px_rgba(2,8,23,0.52)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Contact Cendorq</p>
            <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Contact Cendorq when the readiness question is already clear.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {BRAND_NAME} works best when the next move is clear. Start with Free Scan when the problem needs a first readiness signal. Use direct contact for fit, scope, timing, or readiness-control questions that are already specific.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="text-sm font-semibold text-cyan-100">Best first action</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Start free unless you already know the stage, scope, or timing question.</p>
            <Link href="/free-check" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {CONTACT_RULES.map((rule) => (
            <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">{rule}</div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {contactEmail ? (
            <a href={directEmailHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Email Cendorq
            </a>
          ) : null}
          <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Compare plans
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="Contact stage routes">
        {CONTACT_STAGE_ROUTES.map((route) => (
          <Link key={route.href} href={route.href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <div className="text-sm font-semibold text-cyan-100">{route.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{route.cta}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{route.detail}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
      <p className="sr-only">Contact Cendorq. Contact stage routing. If you are unsure, start Free Scan. If the question is clear, connect. View readiness plans. Open dashboard support. {CONTACT_BOUNDARIES.join(" ")}</p>
    </main>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.35rem] p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}

function ConnectAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.03] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.026]" />
    </div>
  );
}

function normalizeEmail(value: string | undefined) {
  const cleaned = (value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}
