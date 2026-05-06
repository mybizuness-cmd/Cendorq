import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const POLICY_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Privacy | ${BRAND_NAME}`,
  description:
    "How Cendorq handles information across Free Scan, paid plans, dashboard access, billing, notifications, support, and customer reports.",
  path: "/privacy",
  keywords: ["cendorq privacy", "free scan privacy", "dashboard privacy", "customer report privacy"],
  image: { alt: "Cendorq privacy and data boundaries." },
});

const PRIVACY_SUMMARY = [
  { label: "Primary purpose", value: "Use information to operate the customer journey safely." },
  { label: "Customer boundary", value: "Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence." },
  { label: "Report boundary", value: "Free Scan, Deep Review, Build Fix, and Ongoing Control outputs stay tied to their plan scope." },
  { label: "Security boundary", value: "Reasonable protections matter, but no online system can guarantee absolute security." },
] as const;

const INFORMATION_CATEGORIES = [
  {
    title: "Account and contact information",
    copy: "Name, business email, business name, website, and contact details used for verification, dashboard access, billing, notifications, and support.",
  },
  {
    title: "Business context",
    copy: "Information you submit for Free Scan, Deep Review, Build Fix, Ongoing Control, or support so Cendorq can understand the business moment and route the next step.",
  },
  {
    title: "Billing and entitlement signals",
    copy: "Plan, checkout, invoice, subscription, entitlement, and payment-status information used to unlock the right workflow without asking for card data in support messages.",
  },
  {
    title: "Technical and usage information",
    copy: "Device, browser, approximate region, page activity, referral, analytics, performance, security, and session signals used to operate and protect the platform.",
  },
] as const;

const USE_CASES = [
  "Verify customer access and route the customer to dashboard, Free Scan continuation, report vault, billing, notifications, or support.",
  "Prepare and deliver plan-specific outputs without blurring Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  "Operate checkout, billing, lifecycle emails, notifications, support requests, correction review, and customer-safe status updates.",
  "Detect abuse, fraud, duplicate submissions, unsafe content, unauthorized access attempts, or platform-integrity issues.",
] as const;

const SHARING_BOUNDARIES = [
  "Cendorq may use trusted service providers for hosting, analytics, communications, security, checkout, billing, and support operations.",
  "Cendorq may disclose information when needed for law, valid legal process, rights protection, security, abuse prevention, or business transfer events.",
  "Cendorq is not built around selling customer personal information as the core operating model described here.",
  "Customer-facing surfaces should show safe summaries, not raw provider payloads, secrets, private internals, or cross-customer data.",
] as const;

const CUSTOMER_CHOICES = [
  { title: "Choose what you submit", copy: "Free Scan and support work best with useful business context, but sensitive secrets should not be submitted." },
  { title: "Ask for review", copy: "Use dashboard support or the contact route for privacy, correction, data, communication, or access questions." },
  { title: "Use browser controls", copy: "Your browser, device, cookie, and email settings may affect certain technical or communication preferences." },
] as const;

const FAQS = [
  {
    question: "Why does Cendorq collect business information?",
    answer: "Business context helps Cendorq produce a useful first signal, diagnose paid-plan questions, route support, and keep the customer journey coherent.",
  },
  {
    question: "Should I send sensitive secrets?",
    answer: "No. Do not submit passwords, card numbers, private keys, session tokens, or unrelated private evidence through Free Scan, contact, or support.",
  },
  {
    question: "Does Cendorq guarantee perfect security?",
    answer: "No. Cendorq may use reasonable safeguards, but no online system can honestly guarantee absolute security in every circumstance.",
  },
] as const;

export default function PrivacyPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Privacy",
    description: "Privacy boundaries for the Cendorq customer journey and plan delivery surfaces.",
    path: "/privacy",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <TrustAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="system-panel-authority relative z-10 rounded-[1.7rem] p-5 sm:p-8">
        <p className="text-sm font-semibold text-cyan-100">Privacy</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Privacy should make the customer journey safer and easier to trust.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          This policy explains how {BRAND_NAME} may collect, use, share, retain, and protect information across Free Scan, paid plans, dashboard access, reports, billing, notifications, and support. {POLICY_DATE}.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PRIVACY_SUMMARY.map((item) => (
            <article key={item.label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Information Cendorq may collect">
        {INFORMATION_CATEGORIES.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-2">
        <BoundaryPanel title="How information may be used" items={USE_CASES} />
        <BoundaryPanel title="Sharing and protection boundaries" items={SHARING_BOUNDARIES} />
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="Customer choices">
        {CUSTOMER_CHOICES.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-2" aria-label="Privacy questions">
        {FAQS.map((item) => (
          <article key={item.question} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="system-panel-authority relative z-10 mt-8 rounded-[1.5rem] p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Need a privacy or data question reviewed?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Use dashboard support if you are already a customer. Use contact if you are not yet inside the dashboard.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open dashboard support</Link>
          <Link href="/connect" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Contact Cendorq</Link>
          <Link href="/terms" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Read terms</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Privacy validation guardrails">
        Current Cendorq privacy language. Free Scan. Deep Review. Build Fix. Ongoing Control. Dashboard support. Contact route /connect. No Search Presence OS. No Search Presence Scan. No Visibility Blueprint. No Presence Infrastructure. No Presence Command. No /contact. No /disclaimer. Safe customer summaries. Plan-specific data boundaries.
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
