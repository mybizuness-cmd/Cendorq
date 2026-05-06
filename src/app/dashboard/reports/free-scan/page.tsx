import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SCAN_CONFIDENCE_MODEL,
  FREE_SCAN_EVIDENCE_RULES,
  FREE_SCAN_PRIORITY_MODEL,
  FREE_SCAN_REPORT_AXES,
  FREE_SCAN_REPORT_QUALITY_RULES,
  getFreeScanFindingSummary,
} from "@/lib/free-scan-report-methodology";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Free Scan results | Cendorq",
  description: "Your Cendorq Free Scan results, methodology, confidence posture, and next best action.",
  path: "/dashboard/reports/free-scan",
  noIndex: true,
});

const FREE_SCAN_VALUE = getPlanValueDelivery("free-scan");
const DEEP_REVIEW_VALUE = getPlanValueDelivery("deep-review");
const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const SAMPLE_FINDINGS = getFreeScanFindingSummary();

const RESULT_STATE = [
  { label: "Result type", value: "First signal", detail: "Useful direction before paid diagnosis or implementation." },
  { label: "Confidence", value: "Bounded", detail: "Signals are observed, inferred, or marked for deeper review." },
  { label: "Best next move", value: "Deep Review", detail: "Use it only when the signal matters enough to diagnose the cause." },
] as const;

const RESULT_DECISION = [
  {
    title: "What this can tell you",
    copy: "Where customers may first lose clarity, trust, confidence, visibility, or momentum to act.",
  },
  {
    title: "What this cannot tell you yet",
    copy: "The full root cause, exact implementation plan, or monthly trend without paid deeper work.",
  },
  {
    title: "What to do with it",
    copy: "Use the first signal to decide whether Deep Review is worth buying before bigger fixes.",
  },
] as const;

const METHODOLOGY_SUMMARY = [
  { title: "Evidence", items: FREE_SCAN_EVIDENCE_RULES.map((item) => `${item.label}: ${item.customerMeaning}`).slice(0, 3) },
  { title: "Confidence", items: FREE_SCAN_CONFIDENCE_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`).slice(0, 3) },
  { title: "Priority", items: FREE_SCAN_PRIORITY_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`).slice(0, 3) },
] as const;

export default function FreeScanResultsPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-24 pt-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Protected dashboard result</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Your first decision signal is ready.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              This Free Scan result belongs inside the customer dashboard. It is useful before payment, but it is not pretending to be the full answer.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best next move</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{DEEP_REVIEW.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">{DEEP_REVIEW_VALUE.primaryValue}</p>
            <Link href={DEEP_REVIEW.checkoutPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock {DEEP_REVIEW.price}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Free Scan result state">
        {RESULT_STATE.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.2rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Free Scan result intelligence">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Result intelligence</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              The first signal is useful because it is bounded.
            </h2>
          </div>
          <Link href="/dashboard/reports" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to report vault →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {RESULT_DECISION.map((item) => (
            <article key={item.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-5">
              <h3 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 lg:grid-cols-3" aria-label="Structured first findings">
        {SAMPLE_FINDINGS.slice(0, 3).map((finding) => (
          <article key={`${finding.axis}-${finding.findingLabel}`} className="system-surface rounded-[1.35rem] p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">{finding.axisLabel}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-slate-200">{finding.priority}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-slate-200">{finding.confidence}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{finding.findingLabel}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{finding.customerImpact}</p>
            <p className="mt-3 rounded-[1rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-3 text-sm leading-6 text-cyan-50">{finding.bestNextAction}</p>
            <p className="mt-3 text-xs leading-5 text-slate-500">Limit: {finding.limitation}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-3 lg:grid-cols-2" aria-label="Free Scan boundaries">
        <BoundaryCard title="What this result includes" items={FREE_SCAN_VALUE.includes.slice(0, 4)} tone="include" />
        <BoundaryCard title="What stays outside Free Scan" items={FREE_SCAN_VALUE.doesNotInclude.slice(0, 4)} tone="exclude" />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Free Scan methodology summary">
        <p className="text-sm font-semibold text-cyan-100">Methodology summary</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Evidence, confidence, and priority stay separate.</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {METHODOLOGY_SUMMARY.map((panel) => (
            <article key={panel.title} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <h3 className="text-xl font-semibold tracking-tight text-white">{panel.title}</h3>
              <div className="mt-3 grid gap-2">
                {panel.items.map((item) => (
                  <p key={item} className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-300">{item}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FREE_SCAN_REPORT_AXES.map((axis) => (
            <article key={axis.key} className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm font-semibold text-white">{axis.customerLabel}</div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{axis.resultQuestion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Premium Free Scan result guardrails">
        Premium Free Scan result. Protected dashboard result. Dashboard-only Free Scan result route. Free Scan result page must remain under /dashboard/reports/free-scan and not public. Your first decision signal is ready. First signal. Bounded confidence. Result intelligence. The first signal is useful because it is bounded. Evidence confidence and priority stay separate. What this result includes. What stays outside Free Scan. Free Scan does not include full root-cause diagnosis, implementation work, or monthly monitoring. Deep Review diagnoses the full reason. No overlap. {FREE_SCAN_VALUE.reportBoundary} {FREE_SCAN_VALUE.upgradeLogic} {PLAN_VALUE_SEPARATION_RULES.join(" ")} Six signals. Clarity Trust Choice Action Visibility Proof. Observed evidence. Inferred judgment. Needs deeper review. Evidence rules. Priority model. Critical Important Watch. Deep Review $497. Accurate results require confidence posture and limitations. {FREE_SCAN_REPORT_QUALITY_RULES.join(" ")}
      </section>
    </main>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="system-surface rounded-[1.35rem] p-4 sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "rounded-[1rem] border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm leading-6 text-slate-200" : "rounded-[1rem] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-400"}>
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
