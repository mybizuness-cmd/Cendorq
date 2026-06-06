import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Template Command Center | Cendorq",
  description: "Protected Cendorq Template Command Center for report templates, PDF sections, dashboard modules, email summaries, support packets, Control snapshots, and completion artifacts.",
  path: "/dashboard/template-command",
  noIndex: true,
});

const TEMPLATE_TYPES = [
  ["Scan result", "First signal, confidence, limitation, proof route, and Deep Review next command."],
  ["Deep Review report", "Executive summary, score reasons, Choice Gap, evidence, visuals, priorities, limits, and repair path."],
  ["Build Fix work plan", "Scope, included work, exclusions, before evidence, QA standard, and delivery expectations."],
  ["Completion report", "What changed, after evidence, QA result, remaining risks, PDF/email state, and next command."],
  ["Control snapshot", "Monthly drift, protected strengths, new risks, priorities, visuals, and decision notes."],
  ["Support packet", "Report question, delivery issue, correction outcome, billing state, or scope clarification."],
] as const;

const TEMPLATE_CHECKS = [
  ["Plan depth", "Each template must respect Free Scan, Deep Review, Build Fix, or Ongoing Control boundaries."],
  ["Evidence slots", "Findings require source context, confidence, limitation, and customer-safe wording."],
  ["Visual slots", "Approved scorecards, matrices, trends, tables, and timelines must stay readable."],
  ["Delivery slots", "Dashboard, PDF, email, vault, attachment, and delivery history must match."],
  ["Support slots", "Questions, corrections, recovery, and billing confusion route to safe support context."],
  ["CTA slots", "Next command appears after value, proof, boundary, and safe customer status."],
] as const;

const TEMPLATE_RULES = [
  "Do not let templates create unsupported claims, fake proof, or generic filler.",
  "Do not reuse a paid report template for Free Scan without reducing scope and claims.",
  "Do not let dashboard, PDF, email, and support packets use different wording for the same approved artifact.",
  "Do not ship a template without evidence, visual, access, delivery, and recovery slots defined.",
] as const;

export default function TemplateCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Template Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Templates should protect quality across every report surface.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Template Command Center keeps dashboard modules, PDFs, emails, support packets, completion artifacts, and Control snapshots consistent, evidence-linked, and plan-aware.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/quality-gate" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Quality Gate</Link>
            <Link href="/dashboard/plan-command-matrix" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Plan Matrix</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Template types</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Scan, review, repair, completion, control, and support outputs.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{TEMPLATE_TYPES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Template checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{TEMPLATE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Template rules</p><div className="mt-5 grid gap-3">{TEMPLATE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Template command guardrails">Template Command Center. Scan result. Deep Review report. Build Fix work plan. Completion report. Control snapshot. Support packet. Plan depth. Evidence slots. Visual slots. Delivery slots. Support slots. CTA slots. report template quality.</section>
    </main>
  );
}
