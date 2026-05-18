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
const SUPPORT_EMAIL = "support@cendorq.com";
const directEmailHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Cendorq Contact Us")}`;

export const metadata = buildMetadata({
  title: "Contact Us | Cendorq",
  description:
    "Contact Cendorq when fit, scope, or timing is already clear. Start the Free Scan first when the first visibility or readiness signal is still unclear.",
  path: "/connect",
  keywords: ["contact Cendorq", "Cendorq contact us", "free scan", "AI visibility", "AI readiness", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq Contact Us routing page." },
});

const CONTACT_RULES = [
  "Start Free Scan if the first visibility or readiness signal is unclear.",
  "Use Plans if you know the depth you need.",
  "Contact us only when fit, scope, or timing is already clear.",
] as const;

const CONTACT_STAGE_ROUTES = [
  { label: "Need a first signal", href: "/free-check", cta: "Start Free Scan", detail: "Use this before contacting us when the business does not yet know what is weakening visibility, clarity, trust, proof, or choice." },
  { label: "Need to choose a plan", href: "/plans", cta: "Compare plans", detail: "Use this when choosing between Deep Review, Build Fix, and Ongoing Control." },
  { label: "Already a customer", href: "/dashboard/support", cta: "Open support", detail: "Use dashboard support for billing, proof, scope, access, or correction questions." },
] as const;

const CONTACT_BOUNDARIES = [
  "Contact Us is not a replacement for the Free Scan when the cause is unclear.",
  "Contact Us is not an unlimited consulting lane.",
  "Contact Us should not be used to send sensitive account, payment, or security details.",
  "Contact Us uses direct email to support@cendorq.com so the reply address comes from the customer's inbox.",
  "Plan questions should keep Free Scan, Deep Review, Build Fix, and Ongoing Control visibly separate.",
] as const;

const FAQS = [
  {
    question: "Should I contact you first or start the Free Scan?",
    answer:
      "Start the Free Scan if the problem is still unclear. Contact us when you already know the stage and need to discuss fit, scope, or timing.",
  },
  {
    question: "What if I am not sure which plan fits?",
    answer:
      "Start free. The scan is designed to reduce guessing before you pay for Deep Review, Build Fix, or Ongoing Control.",
  },
  {
    question: "When does Contact Us make sense?",
    answer:
      "Contact Us makes sense when the business already has a clear question about fit, scope, timing, or ongoing visibility and readiness control.",
  },
  {
    question: "How will Cendorq reply?",
    answer:
      "Email support@cendorq.com from the email address where you want the reply. Include your business name, website, and the email used for your Free Scan or plan if you already have one.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Contact Us",
    description: "A concise routing page for contacting Cendorq when fit, scope, or timing is already clear.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Contact Us",
    description:
      "A simple routing page for choosing between the Free Scan, plans, dashboard support, and direct contact.",
    path: "/connect",
    serviceType: "AI visibility and readiness contact routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/connect" },
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
            <p className="text-sm font-semibold text-cyan-100">Contact Us</p>
            <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Contact us when the next question is already clear.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {BRAND_NAME} works best when the next move is clear. Start with Free Scan when you need the first visibility or readiness signal. Contact us for fit, scope, timing, or ongoing control questions that are already specific.
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

        <div className="mt-7 rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
          <h2 className="text-base font-semibold text-cyan-100">Email us directly</h2>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            Send your message to <a href={directEmailHref} className="font-bold text-white underline decoration-cyan-200 underline-offset-4">{SUPPORT_EMAIL}</a> from the email address where you want the reply. Include your business name, website, and the email used for your Free Scan or plan if you already have one.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={directEmailHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Email Support
          </a>
          <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Compare plans
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="Contact Us stage routes">
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
      <p className="sr-only">Contact Us with Cendorq. Contact Us stage routing. If you are unsure, start Free Scan. If the question is clear, contact us. Email support@cendorq.com from the address where you want the reply. View plans. Open dashboard support. {CONTACT_BOUNDARIES.join(" ")}</p>
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
