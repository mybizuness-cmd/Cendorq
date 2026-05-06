import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const TERMS_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Terms | ${BRAND_NAME}`,
  description:
    "Cendorq terms for plan boundaries, acceptable use, customer reports, billing, support, and platform access.",
  path: "/terms",
  keywords: ["cendorq terms", "free scan terms", "deep review terms", "build fix terms", "ongoing control terms"],
  image: { alt: "Cendorq terms and service boundaries." },
});

const TERMS_SUMMARY = [
  { label: "Core rule", value: "Use the platform honestly and choose the route that matches the customer stage." },
  { label: "Scope rule", value: "One plan does not silently include another plan's work." },
  { label: "Outcome rule", value: "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales." },
  { label: "Support rule", value: "Support routes clarify, recover, and review; they do not quietly expand plan scope." },
] as const;

const PLAN_BOUNDARIES = [
  { title: "Free Scan", copy: "A first signal with evidence boundaries, confidence posture, limitations, and the safest next action. It is not full diagnosis, implementation, or monthly monitoring." },
  { title: "Deep Review", copy: "Cause-level diagnosis and decision clarity. It is not done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes." },
  { title: "Build Fix", copy: "Scoped implementation for an approved target. It is not a full diagnostic report, unlimited site work, recurring monitoring, or unapproved production work." },
  { title: "Ongoing Control", copy: "Recurring monitoring and monthly decision support. It is not unlimited Build Fix work, repeated full Deep Review, ad management, or guaranteed ranking/AI placement." },
] as const;

const ACCEPTABLE_USE = [
  "Submit real business information and use the route that matches the purpose.",
  "Do not impersonate others, submit fraudulent information, abuse forms, probe systems, scrape abusively, or interfere with availability or security.",
  "Do not submit passwords, card numbers, private keys, session tokens, or unrelated private evidence through public forms or support messages.",
  "Do not treat private dashboard, report, billing, support, command-center, or internal workflow details as public resources.",
] as const;

const COMMERCIAL_RULES = [
  "Prices, deliverables, checkout paths, and plan names may be refined over time, but paid scope follows what was clearly offered at the time of purchase.",
  "Payment for one plan does not convert that plan into unlimited consulting, unlimited implementation, recurring monitoring, or another plan's deliverables.",
  "Delivery may depend on customer cooperation, verified access, approved business details, complete context, and required pre-delivery checks.",
  "Billing, refund, report correction, legal, or security outcomes require the appropriate review gate before they become commitments.",
] as const;

const CUSTOMER_ROUTES = [
  { title: "Start with Free Scan", href: "/free-check", copy: "Use this when the cause is unclear and a first signal is needed before paid depth." },
  { title: "Compare pricing", href: "/plans", copy: "Use this when choosing between diagnosis, scoped implementation, and monthly control." },
  { title: "Open dashboard support", href: "/dashboard/support", copy: "Use this when you are already a customer and need billing, report, scope, access, or correction support." },
  { title: "Contact Cendorq", href: "/connect", copy: "Use this only when fit, scope, or timing is already clear outside the dashboard." },
] as const;

const FAQS = [
  {
    question: "Does Free Scan include Deep Review?",
    answer: "No. Free Scan is the first signal. Deep Review is a paid cause-level diagnosis with a deeper report boundary.",
  },
  {
    question: "Does Build Fix include unlimited implementation?",
    answer: "No. Build Fix is scoped implementation tied to an approved target and delivery boundary.",
  },
  {
    question: "Does Ongoing Control include unlimited Build Fix work?",
    answer: "No. Ongoing Control provides recurring monitoring and monthly decision support. Scoped implementation remains separate.",
  },
] as const;

export default function TermsPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Terms",
    description: "Current terms and service boundaries for Cendorq plans and platform use.",
    path: "/terms",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms", path: "/terms" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <TrustAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="system-panel-authority relative z-10 rounded-[1.7rem] p-5 sm:p-8">
        <p className="text-sm font-semibold text-cyan-100">Terms</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Clear rules keep the plan path impossible to confuse.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          These terms explain current Cendorq service boundaries, acceptable use, commercial expectations, support limits, and customer routes. {TERMS_DATE}.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TERMS_SUMMARY.map((item) => (
            <article key={item.label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Plan service boundaries">
        {PLAN_BOUNDARIES.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-2">
        <BoundaryPanel title="Acceptable use" items={ACCEPTABLE_USE} />
        <BoundaryPanel title="Commercial and delivery rules" items={COMMERCIAL_RULES} />
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Customer routes">
        {CUSTOMER_ROUTES.map((route) => (
          <Link key={route.href} href={route.href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <h2 className="text-xl font-semibold tracking-tight text-white">{route.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{route.copy}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3" aria-label="Terms questions">
        {FAQS.map((item) => (
          <article key={item.question} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="system-panel-authority relative z-10 mt-8 rounded-[1.5rem] p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Questions about scope?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Use dashboard support if you are already a customer. Use contact if the question is clear and you are outside the dashboard.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open dashboard support</Link>
          <Link href="/connect" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Contact Cendorq</Link>
          <Link href="/privacy" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Read privacy</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Terms validation guardrails">
        Current Cendorq terms language. Free Scan. Deep Review. Build Fix. Ongoing Control. Dashboard support. Contact route /connect. No Search Presence OS. No Search Presence Scan. No Visibility Blueprint. No Presence Infrastructure. No Presence Command. No /contact. No /disclaimer. No guaranteed revenue. No guaranteed ranking. No guaranteed AI placement.
      </section>
    </main>
  );
}

function BoundaryPanel({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="system-panel-authority rounded-[1.5rem] p-5 sm:p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">{item}</p>
        ))}
      </div>
    </article>
  );
}

function TrustAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}
