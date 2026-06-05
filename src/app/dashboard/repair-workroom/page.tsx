import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Repair Workroom | Cendorq",
  description: "Protected Build Fix workroom for scoped repair state, before evidence, work plan, QA, completion report, and next Control recommendation.",
  path: "/dashboard/repair-workroom",
  noIndex: true,
});

const WORKROOM_STATES = [
  ["Paid", "Build Fix entitlement is confirmed before work opens."],
  ["Scope pending", "The weak signal and exact repair boundary are drafted."],
  ["Scope approved", "Customer-safe work can move into repair."],
  ["Evidence ready", "Before-state proof is attached to the work item."],
  ["In repair", "Approved changes are being prepared or implemented."],
  ["QA review", "Output is checked before the customer sees completion."],
  ["Completed", "After-state proof and completion report are ready."],
  ["Control recommended", "Recurring monitoring is suggested only when drift risk exists."],
] as const;

const WORKROOM_MODULES = [
  ["Approved weak signal", "The exact public signal being repaired, tied to the report finding that justified the work."],
  ["Before evidence", "Customer-safe screenshots, excerpts, or public observations that show the starting point."],
  ["Work scope", "What will change, what will not change, and what needs customer approval first."],
  ["Implementation notes", "Operator-safe progress summary without exposing raw internal notes."],
  ["After evidence", "What changed and how the repaired signal now appears to a customer or AI/search surface."],
  ["Validation checklist", "A final check that the repair matches the scope, report, and customer-safe language."],
] as const;

const COMPLETION_ARTIFACTS = [
  ["Work Plan PDF", "Delivered before repair when scope needs approval."],
  ["Dashboard status", "Shows paid, scoped, in repair, QA, completed, or held state."],
  ["Completion Report", "Delivered after QA with before/after proof and limits."],
  ["Email delivery", "Customer receives the approved artifact when release is complete."],
] as const;

export default function RepairWorkroomPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Build Fix workroom</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Repair work should be scoped, visible, and completion-backed.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Build Fix is not a vague promise. It should show the approved weak signal, before evidence, work scope, repair state, after evidence, QA, completion report, and next Control recommendation.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports/build-fix" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open completion artifact</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Back to report vault</Link>
          </div>
        </div>

        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Repair pipeline</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Finding → scope → repair → QA → completion → control.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {WORKROOM_STATES.map(([label, copy], index) => (
              <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.08fr_.92fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Workroom modules</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {WORKROOM_MODULES.map(([title, copy]) => (
              <article key={title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4">
                <h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{title}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Customer artifacts</p>
          <div className="mt-5 grid gap-3">
            {COMPLETION_ARTIFACTS.map(([title, copy]) => (
              <article key={title} className="rounded-[1.25rem] border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{title}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-[1.2rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">Guardrail: Build Fix must not look complete before scope, work, QA, and completion artifact are ready. No guaranteed ranking, AI placement, leads, revenue, or algorithm control.</p>
        </div>
      </section>

      <section className="sr-only" aria-label="Repair workroom guardrails">Build Fix workroom. Repair Workroom. Approved weak signal. Before evidence. Work scope. Implementation notes. After evidence. Validation checklist. Completion Report. Work Plan PDF. Dashboard status. Email delivery. Finding to scope to repair to QA to completion to control. No guaranteed ranking, AI placement, leads, revenue, or algorithm control.</section>
    </main>
  );
}
