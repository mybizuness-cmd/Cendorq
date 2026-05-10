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
  title: `AI readiness privacy | ${BRAND_NAME}`,
  description:
    "How Cendorq protects AI-readiness context, Free Scan inputs, paid reports, dashboard access, billing, notifications, support data, and private customer documents.",
  path: "/privacy",
  keywords: ["cendorq privacy", "AI readiness privacy", "free scan privacy", "dashboard privacy", "customer report privacy", "report vault privacy"],
  image: { alt: "Cendorq AI readiness privacy and protected customer data boundaries." },
});

const PRIVACY_SUMMARY = [
  { label: "Purpose", value: "Use information to operate the customer journey, report path, billing state, support route, and safest next action." },
  { label: "Customer boundary", value: "Do not submit passwords, card numbers, private keys, tokens, provider secrets, or unrelated private evidence." },
  { label: "Private surface", value: "Reports, billing records, dashboard messages, support status, and customer documents stay verified, scoped, and protected." },
  { label: "Security boundary", value: "Cendorq uses practical safeguards and recovery paths; no online system can honestly guarantee absolute security." },
] as const;

const PRIVACY_OPERATING_FRAME = [
  {
    title: "Collect what helps the work",
    copy: "Cendorq should collect useful business context, customer access data, billing state, and support context only when it helps operate the readiness journey, verify ownership, deliver reports, or protect the platform.",
  },
  {
    title: "Keep private data out of public discovery",
    copy: "Public pages may be indexable. Customer reports, dashboard state, billing documents, support records, private evidence, prompts, scoring details, and customer-owned files should not be public search content.",
  },
  {
    title: "Use safe summaries",
    copy: "Customer-facing messages can explain what happened, what is known, what is next, and where to act without exposing raw provider payloads, raw evidence dumps, private prompts, exact scoring weights, or cross-customer data.",
  },
  {
    title: "Recover without exposing",
    copy: "If an email is missed, a document is gated, or support is needed, the verified dashboard, report vault, billing center, or support status should show the safest customer-owned recovery path.",
  },
] as const;

const INFORMATION_CATEGORIES = [
  {
    title: "Account and contact information",
    copy: "Name, business email, business name, website, and contact details used for verification, dashboard access, billing, notifications, and support.",
  },
  {
    title: "Business context",
    copy: "Information submitted for Free Scan, AI Readiness Review, Signal Repair, Readiness Control, or support so Cendorq can understand the business moment and route the next step.",
  },
  {
    title: "Billing and entitlement signals",
    copy: "Plan, checkout, invoice, subscription, entitlement, and payment-status information used to unlock the right workflow without asking for card data in support messages.",
  },
  {
    title: "Technical and security signals",
    copy: "Device, browser, approximate region, referral, analytics, performance, security, session, abuse-prevention, and availability signals used to operate and protect the platform.",
  },
] as const;

const USE_CASES = [
  "Verify customer access and route the customer to dashboard, Free Scan continuation, readiness proof vault, billing, notifications, or support.",
  "Prepare and deliver readiness-specific outputs without blurring Free Scan, AI Readiness Review, Signal Repair, and Readiness Control.",
  "Operate checkout, billing, lifecycle emails, notifications, support requests, correction review, customer-safe status updates, and report-vault recovery.",
  "Detect abuse, fraud, duplicate submissions, unsafe content, unauthorized access attempts, malware-like behavior, scraping, or platform-integrity issues.",
] as const;

const SHARING_BOUNDARIES = [
  "Cendorq may use trusted service providers for hosting, analytics, communications, security, checkout, billing, document delivery, and support operations.",
  "Cendorq may disclose information when needed for law, valid legal process, rights protection, security, abuse prevention, incident response, or business transfer events.",
  "Cendorq is not built around selling customer personal information as the core operating model described here.",
  "Customer-facing surfaces should show safe summaries, not raw provider payloads, secrets, private internals, exact scoring weights, private prompts, or cross-customer data.",
] as const;

