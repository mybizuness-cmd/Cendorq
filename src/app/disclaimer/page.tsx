import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const DISCLAIMER_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `Disclaimer | ${BRAND_NAME}`,
  description: "Cendorq disclaimer for AI/search visibility, readiness-depth guidance, reports, claim boundaries, and customer responsibility.",
  path: "/disclaimer",
  keywords: [
    "cendorq disclaimer",
    "AI engine readiness disclaimer",
    "ai search visibility disclaimer",
    "readiness disclaimer",
    "business visibility disclaimer",
  ],
  image: { alt: "Cendorq disclaimer boundaries." },
});

const SUMMARY = [
  { label: "What Cendorq does", value: "Decision support for AI/search visibility, proof, clarity, choice, action, and next-step repair." },
  { label: "What Cendorq does not promise", value: "No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment." },
  { label: "Your role", value: "You remain responsible for decisions, implementation, budgets, timing, and business commitments." },
] as const;

const DISCLAIMER_READ_ORDER = [
  ["Read evidence", "Treat every output through its evidence, confidence, limitation, and current context before acting."],
  ["Check boundary", "Separate guidance from guarantees: Cendorq does not control rankings, AI placement, leads, revenue, or third-party treatment."],
  ["Choose depth", "Use Scan, Review, Repair, or Control only for the decision that depth was built to support."],
] as const;

const CORE_BOUNDARIES = [
  {
    title: "Guidance, not certainty",
    copy: "Cendorq helps you see what may be weakening visibility, trust, proof, clarity, choice, or action. It does not remove uncertainty or replace your judgment.",
  },
  {
    title: "AI/search visibility is bounded",
    copy: "Cendorq may assess whether public signals are clear enough for customers, search, maps, reviews, directories, and AI answers to understand. It does not control third-party platforms.",
  },
  {
    title: "Depth depends on evidence",
    copy: "Free Scan, Deep Review, Build Fix, and Ongoing Control depend on visible evidence, customer context, confidence limits, plan scope, and external conditions.",
  },
] as const;

const EXTERNAL_FACTORS = [
  "Search engines, AI answer systems, maps, reviews, directories, social platforms, and third-party profiles can change independently.",
  "Customers, competitors, pricing, demand, timing, reputation, implementation quality, and economic conditions can affect outcomes.",
  "A recommendation that is useful now may need review later if the market, platform behavior, or business context changes.",
  "No serious system can honestly promise control over every external platform, buyer decision, or competitive move.",
] as const;

const NOT_INCLUDED = [
  "legal, financial, tax, medical, or licensed professional advice",
  "assured ranking, assured AI placement, assured leads, assured revenue, or assured sales",
  "algorithm control, ad-management promises, or third-party platform treatment promises",
  "unlimited implementation, unlimited revisions, or plan scope beyond the purchased readiness depth",
] as const;

const BEST_USE = [
  "Use Free Scan as a first signal, not a full diagnosis.",
  "Use Deep Review when the cause matters enough to prove before fixing.",
  "Use Build Fix when a scoped improvement is approved and ready to execute.",
  "Use Ongoing Control when the business needs recurring monitoring, adjustment, and monthly decision support.",
] as const;

const FAQS = [
  {
    question: "Does Cendorq guarantee AI visibility or search rankings?",
    answer: "No. Cendorq can help assess and improve clarity, proof, structure, and business understanding, but it does not guarantee ranking, AI placement, inclusion, leads, revenue, sales, or third-party platform treatment.",
  },
  {
    question: "Does this reduce Cendorq's value?",
    answer: "No. It protects the value by keeping claims honest. The value is clearer judgment, stronger proof, better next decisions, and less wasted motion in a market where customers and AI/search surfaces keep changing.",
  },
  {
    question: "How should I use Cendorq outputs?",
    answer: "Use them as structured business guidance. Read every output through its evidence, confidence, limitation, scope, and next-step boundary before making decisions.",
  },
] as const;

const BUTTON_PRIMARY =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const BUTTON_SECONDARY =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function DisclaimerPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Disclaimer",
    description: "Claim boundaries and no-promise posture for Cendorq AI/search visibility, readiness-depth guidance, reports, and forecasts.",
    path: "/disclaimer",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Disclaimer", path: "/disclaimer" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <LegalAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end" aria-label="Disclaimer overview">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{DISCLAIMER_DATE}</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">
            Strong guidance works best when the limits are clear.
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq helps businesses understand what may be weakening visibility, trust, proof, clarity, choice, and action in a changing search and AI-answer world. This page keeps claim boundaries explicit.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Disclaimer posture</p>
          <div className="mt-5 grid gap-3">
            {SUMMARY.map((item) => <InfoCard key={item.label} title={item.label} copy={item.value} />)}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Disclaimer read order">
        <div className="grid gap-3 md:grid-cols-3">
          {DISCLAIMER_READ_ORDER.map(([label, copy]) => (
            <article key={label} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-sm font-black text-cyan-700">{label}</div>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Core disclaimer boundaries">
        <div className="rounded-[2.15rem] border border-white/85 bg-white/84 p-5 shadow-[0_18px_60px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <h2 className="text-[clamp(2rem,6vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.074em] text-slate-950">Useful guidance still has boundaries.</h2>
            <p className="text-base font-semibold leading-8 text-slate-600">Scan, Review, Repair, and Control depend on evidence, confidence, limitations, and scope. They help decision quality; they do not remove market uncertainty.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {CORE_BOUNDARIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[92rem] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-2">
        <ListPanel title="External factors Cendorq does not fully control" items={EXTERNAL_FACTORS} />
        <ListPanel title="What Cendorq is not" items={NOT_INCLUDED} />
      </section>

      <section className="mx-auto max-w-[92rem] px-4 pb-8 sm:px-6">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              Use each step for the decision it was built to support.
            </h2>
            <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base">The right Cendorq depth depends on whether the business needs a first signal, deeper cause review, scoped implementation, or ongoing watch.</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {BEST_USE.map((item) => (
              <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[92rem] gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-[0.44fr_0.56fr]">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-6 shadow-[0_16px_45px_rgba(14,165,233,0.06)] backdrop-blur sm:p-8">
          <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            Questions about boundaries?
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
            Use dashboard support if you are already a customer. Start with the Free Scan if you are outside the dashboard and need first-step clarity.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support" className={BUTTON_PRIMARY}>Open dashboard support</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Start Free Scan</Link>
            <Link href="/terms" className={BUTTON_SECONDARY}>Read terms</Link>
          </div>
        </div>
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">Disclaimer questions</h2>
          <div className="mt-4 grid gap-3">{FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Disclaimer validation guardrails">
        Disclaimer. AI market command disclaimer. Disclaimer read order. Read evidence. Check boundary. Choose depth. Search is changing. AI/search visibility. AI Engine Readiness boundaries. No guaranteed ranking. No guaranteed AI placement. No guaranteed leads. No guaranteed revenue. No algorithm control. No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment. Use dashboard support. Scan. Review. Repair. Control. Free Scan. Deep Review. Build Fix. Ongoing Control. /dashboard/support. /connect. Use each command for the decision it was built to support. Use each readiness depth for the decision it was built to support. Use Free Scan as a first signal, not a full diagnosis. Use Deep Review when the cause matters enough to prove before fixing. Use Build Fix when a scoped improvement is approved and ready to execute. Use Ongoing Control when the business needs recurring monitoring, adjustment, and monthly decision support. No Search Presence OS. No /contact route. Run Free Scan.
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
