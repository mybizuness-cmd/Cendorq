import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const POLICY_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Privacy | ${BRAND_NAME}`,
  description: "How Cendorq handles Free Scan context, customer reports, dashboard access, billing, notifications, and support data.",
  path: "/privacy",
  keywords: ["cendorq privacy", "free scan privacy", "dashboard privacy", "customer report privacy"],
  image: { alt: "Cendorq privacy boundaries." },
});

const PRIVACY_SUMMARY = [
  { label: "Business context", value: "We use the details needed to run the scan, prepare reports, route support, and keep the customer journey connected." },
  { label: "Customer surfaces", value: "Dashboard, billing, notifications, reports, and support stay tied to verified customer access and service depth." },
  { label: "Safe summaries", value: "Customer-facing views should show useful summaries, not raw provider payloads, secrets, or cross-customer data." },
] as const;

const PRIVACY_READ_ORDER = [
  ["Submit carefully", "Use Free Scan and support for useful business context, not passwords, card data, private keys, tokens, or unrelated private evidence."],
  ["Use verified access", "Reports, billing, notifications, and support should stay behind customer access and safe customer summaries."],
  ["Ask for review", "Use dashboard support for privacy, correction, data, communication, or access questions tied to your customer record."],
] as const;

const INFORMATION_CATEGORIES = [
  {
    title: "Account and contact details",
    copy: "Your name, business email, business name, website, and contact details help verify access, deliver updates, and route support.",
  },
  {
    title: "Business context",
    copy: "Submitted details help Cendorq understand what customers see, where they may hesitate, and what next step fits.",
  },
  {
    title: "Billing and plan signals",
    copy: "Checkout, invoice, subscription, entitlement, and payment-status signals help unlock the right customer workflow.",
  },
  {
    title: "Technical and usage signals",
    copy: "Browser, device, approximate region, page activity, referral, analytics, performance, security, and session signals help operate and protect the platform.",
  },
] as const;

const USE_CASES = [
  "Verify customer access and route you to the right dashboard, scan, report, billing, notification, or support surface.",
  "Prepare and deliver the right customer output without mixing Free Scan, Deep Review, Build Fix, and Ongoing Control boundaries.",
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
  { title: "Choose what you submit", copy: "Your scan and support request work best with useful business context. Sensitive secrets should stay out." },
  { title: "Ask for review", copy: "Use dashboard support for privacy, correction, data, communication, or access questions." },
  { title: "Use browser controls", copy: "Your browser, device, cookie, and email settings may affect technical or communication preferences." },
] as const;

const FAQS = [
  {
    question: "Why does Cendorq collect business information?",
    answer: "Business context helps Cendorq produce a useful first signal, review paid-plan questions, route support, and keep your customer journey coherent.",
  },
  {
    question: "Should I send sensitive secrets?",
    answer: "No. Do not submit passwords, card numbers, private keys, session tokens, or unrelated private evidence through Free Scan or support.",
  },
  {
    question: "Does Cendorq guarantee perfect security?",
    answer: "No. Cendorq uses reasonable safeguards, but no online system can honestly promise absolute security in every circumstance.",
  },
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function PrivacyPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Privacy",
    description: "Privacy boundaries for the Cendorq customer journey and delivery surfaces.",
    path: "/privacy",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <LegalAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end" aria-label="Privacy overview">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{POLICY_DATE}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">
            Privacy should be clear before trust is asked for.
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This policy explains how {BRAND_NAME} may collect, use, share, retain, and protect information across Free Scan, paid work, dashboard access, reports, billing, notifications, and support.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Privacy posture</p>
          <div className="mt-5 grid gap-3">
            {PRIVACY_SUMMARY.map((item) => (
              <InfoCard key={item.label} title={item.label} copy={item.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Privacy read order">
        <div className="grid gap-3 md:grid-cols-3">
          {PRIVACY_READ_ORDER.map(([label, copy]) => (
            <article key={label} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-sm font-black text-cyan-700">{label}</div>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Information Cendorq may collect">
        <div className="rounded-[2.15rem] border border-white/85 bg-white/84 p-5 shadow-[0_18px_60px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <h2 className="text-[clamp(2rem,6vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.074em] text-slate-950">What information may be used.</h2>
            <p className="text-base font-semibold leading-8 text-slate-600">Cendorq needs enough context to produce useful customer-safe outputs, route account access, and protect the platform.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {INFORMATION_CATEGORIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[92rem] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-2">
        <ListPanel title="How your information may be used" items={USE_CASES} />
        <ListPanel title="Sharing and protection boundaries" items={SHARING_BOUNDARIES} />
      </section>

      <section className="mx-auto grid max-w-[92rem] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[0.62fr_0.38fr]">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Your choices stay part of the system.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {CUSTOMER_CHOICES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
          </div>
        </div>
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">Questions?</h2>
          <div className="mt-4 grid gap-3">
            {FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-4 pb-16 sm:px-6">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-6 shadow-[0_16px_45px_rgba(14,165,233,0.06)] backdrop-blur sm:p-8">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Need a privacy or data question reviewed?</h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">Use dashboard support if you are already a customer. Start with the Free Scan if you are not yet inside the dashboard.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support" className={BUTTON_PRIMARY}>Open dashboard support</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Start Free Scan</Link>
            <Link href="/terms" className={BUTTON_SECONDARY}>Read terms</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Privacy validation guardrails">
        Privacy. Market trust privacy. Privacy read order. Submit carefully. Use verified access. Ask for review. Free Scan. Deep Review. Build Fix. Ongoing Control. dashboard support. /connect. Command-specific data boundaries. Safe customer summaries. Readiness-specific data boundaries. No raw secrets. No private payment details. No cross-customer data. reasonable safeguards. no online system can honestly guarantee absolute security. Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence. Run Free Scan.
      </section>
    </main>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return <article className="rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm"><h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p></article>;
}

function ListPanel({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6"><h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{title}</h2><div className="mt-5 grid gap-2">{items.map((item) => <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">{item}</p>)}</div></article>;
}

function LegalAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
