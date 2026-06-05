import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan Command Matrix | Cendorq",
  description: "Protected Cendorq Plan Command Matrix connecting Free Scan, Deep Review, Build Fix, and Ongoing Control to agents, deliverables, dashboard state, PDF/email delivery, support, and next commands.",
  path: "/dashboard/plan-command-matrix",
  noIndex: true,
});

const PLAN_ROWS = [
  ["Free Scan", "Scan agent", "First signal, confidence, limitation, report-vault entry, and safe next command.", "Dashboard result", "Deep Review when the first signal needs proof."],
  ["Deep Review", "Review agent", "Evidence-backed diagnosis, Choice Gap, score reasons, visual modules, PDF, and email.", "Approved report", "Build Fix when the priority is scoped enough to repair."],
  ["Build Fix", "Repair agent", "Approved scope, before evidence, work state, QA, after evidence, and completion report.", "Workroom plus completion artifact", "Ongoing Control when progress needs protection."],
  ["Ongoing Control", "Control agent", "Monthly signal health, drift, protected strengths, new risks, priorities, PDF, and email.", "Monthly snapshot", "Support or Build Fix when new pressure appears."],
] as const;

const MATRIX_CHECKS = [
  ["Agent", "Which agent lane owns the work."],
  ["Deliverable", "What customer value is created."],
  ["Dashboard state", "What the customer can safely see."],
  ["PDF and email", "Whether an approved artifact is delivered."],
  ["Support path", "Where confusion, correction, or recovery goes."],
  ["Next command", "What the safest next step should be."],
] as const;

const MATRIX_RULES = [
  "Do not make Free Scan look like a complete paid diagnosis.",
  "Do not let Deep Review imply implementation has already happened.",
  "Do not mark Build Fix complete before QA, after evidence, and completion artifact are ready.",
  "Do not present Ongoing Control as unlimited repair work or guaranteed growth.",
] as const;

export default function PlanCommandMatrixPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Plan Command Matrix</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Every plan needs a clear job, artifact, agent, and next command.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Plan Command Matrix keeps Free Scan, Deep Review, Build Fix, and Ongoing Control separated while connecting each plan to agents, reports, dashboard state, PDF/email delivery, support, and safe next commands.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/plans" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Compare plans</Link>
            <Link href="/dashboard/conversion-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Conversion Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Matrix rows</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Scan, Review, Repair, and Control each do different work.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{PLAN_ROWS.map(([plan, agent, deliverable, state, next], index) => <article key={plan} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{agent}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.05em] text-white">{plan}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{deliverable}</p><p className="mt-3 rounded-xl border border-white/10 bg-white/[.06] p-3 text-xs font-semibold leading-5 text-cyan-100">{state} to {next}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Matrix checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{MATRIX_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Matrix rules</p><div className="mt-5 grid gap-3">{MATRIX_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Plan command matrix guardrails">Plan Command Matrix. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan agent. Review agent. Repair agent. Control agent. Dashboard result. Approved report. Workroom plus completion artifact. Monthly snapshot. PDF email support next command.</section>
    </main>
  );
}
