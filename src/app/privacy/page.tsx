import Link from "next/link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

const BRAND_NAME = "Cendorq";
const POLICY_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Privacy | ${BRAND_NAME}`,
  description: "How Cendorq handles scan context, reports, dashboard access, billing, notifications, and support data.",
  path: "/privacy",
  keywords: ["cendorq privacy", "scan privacy", "dashboard privacy", "customer report privacy"],
  image: { alt: "Cendorq privacy boundaries." },
});

const PRIVACY_POINTS = [
  {
    title: "What we use",
    copy: "Business name, website, email, submitted context, plan, billing, support, device, usage, security, and communication signals needed to operate Cendorq.",
  },
  {
    title: "Why we use it",
    copy: "To run scans, prepare customer-safe outputs, verify access, route support, operate billing, improve reliability, and protect the platform from abuse.",
  },
  {
    title: "What not to send",
    copy: "Do not submit passwords, card numbers, private keys, session tokens, unrelated private evidence, or sensitive credentials.",
  },
  {
    title: "How sharing works",
    copy: "Trusted providers may support hosting, analytics, communications, security, checkout, billing, and support. Cendorq is not built around selling customer personal information.",
  },
] as const;

const FAQS = [
  {
    question: "Should I send sensitive secrets?",
    answer: "No. Do not submit passwords, card numbers, private keys, session tokens, or unrelated private evidence.",
  },
  {
    question: "Does Cendorq guarantee perfect security?",
    answer: "No online system can honestly promise absolute security. Cendorq uses reasonable safeguards and keeps customer surfaces tied to verified access.",
  },
] as const;

const PRIMARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <PrivacyAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-14" aria-label="Privacy policy">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Privacy · {POLICY_DATE}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Privacy should be clear.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq uses business and account context to run scans, protect access, deliver reports, route support, and operate billing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support" className={PRIMARY_LINK_CLASS}>Open Support</Link>
            <Link href="/terms" className={SECONDARY_LINK_CLASS}>Read Terms</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Privacy summary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Core boundaries</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {PRIVACY_POINTS.map((item) => (
                <article key={item.title} className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 rounded-[1.15rem] border border-cyan-100 bg-cyan-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
              Customer-facing surfaces should show useful summaries, not raw provider payloads, secrets, private internals, or cross-customer data.
            </div>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Privacy validation anchors">
        Privacy. One clear page. Open Support. Read Terms. No crowded privacy read order. No information wall. No customer choices grid. No Start Free Scan label. Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence. Reasonable safeguards, not absolute security guarantees.
      </section>
    </main>
  );
}

function PrivacyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
