import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const TERMS_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Terms | ${BRAND_NAME}`,
  description: "Cendorq terms for Free Scan, Deep Review, Build Fix, Ongoing Control, customer workspace access, billing, support, and service boundaries.",
  path: "/terms",
  keywords: ["cendorq terms", "free scan terms", "deep review terms", "build fix terms", "ongoing control terms"],
  image: { alt: "Cendorq terms and service boundaries." },
});

const TERMS_SUMMARY = [
  { label: "Core rule", value: "Use the platform honestly and choose the route that matches the customer stage." },
  { label: "Scope rule", value: "One service depth does not silently include another service depth's work." },
  { label: "Outcome rule", value: "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales." },
  { label: "Support rule", value: "Support routes clarify, recover, and review; they do not quietly expand plan scope." },
] as const;

const PLAN_BOUNDARIES = [
  { title: "Free Scan", copy: "A first signal with evidence boundaries, confidence posture, limitations, and the safest next action. It is not full diagnosis, implementation, competitor analysis, full forecasting, or monthly monitoring." },
  { title: "Deep Review", copy: "Evidence-backed diagnosis and decision clarity. It may include competitor comparison and forecast-style risk outlook when evidence allows. It is not done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes." },
  { title: "Build Fix", copy: "Scoped improvement for an approved weak point. It may include a delivery report, before/after summary, and realistic timing expectations. It is not a full diagnostic report, unlimited site work, recurring monitoring, or unapproved production work." },
  { title: "Ongoing Control", copy: "Recurring monitoring and ongoing decision support. It is not unlimited repair work, repeated full review, ad management, or guaranteed ranking/AI placement." },
] as const;

const ACCEPTABLE_USE = [
  "Submit real business information and use the route that matches the purpose.",
  "Do not impersonate others, submit fraudulent information, abuse forms, probe systems, scrape abusively, or interfere with availability or security.",
  "Do not submit passwords, card numbers, private keys, session tokens, or unrelated private evidence through public forms or support messages.",
  "Do not treat private dashboard, report, billing, support, or internal workflow details as public resources.",
] as const;

const COMMERCIAL_RULES = [
  "Prices, deliverables, checkout paths, and plan names may be refined over time, but paid scope follows what was clearly offered at the time of purchase.",
  "Payment for one plan does not convert that plan into unlimited consulting, unlimited implementation, recurring monitoring, or another plan's deliverables.",
  "Delivery may depend on customer cooperation, verified access, approved business details, complete context, required assets, and required pre-delivery checks.",
  "Billing, refund, report correction, legal, or security outcomes require the appropriate review gate before they become commitments.",
] as const;

const CUSTOMER_ROUTES = [
  { title: "Start with Free Scan", href: "/free-check", copy: "Use this when the cause is unclear and a first signal is needed before paid depth." },
  { title: "Compare plans", href: "/plans", copy: "Use this when choosing between diagnosis, scoped fixing, and ongoing control." },
  { title: "Sign in for support", href: "/login", copy: "Use this when you are already a customer and need billing, proof, scope, access, or correction support." },
  { title: "Contact Cendorq", href: "/connect", copy: "Use this only when fit, scope, or timing is already clear outside the dashboard." },
] as const;

const FAQS = [
  { question: "Does Free Scan include Deep Review?", answer: "No. Free Scan is the first signal. Deep Review is a paid evidence-backed diagnosis with a deeper report boundary." },
  { question: "Does Build Fix include unlimited implementation?", answer: "No. Build Fix is scoped work tied to an approved weak point and delivery boundary." },
  { question: "Does Ongoing Control include unlimited repair work?", answer: "No. Ongoing Control provides recurring monitoring and ongoing decision support. Scoped implementation remains separate." },
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function TermsPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Terms", description: "Current terms and service boundaries for Cendorq visibility, readiness, report, and ongoing-control services.", path: "/terms" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <p className="text-sm font-semibold text-slate-400">Terms</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Clear rules keep the customer path impossible to confuse.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">These terms explain current Cendorq service boundaries, acceptable use, commercial expectations, support limits, and customer routes. {TERMS_DATE}.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{TERMS_SUMMARY.map((item) => <InfoCard key={item.label} eyebrow={item.label} title={item.value} />)}</div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-8 sm:px-8 md:grid-cols-2 xl:grid-cols-4" aria-label="Service boundaries">{PLAN_BOUNDARIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}</section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-4 sm:px-8 lg:grid-cols-2">
        <ListPanel title="Acceptable use" items={ACCEPTABLE_USE} />
        <ListPanel title="Commercial and delivery rules" items={COMMERCIAL_RULES} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-4 sm:px-8 md:grid-cols-2 xl:grid-cols-4" aria-label="Customer routes">{CUSTOMER_ROUTES.map((route) => <Link key={route.href} href={route.href} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"><h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{route.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{route.copy}</p></Link>)}</section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-4 sm:px-8 lg:grid-cols-3" aria-label="Terms questions">{FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}</section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Questions about scope?</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Existing customers should sign in for dashboard support. New visitors can start with the Free Scan or contact Cendorq when fit, scope, or timing is already clear.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/login" className={BUTTON_PRIMARY}>Sign in for support</Link><Link href="/free-check" className={BUTTON_SECONDARY}>Start Free Scan</Link><Link href="/privacy" className={BUTTON_SECONDARY}>Read privacy</Link></div>
        </div>
      </section>

      <section className="sr-only" aria-label="Terms validation guardrails">Terms. Free Scan. Deep Review. Build Fix. Ongoing Control. Sign in for support. Contact route /connect. No guaranteed revenue. No guaranteed ranking. No guaranteed AI placement. Service boundaries. Scope does not silently expand.</section>
    </main>
  );
}

function InfoCard({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">{eyebrow ? <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</div> : null}<h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h2>{copy ? <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p> : null}</article>;
}

function ListPanel({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h2><div className="mt-4 grid gap-3">{items.map((item) => <p key={item} className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">{item}</p>)}</div></article>;
}
