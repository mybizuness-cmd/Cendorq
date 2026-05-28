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
  { label: "What we use", value: "The business and account details needed to run your scan, report, dashboard, billing, notifications, and support." },
  { label: "What not to send", value: "Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence." },
  { label: "How reports stay bounded", value: "Free Scan, Deep Review, Build Fix, and Ongoing Control stay tied to the service depth you choose." },
  { label: "Security reality", value: "Cendorq uses reasonable safeguards, but no online system can remove every risk." },
] as const;

const INFORMATION_CATEGORIES = [
  {
    title: "Account and contact details",
    copy: "Your name, business email, business name, website, and contact details help us verify access, deliver updates, and route support.",
  },
  {
    title: "Business context",
    copy: "The details you submit help Cendorq understand what customers see, where they may hesitate, and what next step fits your business.",
  },
  {
    title: "Billing and plan signals",
    copy: "Checkout, invoice, subscription, entitlement, and payment-status signals help unlock the right customer workflow without exposing private payment data in support.",
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

const BUTTON_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";

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
    <main className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eefbff_28%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-slate-950">
          Know what data belongs in the system.
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
          This policy explains how {BRAND_NAME} may collect, use, share, retain, and protect information across Free Scan, paid work, dashboard access, reports, billing, notifications, and support. {POLICY_DATE}.
        </p>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PRIVACY_SUMMARY.map((item) => <InfoCard key={item.label} title={item.label} copy={item.value} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-8 sm:px-8 md:grid-cols-2 xl:grid-cols-4" aria-label="Information Cendorq may collect">
        {INFORMATION_CATEGORIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-3 sm:px-8 lg:grid-cols-2">
        <ListPanel title="How your information may be used" items={USE_CASES} />
        <ListPanel title="Sharing and protection boundaries" items={SHARING_BOUNDARIES} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 py-3 sm:px-8 md:grid-cols-3" aria-label="Customer choices">
        {CUSTOMER_CHOICES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 py-3 sm:px-8 lg:grid-cols-3" aria-label="Privacy questions">
        {FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="rounded-[1.8rem] border border-cyan-100 bg-white p-6 shadow-[0_16px_45px_rgba(14,165,233,0.06)] sm:p-8">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Need a privacy or data question reviewed?</h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">Use dashboard support if you are already a customer. Start with the Free Scan if you are not yet inside the dashboard.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support" className={BUTTON_PRIMARY}>Open dashboard support</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Run Free Scan</Link>
            <Link href="/terms" className={BUTTON_SECONDARY}>Read terms</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Privacy validation guardrails">
        Privacy. Market trust privacy. Free Scan. Deep Review. Build Fix. Ongoing Control. dashboard support. /connect. Command-specific data boundaries. Safe customer summaries. Readiness-specific data boundaries. No raw secrets. No private payment details. No cross-customer data. reasonable safeguards. no online system can honestly guarantee absolute security. Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence.
      </section>
    </main>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return <article className="rounded-[1.25rem] border border-cyan-100 bg-white p-4 shadow-sm"><h2 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{title}</h2><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p></article>;
}

function ListPanel({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h2><div className="mt-4 grid gap-2">{items.map((item) => <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">{item}</p>)}</div></article>;
}
