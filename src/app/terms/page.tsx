import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const TERMS_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Terms | ${BRAND_NAME}`,
  description: "Cendorq terms for Free Scan, Deep Review, Build Fix, Ongoing Control, customer account access, billing, support, and service boundaries.",
  path: "/terms",
  keywords: ["cendorq terms", "free scan terms", "deep review terms", "build fix terms", "ongoing control terms"],
  image: { alt: "Cendorq terms and service boundaries." },
});

const TERMS_SUMMARY = [
  { label: "Use the right route", value: "Start where your question actually is: first signal, deeper review, scoped repair, or ongoing control." },
  { label: "Scope stays clear", value: "One service depth does not silently include another service depth's work." },
  { label: "Outcomes stay honest", value: "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales." },
] as const;

const PLAN_BOUNDARIES = [
  { title: "Free Scan", copy: "A first signal with evidence boundaries, confidence posture, limitations, and the safest next action. It is not a full review, implementation, competitor analysis, full forecasting, or monthly monitoring." },
  { title: "Deep Review", copy: "Evidence-backed review and decision clarity. It may include competitor comparison and forecast-style risk outlook when evidence allows. It is not done-for-you implementation, unlimited revisions, ad management, or promised outcomes." },
  { title: "Build Fix", copy: "Scoped implementation for an approved weak point. It may include a delivery report, before/after summary, and realistic timing expectations. It is not a full review report, unlimited site work, recurring monitoring, or unapproved production work." },
  { title: "Ongoing Control", copy: "Recurring monitoring and monthly decision support. It is not unlimited repair work, repeated full review, ad management, or promised ranking or AI placement." },
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
  { title: "Run Free Scan", href: "/free-check", copy: "Use this when the cause is unclear and a first signal is needed before paid depth." },
  { title: "Compare plans", href: "/plans", copy: "Use this when choosing between review, scoped repair, and ongoing control." },
  { title: "Log in for support", href: "/login", copy: "Use this when you are already a customer and need billing, proof, scope, access, or correction support." },
  { title: "Contact Cendorq", href: "/connect", copy: "Use this only when fit, scope, or timing is already clear outside the dashboard." },
] as const;

const FAQS = [
  { question: "Does Free Scan include Deep Review?", answer: "No. Free Scan is the first signal. Deep Review is a paid evidence-backed review with a deeper report boundary." },
  { question: "Does Build Fix include unlimited implementation?", answer: "No. Build Fix is scoped implementation tied to an approved weak point and delivery boundary." },
  { question: "Does Ongoing Control include unlimited repair work?", answer: "No. Ongoing Control provides recurring monitoring and monthly decision support. Scoped implementation remains separate." },
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";

export default function TermsPage() {
  const webPageJsonLd = buildWebPageJsonLd({ title: "Cendorq Terms", description: "Current terms and service boundaries for Cendorq visibility, readiness, report, and ongoing-control services.", path: "/terms" });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.26),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_36%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative px-5 py-10 sm:px-8 lg:py-14" aria-label="Terms overview">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-cyan-700">{TERMS_DATE}</p>
            <h1 className="mt-4 max-w-5xl text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
              Know what each step includes before you choose it.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              These terms explain current Cendorq service boundaries, acceptable use, commercial expectations, support limits, and customer routes.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.09)] backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Terms posture</p>
            <div className="mt-4 grid gap-3">
              {TERMS_SUMMARY.map((item) => <InfoCard key={item.label} title={item.label} copy={item.value} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Service boundaries">
        <div className="rounded-[2rem] border border-white/85 bg-white/84 p-5 shadow-[0_18px_60px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <h2 className="text-[clamp(2rem,6vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.074em] text-slate-950">Every plan has a boundary.</h2>
            <p className="text-base font-semibold leading-8 text-slate-600">Free Scan, Deep Review, Build Fix, and Ongoing Control are separate depths. One service depth does not silently include another.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {PLAN_BOUNDARIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-10 sm:px-8 lg:grid-cols-2">
        <ListPanel title="Acceptable use" items={ACCEPTABLE_USE} />
        <ListPanel title="Commercial and delivery rules" items={COMMERCIAL_RULES} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Customer routes">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Use the route that matches the question.</h2>
            <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base">The fastest path depends on whether you need a first signal, plan comparison, dashboard support, or fit/scope contact.</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {CUSTOMER_ROUTES.map((route) => <Link key={route.href} href={route.href} className="rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"><h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{route.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{route.copy}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 lg:grid-cols-[0.44fr_0.56fr]">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_16px_45px_rgba(14,165,233,0.06)] sm:p-8">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Questions about scope?</h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">Existing customers should log in for dashboard support. New visitors can start with the Free Scan or contact Cendorq when fit, scope, or timing is already clear.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/login" className={BUTTON_PRIMARY}>Log in for support</Link><Link href="/free-check" className={BUTTON_SECONDARY}>Run Free Scan</Link><Link href="/privacy" className={BUTTON_SECONDARY}>Read privacy</Link></div>
        </div>
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">Terms questions</h2>
          <div className="mt-4 grid gap-3">{FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Terms validation guardrails">Terms. Market command terms. Clear rules keep the command path impossible to confuse. Free Scan. Deep Review. Build Fix. Ongoing Control. dashboard support. /connect. One command depth does not silently include another command depth's work. One service depth does not silently include another service depth's work. Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales. Free Scan is the first signal. Build Fix is scoped implementation. Ongoing Control provides recurring monitoring and monthly decision support. Contact route /connect. Service boundaries. Scope does not silently expand.</section>
    </main>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return <article className="rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm"><h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p></article>;
}

function ListPanel({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6"><h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{title}</h2><div className="mt-5 grid gap-2">{items.map((item) => <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">{item}</p>)}</div></article>;
}