const SECURITY_BOUNDARIES = [
  "Private dashboards, reports, billing documents, support records, customer messages, and customer-specific files require verified access, authorization, entitlement, provider authority, release state, or document-safety checks where applicable.",
  "Robots.txt, sitemap omission, or public obscurity is not a privacy control. Protected customer data should be kept behind real access controls and noindex/no-store boundaries where appropriate.",
  "Cendorq may review, block, quarantine, redact, suppress, or delay unsafe content, suspicious submissions, suspicious documents, or risky delivery paths when protection requires it.",
  "If a security, privacy, report, billing, or support issue is suspected, Cendorq should prioritize containment, verified facts, safe customer communication, correction paths, and recovery.",
] as const;

const CUSTOMER_CHOICES = [
  { title: "Choose what you submit", copy: "Free Scan and support work best with useful business context, but sensitive secrets should not be submitted." },
  { title: "Ask for review", copy: "Use dashboard support or the Free Scan route for privacy, correction, data, communication, document, or access questions." },
  { title: "Use browser controls", copy: "Your browser, device, cookie, and email settings may affect certain technical or communication preferences." },
] as const;

const FAQS = [
  {
    question: "Why does Cendorq collect business information?",
    answer: "Business context helps Cendorq produce a useful first signal, review paid-plan questions, route support, operate billing and access, and keep the customer journey coherent.",
  },
  {
    question: "Should I send sensitive secrets?",
    answer: "No. Do not submit passwords, card numbers, private keys, session tokens, provider secrets, or unrelated private evidence through Free Scan or support.",
  },
  {
    question: "Does Cendorq guarantee perfect security?",
    answer: "No. Cendorq may use reasonable safeguards, access controls, monitoring, and recovery paths, but no online system can honestly guarantee absolute security in every circumstance.",
  },
] as const;

export default function PrivacyPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq AI Readiness Privacy",
    description: "Privacy boundaries for the Cendorq AI-readiness journey, reports, billing, dashboard messages, support, and plan-depth delivery surfaces.",
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

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 shadow-[0_34px_130px_rgba(2,8,23,0.52)] sm:p-8">
        <p className="text-sm font-semibold text-cyan-100">AI readiness privacy</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Trust starts with knowing what data belongs in the system and what never should.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          This policy explains how {BRAND_NAME} may collect, use, share, retain, protect, and recover information across Free Scan, paid readiness depth, dashboard access, reports, billing, notifications, documents, and support. {POLICY_DATE}.
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

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Privacy operating frame">
        {PRIVACY_OPERATING_FRAME.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
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

      <section className="relative z-10 mt-8">
        <BoundaryPanel title="Security, indexing, and recovery boundaries" items={SECURITY_BOUNDARIES} />
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="Customer choices">
        {CUSTOMER_CHOICES.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3" aria-label="Privacy questions">
        {FAQS.map((item) => (
          <article key={item.question} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="system-panel-authority relative z-10 mt-8 rounded-[1.55rem] p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">Need a privacy or data question reviewed?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Use dashboard support if you are already a customer. Start with the Free Scan if you are not yet inside the dashboard.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open dashboard support</Link>
          <Link href="/free-check" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Start Free Scan</Link>
          <Link href="/terms" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Read terms</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Privacy validation guardrails">
        AI readiness privacy. Privacy operating frame. Public pages may be indexable. Private reports, billing, dashboard, support, and customer documents stay protected. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Dashboard support. Free Scan route /free-check. Safe customer summaries. Readiness-specific data boundaries. No raw secrets. No private payment details. No cross-customer data. No raw provider payloads. No exact scoring weights. No private prompts. No customer-specific files in public search.
      </section>
    </main>
  );
}

function BoundaryPanel({ title, items }: { title: readonly string[] extends never ? never : string; items: readonly string[] }) {
  return (
    <article className="system-panel-authority rounded-[1.55rem] p-5 sm:p-6">
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
      <div className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.03] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.026]" />
    </div>
  );
}
