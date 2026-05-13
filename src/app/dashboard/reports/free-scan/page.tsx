import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import {
  FREE_SCAN_AI_VISIBILITY_MODEL,
  FREE_SCAN_CONFIDENCE_MODEL,
  FREE_SCAN_EVIDENCE_RULES,
  FREE_SCAN_PRIORITY_MODEL,
  FREE_SCAN_REPORT_AXES,
  getFreeScanFindingSummary,
} from "@/lib/free-scan-report-methodology";
import { getPlanValueDelivery } from "@/lib/plan-value-delivery-architecture";
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <ScanResultAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">
            The first AI/search market signal is ready.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This is the Scan layer inside the customer dashboard. It shows what may be visible, unclear, weak, or blocked before Cendorq claims a full diagnosis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/plans/deep-review" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Open Review page — {DEEP_REVIEW.price}</Link>
            <Link href="/dashboard/reports" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Back to report vault</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Diagnose</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">{DEEP_REVIEW_VALUE.primaryValue}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {RESULT_STATE.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.value}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Market signal state">
        <div className="grid gap-4 md:grid-cols-3">
          {RESULT_STATE.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200 bg-cyan-50/75 p-6 shadow-[0_20px_65px_rgba(14,165,233,0.08)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Market signal intelligence">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Useful because it explains the limit before the next move.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">{FREE_SCAN_AI_VISIBILITY_MODEL.customerExplanation}</p>
              <Link href="/dashboard/reports" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Back to report vault →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-3">
              {RESULT_DECISION.map((item) => (
                <article key={item.title} className="border-b border-cyan-100 p-5 md:border-r sm:p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Structured first findings">
        <div className="grid gap-4 lg:grid-cols-3">
          {SAMPLE_FINDINGS.slice(0, 3).map((finding) => (
            <article key={`${finding.axis}-${finding.findingLabel}`} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-700">{finding.axisLabel}</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-600">{finding.priority}</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-600">{finding.confidence}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{finding.findingLabel}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{finding.customerImpact}</p>
              <p className="mt-4 rounded-[1.2rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-medium leading-7 text-slate-600">AI/Search: {finding.aiVisibilityImpact}</p>
              <p className="mt-3 rounded-[1.2rem] border border-cyan-100 bg-white p-4 text-sm font-medium leading-7 text-slate-600">{finding.bestNextAction}</p>
              <p className="mt-4 text-xs font-medium leading-5 text-slate-500">Limit: {finding.limitation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-2" aria-label="Market signal boundaries">
        <BoundaryCard title="What this signal includes" items={FREE_SCAN_VALUE.includes.slice(0, 4)} tone="include" />
        <BoundaryCard title="What stays outside Scan" items={FREE_SCAN_VALUE.doesNotInclude.slice(0, 4)} tone="exclude" />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Free Scan methodology summary">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-8 lg:p-10">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Evidence, confidence, AI/search posture, and priority stay separate.</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {METHODOLOGY_SUMMARY.map((panel) => (
              <article key={panel.title} className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/45 p-5 shadow-sm">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{panel.title}</h3>
                <div className="mt-4 grid gap-3">
                  {panel.items.map((item) => <p key={item} className="rounded-[1.2rem] border border-cyan-100 bg-white p-4 text-xs font-medium leading-6 text-slate-600">{item}</p>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FREE_SCAN_REPORT_AXES.map((axis) => (
              <article key={axis.key} className="rounded-[1.35rem] border border-cyan-100 bg-white p-5 shadow-sm">
                <div className="text-base font-semibold text-slate-950">{axis.customerLabel}</div>
                <p className="mt-3 text-xs font-medium leading-6 text-slate-600">{axis.resultQuestion}</p>
                <p className="mt-3 text-xs font-medium leading-6 text-cyan-700">{axis.aiVisibilityRisk}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => <p key={item} className={tone === "include" ? "rounded-[1.2rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-medium leading-7 text-slate-600" : "rounded-[1.2rem] border border-slate-200 bg-white p-4 text-sm font-medium leading-7 text-slate-600"}>{item}</p>)}
      </div>
    </article>
  );
}

function ScanResultAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
