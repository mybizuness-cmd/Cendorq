import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SCAN_AI_VISIBILITY_MODEL,
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
  title: "Market signal result | Cendorq",
  description: "Your protected Cendorq market signal result, AI/search posture, confidence limits, and next command action.",
  path: "/dashboard/reports/free-scan",
  noIndex: true,
});

const FREE_SCAN_VALUE = getPlanValueDelivery("free-scan");
const DEEP_REVIEW_VALUE = getPlanValueDelivery("deep-review");
const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const SAMPLE_FINDINGS = getFreeScanFindingSummary();

const RESULT_STATE = [
  { label: "Command", value: "Scan", detail: "The first market signal before paid diagnosis or implementation." },
  { label: "AI/Search posture", value: "First signal only", detail: "The result can show visibility risk without claiming ranking, placement, or full diagnosis." },
  { label: "Next command", value: "Diagnose", detail: "Use Deep Review only when the signal matters enough to prove the cause." },
] as const;

const RESULT_DECISION = [
  { title: "Signal", copy: "What customers, search, maps, reviews, or AI answers may fail to understand about the business first." },
  { title: "Proof", copy: "What visible evidence supports the first read without using private internals or fake certainty." },
  { title: "Risk", copy: "How weak clarity, proof, trust, visibility, or action can cost choices before the customer reaches the website or takes the next step." },
  { title: "Limit", copy: "What the Scan cannot prove without deeper review, comparison, business context, or approved paid work." },
  { title: "Next command", copy: "The cleanest next move when the first signal matters enough to prove, fix, or control over time." },
] as const;

const METHODOLOGY_SUMMARY = [
  { title: "Evidence", items: FREE_SCAN_EVIDENCE_RULES.map((item) => `${item.label}: ${item.customerMeaning}`).slice(0, 3) },
  { title: "Confidence", items: FREE_SCAN_CONFIDENCE_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`).slice(0, 3) },
  { title: "Priority", items: FREE_SCAN_PRIORITY_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`).slice(0, 3) },
] as const;

export default function FreeScanResultsPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <ScanResultAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Protected market signal
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            The first AI/search market signal is ready.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            This is the Scan layer inside the customer dashboard. It shows what may be visible, unclear, weak, or blocked before Cendorq claims a full diagnosis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={DEEP_REVIEW.checkoutPath} className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock {DEEP_REVIEW.price}
            </Link>
            <Link href="/dashboard/reports" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Back to report vault
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Next command</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Diagnose</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{DEEP_REVIEW_VALUE.primaryValue}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {RESULT_STATE.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.value}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Market signal state">
        <div className="grid gap-4 md:grid-cols-3">
          {RESULT_STATE.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Market signal intelligence">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Signal intelligence</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Useful because it explains the limit before the next move.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{FREE_SCAN_AI_VISIBILITY_MODEL.customerExplanation}</p>
              <Link href="/dashboard/reports" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Back to report vault →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-3">
              {RESULT_DECISION.map((item) => (
                <article key={item.title} className="border-b border-white/10 p-5 md:border-r sm:p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Structured first findings">
        <div className="grid gap-4 lg:grid-cols-3">
          {SAMPLE_FINDINGS.slice(0, 3).map((finding) => (
            <article key={`${finding.axis}-${finding.findingLabel}`} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-bold text-cyan-100">{finding.axisLabel}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-slate-200">{finding.priority}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-slate-200">{finding.confidence}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{finding.findingLabel}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{finding.customerImpact}</p>
              <p className="mt-4 rounded-[1.2rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-4 text-sm leading-7 text-cyan-50">AI/Search: {finding.aiVisibilityImpact}</p>
              <p className="mt-3 rounded-[1.2rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-4 text-sm leading-7 text-cyan-50">{finding.bestNextAction}</p>
              <p className="mt-4 text-xs leading-5 text-slate-500">Limit: {finding.limitation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-2" aria-label="Market signal boundaries">
        <BoundaryCard title="What this signal includes" items={FREE_SCAN_VALUE.includes.slice(0, 4)} tone="include" />
        <BoundaryCard title="What stays outside Scan" items={FREE_SCAN_VALUE.doesNotInclude.slice(0, 4)} tone="exclude" />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Free Scan methodology summary">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Methodology summary</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Evidence, confidence, AI/search posture, and priority stay separate.</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {METHODOLOGY_SUMMARY.map((panel) => (
              <article key={panel.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{panel.title}</h3>
                <div className="mt-4 grid gap-3">
                  {panel.items.map((item) => (
                    <p key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-slate-300">{item}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FREE_SCAN_REPORT_AXES.map((axis) => (
              <article key={axis.key} className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-base font-semibold text-white">{axis.customerLabel}</div>
                <p className="mt-3 text-xs leading-6 text-slate-400">{axis.resultQuestion}</p>
                <p className="mt-3 text-xs leading-6 text-cyan-100/80">{axis.aiVisibilityRisk}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Free Scan result guardrails">
        Market signal result. Protected dashboard result. Dashboard-only Free Scan result route. Free Scan result page must remain under /dashboard/reports/free-scan and not public. The first AI/search market signal is ready. Search is no longer only a list of links. Signal Proof Risk Limit Next command. Scan layer. Bounded confidence. Signal intelligence. Useful because it explains the limit before the next move. Evidence confidence AI/search posture and priority stay separate. What this signal includes. What stays outside Scan. Free Scan does not include full root-cause diagnosis, implementation work, monthly monitoring, guaranteed ranking, or guaranteed AI placement. Diagnose finds the full reason. No overlap. {FREE_SCAN_AI_VISIBILITY_MODEL.promise} {FREE_SCAN_AI_VISIBILITY_MODEL.customerTruth} {FREE_SCAN_AI_VISIBILITY_MODEL.reportRule} {FREE_SCAN_VALUE.reportBoundary} {FREE_SCAN_VALUE.upgradeLogic} {PLAN_VALUE_SEPARATION_RULES.join(" ")} Six signals. Clarity Trust Choice Action AI/Search Visibility Proof. Observed evidence. Inferred judgment. Needs deeper review. Evidence rules. Priority model. Critical Important Watch. Deep Review $497. Accurate results require confidence posture and limitations. {FREE_SCAN_REPORT_QUALITY_RULES.join(" ")}
      </section>
    </main>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "rounded-[1.2rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-7 text-slate-200" : "rounded-[1.2rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400"}>
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function ScanResultAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
