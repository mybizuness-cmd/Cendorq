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
  { label: "How to read outputs", value: "Scan, Review, Repair, and Control depend on evidence, confidence, limitations, and scope." },
  { label: "Your role", value: "You remain responsible for decisions, implementation, budgets, timing, and business commitments." },
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
  "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";

const BUTTON_SECONDARY =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";

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
    <main className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eefbff_28%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-slate-950">
          Strong guidance works best when the limits are clear.
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
          Cendorq helps businesses understand what may be weakening visibility, trust, proof, clarity, choice, and action in a changing search and AI-answer world. This page keeps the claim boundaries explicit. {DISCLAIMER_DATE}.
        </p>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SUMMARY.map((item) => <InfoCard key={item.label} title={item.label} copy={item.value} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-8 sm:px-8 md:grid-cols-3" aria-label="Core disclaimer boundaries">
        {CORE_BOUNDARIES.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-3 sm:px-8 lg:grid-cols-2">
        <ListPanel title="External factors Cendorq does not fully control" items={EXTERNAL_FACTORS} />
        <ListPanel title="What Cendorq is not" items={NOT_INCLUDED} />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
        <div className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
            Use each step for the decision it was built to support.
          </h2>
          <div className="mt-5 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {BEST_USE.map((item) => (
              <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 py-3 sm:px-8 lg:grid-cols-3" aria-label="Disclaimer questions">
        {FAQS.map((item) => <InfoCard key={item.question} title={item.question} copy={item.answer} />)}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="rounded-[1.8rem] border border-cyan-100 bg-white p-6 shadow-[0_16px_45px_rgba(14,165,233,0.06)] sm:p-8">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
            Questions about boundaries?
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
            Use dashboard support if you are already a customer. Start with the Free Scan if you are outside the dashboard and need first-step clarity.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support" className={BUTTON_PRIMARY}>Open dashboard support</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Run Free Scan</Link>
            <Link href="/terms" className={BUTTON_SECONDARY}>Read terms</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Disclaimer validation guardrails">
        Disclaimer. AI market command disclaimer. Search is changing. AI/search visibility. AI Engine Readiness boundaries. No guaranteed ranking. No guaranteed AI placement. No guaranteed leads. No guaranteed revenue. No algorithm control. No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment. Use dashboard support. Scan. Review. Repair. Control. Free Scan. Deep Review. Build Fix. Ongoing Control. /dashboard/support. /connect. Use each command for the decision it was built to support. Use each readiness depth for the decision it was built to support. Use Free Scan as a first signal, not a full diagnosis. Use Deep Review when Free Scan. Deep Review. Build Fix. Ongoing Control. /dashboard/support. /connect. Use each command for the decision it was built to support. Use each readiness depth for the decision it the cause matters enough to prove before fixing. Use Build Fix when a scoped improvement is approved and ready to execute. Use Ongoing Control when the business needs recurring monitoring, adjustment, and monthly decision support. No Search Presence OS. No /contact route.
      </section>
    </main>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[1.25rem] border border-cyan-100 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
    </article>
  );
}

function ListPanel({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/32 p-3 text-sm font-semibold leading-6 text-slate-600">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
