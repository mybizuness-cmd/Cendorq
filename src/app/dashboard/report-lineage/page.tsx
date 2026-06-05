import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Report Lineage | Cendorq",
  description: "Protected Cendorq Report Lineage view linking source context, evidence, findings, scores, visuals, artifacts, and delivery surfaces.",
  path: "/dashboard/report-lineage",
  noIndex: true,
});

const LINEAGE_FLOW = [
  ["Source", "Public context, customer intake, business profile, or approved proof."],
  ["Evidence", "Captured source context with confidence and visibility status."],
  ["Finding", "Customer-safe issue, strength, gap, or drift statement."],
  ["Score", "Presence Score, signal severity, prompt readiness, or repair priority impact."],
  ["Visual", "Scorecard, matrix, trend, benchmark, timeline, or report table."],
  ["Artifact", "Dashboard, PDF, email, vault card, support summary, or completion report."],
] as const;

const TRACE_CHECKS = [
  ["Score trace", "A score should explain what changed it and what evidence supports the change."],
  ["Visual trace", "A chart should map to a finding instead of existing as decoration."],
  ["Report trace", "Dashboard, PDF, and email should all point back to the same approved package."],
  ["Correction trace", "Corrections should update source truth first, then report artifacts after review."],
] as const;

const LINEAGE_RULES = [
  "Do not show a customer-facing finding without evidence context or uncertainty.",
  "Do not let a visual imply stronger proof than the finding supports.",
  "Do not let PDF, email, dashboard, and vault versions drift apart.",
  "Do not update report output before source truth and release state are aligned.",
] as const;

export default function ReportLineagePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Report Lineage</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Every report output should trace back to a source path.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Report Lineage connects source context, evidence, findings, scores, visuals, report artifacts, delivery records, and corrections so Cendorq can explain why a report says what it says.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/evidence-catalog" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open evidence catalog</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Lineage flow</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Source to evidence to finding to score to visual to artifact.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{LINEAGE_FLOW.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Trace checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{TRACE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Lineage rules</p><div className="mt-5 grid gap-3">{LINEAGE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Report lineage guardrails">Report Lineage. Source. Evidence. Finding. Score. Visual. Artifact. Source to evidence to finding to score to visual to artifact. Score trace. Visual trace. Report trace. Correction trace. Dashboard PDF email vault alignment.</section>
    </main>
  );
}
