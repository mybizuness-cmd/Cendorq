import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const DISCLAIMER_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
  title: `AI market command disclaimer | ${BRAND_NAME}`,
  description:
    "Cendorq disclaimer for AI/search visibility, market-command guidance, reports, forecasts, no-guarantee boundaries, and customer responsibility.",
  path: "/disclaimer",
  keywords: [
    "cendorq disclaimer",
    "ai search visibility disclaimer",
    "market command disclaimer",
    "no guaranteed ranking",
    "no guaranteed ai placement",
    "business visibility disclaimer",
  ],
  image: { alt: "Cendorq AI market command disclaimer boundaries." },
});

const SUMMARY = [
  { label: "Platform role", value: "Decision support for market understanding, AI/search visibility, proof, and next command clarity." },
  { label: "Claim boundary", value: "No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment." },
  { label: "Report boundary", value: "Signals, diagnosis, fixes, and monthly control use evidence, confidence, limits, and scope." },
  { label: "Customer role", value: "You remain responsible for decisions, implementation, budgets, timing, and business commitments." },
] as const;

const CORE_BOUNDARIES = [
  {
    title: "Guidance, not certainty",
    copy: "Cendorq helps a business see what may be weakening visibility, trust, proof, clarity, choice, or action. It does not erase uncertainty or become a guarantee engine.",
  },
  {
    title: "AI/search visibility is bounded",
    copy: "Cendorq may assess whether public signals are clear enough for customers, search, maps, reviews, directories, and AI answers to understand. It does not guarantee ranking, inclusion, summaries, or answer placement.",
  },
  {
    title: "Reports depend on evidence",
    copy: "Free Scan, Deep Review, Build Fix, and Ongoing Control outputs depend on visible evidence, customer context, confidence limits, plan scope, and external conditions.",
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
  "guaranteed ranking, guaranteed AI placement, guaranteed leads, guaranteed revenue, or guaranteed sales",
  "algorithm control, ad-management guarantees, or third-party platform treatment guarantees",
  "unlimited implementation, unlimited revisions, or plan scope beyond the purchased command depth",
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
    answer: "No. Cendorq can help assess and improve clarity, proof, structure, and market understanding, but it does not guarantee ranking, AI placement, inclusion, leads, revenue, sales, or third-party platform treatment.",
  },
  {
    question: "Does this reduce Cendorq's value?",
    answer: "No. It protects the value by keeping claims honest. The value is clearer judgment, stronger proof, better next decisions, and less wasted motion in a market where customers and AI/search surfaces keep changing.",
  },
  {
    question: "How should I use Cendorq outputs?",
    answer: "Use them as structured business guidance. Read every output through its evidence, confidence, limitation, scope, and next-command boundary before making decisions.",
  },
] as const;

export default function DisclaimerPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq AI Market Command Disclaimer",
    description: "Claim boundaries and no-guarantee posture for Cendorq AI/search visibility, market-command guidance, reports, and forecasts.",
    path: "/disclaimer",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Disclaimer", path: "/disclaimer" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <DisclaimerAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 shadow-[0_34px_130px_rgba(2,8,23,0.52)] sm:p-8">
        <p className="text-sm font-semibold text-cyan-100">AI market command disclaimer</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Strong guidance works best when the limits are clear.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          Cendorq helps businesses understand what may be weakening visibility, trust, proof, clarity, choice, and action in a changing search and AI-answer world. This page keeps the claim boundaries explicit. {DISCLAIMER_DATE}.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SUMMARY.map((item) => (
            <article key={item.label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
              <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="Core disclaimer boundaries">
        {CORE_BOUNDARIES.map((item) => (
          <article key={item.title} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-2">
        <BoundaryPanel title="External factors Cendorq does not fully control" items={EXTERNAL_FACTORS} />
        <BoundaryPanel title="What Cendorq is not" items={NOT_INCLUDED} />
      </section>

      <section className="relative z-10 mt-8 rounded-[1.55rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-5 sm:p-6">
        <p className="text-sm font-semibold text-cyan-100">Best use</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-4xl">Use each command for the decision it was built to support.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {BEST_USE.map((item) => (
            <p key={item} className="rounded-[1rem] border border-white/10 bg-slate-950/45 p-3 text-sm leading-6 text-slate-200">{item}</p>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3" aria-label="Disclaimer questions">
        {FAQS.map((item) => (
          <article key={item.question} className="system-surface rounded-[1.35rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="system-panel-authority relative z-10 mt-8 rounded-[1.55rem] p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">Questions about boundaries?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Use dashboard support if you are already a customer. Use connect if you are outside the dashboard and need fit, scope, or timing clarity.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open dashboard support</Link>
          <Link href="/connect" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Contact Cendorq</Link>
          <Link href="/terms" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Read terms</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Disclaimer validation guardrails">
        AI market command disclaimer. Search is changing. AI/search visibility. Market command boundaries. No guaranteed ranking. No guaranteed AI placement. No guaranteed leads. No guaranteed revenue. No algorithm control. No Search Presence OS. No /contact route. Use /connect. Use dashboard support. Free Scan. Deep Review. Build Fix. Ongoing Control.
      </section>
    </main>
  );
}

function BoundaryPanel({ title, items }: { title: string; items: readonly string[] }) {
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

function DisclaimerAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.03] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.026]" />
    </div>
  );
}
