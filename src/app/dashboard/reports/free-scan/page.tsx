import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SCAN_CONFIDENCE_MODEL,
  FREE_SCAN_REPORT_AXES,
  FREE_SCAN_REPORT_QUALITY_RULES,
  FREE_SCAN_RESULT_SECTIONS,
} from "@/lib/free-scan-report-methodology";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Free Scan results | Cendorq",
  description: "Your Cendorq Free Scan results, methodology, confidence posture, and next best action.",
  path: "/dashboard/reports/free-scan",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");

const RESULT_SUMMARY = {
  headline: "Your first result is not a final verdict. It is the first decision signal.",
  finding: "The scan is designed to find the first place customers may hesitate: unclear message, weak trust, weak reason to choose, hidden action friction, visibility gaps, or missing proof.",
  nextMove: "Use this result to decide whether you need deeper diagnosis before spending on fixes, ads, or redesign work.",
} as const;

const RESULT_TIMELINE = [
  { label: "Intake", detail: "Business, offer, customer, market, goal, and main action are captured first." },
  { label: "First read", detail: "Cendorq reviews customer-facing signals across clarity, trust, choice, action, visibility, and proof." },
  { label: "Confidence posture", detail: "Each signal is treated as observed, inferred, or needing deeper review." },
  { label: "Next move", detail: "The dashboard explains what matters first and whether Deep Review should unlock the full reason." },
] as const;

export default function FreeScanResultsPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Free Scan results</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              See what may be costing customer choices first.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              {RESULT_SUMMARY.finding} The goal is to educate you clearly, protect accuracy, and show the next move without pretending a first scan knows everything.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best next move</div>
            <div className="mt-2 text-2xl font-semibold text-white">{DEEP_REVIEW.name}</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{DEEP_REVIEW.primaryCustomerPromise}</p>
            <Link href={DEEP_REVIEW.checkoutPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Unlock {DEEP_REVIEW.name} {DEEP_REVIEW.price}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-3" aria-label="Free Scan result explanation">
        <ResultCard title="What matters first" copy={RESULT_SUMMARY.headline} />
        <ResultCard title="Why it matters" copy="The first weak signal can explain why interested customers pause, compare longer, leave, or fail to take action." />
        <ResultCard title="What happens next" copy={RESULT_SUMMARY.nextMove} />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Free Scan methodology">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Methodology</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Six signals, one first decision.</h2>
          </div>
          <Link href="/dashboard/reports" className="text-sm font-semibold text-cyan-200 transition hover:text-white">Back to report vault →</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FREE_SCAN_REPORT_AXES.map((axis) => (
            <article key={axis.key} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">{axis.customerLabel}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{axis.whyItMatters}</p>
              <p className="mt-3 text-sm leading-6 text-cyan-100">{axis.resultQuestion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Confidence and result structure">
        <div className="system-surface rounded-[1.35rem] p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Confidence model</h2>
          <div className="mt-4 grid gap-3">
            {FREE_SCAN_CONFIDENCE_MODEL.map((item) => (
              <div key={item.level} className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-semibold text-cyan-100">{item.level}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.customerMeaning}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="system-surface rounded-[1.35rem] p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How your result is organized</h2>
          <div className="mt-4 grid gap-3">
            {FREE_SCAN_RESULT_SECTIONS.map((item) => (
              <div key={item.label} className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Result process">
        {RESULT_TIMELINE.map((item) => (
          <article key={item.label} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4">
            <div className="text-sm font-semibold text-cyan-100">{item.label}</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Free Scan report validation guardrails">
        Free Scan results. Protected dashboard report results. Report methodology. Six signals. Clarity Trust Choice Action Visibility Proof. Observed evidence. Inferred judgment. Needs deeper review. What matters first. What Cendorq can see. Why it may cost choices. What is still uncertain. Best next move. Deep Review $497. Accurate results require confidence posture and limitations. {FREE_SCAN_REPORT_QUALITY_RULES.join(" ")}
      </section>
    </main>
  );
}

function ResultCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}
