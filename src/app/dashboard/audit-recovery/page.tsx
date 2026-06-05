import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Audit Recovery Center | Cendorq",
  description: "Protected Cendorq Audit Recovery Center for workflow events, customer-safe recovery states, retries, held artifacts, and delivery history.",
  path: "/dashboard/audit-recovery",
  noIndex: true,
});

const RECOVERY_EVENTS = [
  ["Payment confirmed", "Entitlement can activate, but report delivery still needs release state."],
  ["Report held", "Customer-safe status appears while approval, evidence, or PDF readiness is incomplete."],
  ["PDF retry", "Rendering retries from the approved report package, not a hand-edited copy."],
  ["Email retry", "Delivery can retry while the dashboard artifact remains available."],
  ["Correction review", "Business facts or report wording return to review before visible changes."],
  ["Support recovery", "Support receives customer-safe context without exposing internal notes."],
] as const;

const AUDIT_FIELDS = [
  ["Event", "What happened in the workflow."],
  ["Owner", "Which system, lane, or support path is responsible."],
  ["Customer state", "What the customer can safely see."],
  ["Internal state", "What operators or agents need to resolve."],
  ["Retry policy", "Whether the step can retry, hold, suppress, or route to support."],
  ["Resolution", "What closes the event and updates the customer-facing status."],
] as const;

const RECOVERY_RULES = [
  "Do not show raw internals in customer-facing recovery states.",
  "Do not silently fail report, PDF, email, support, or billing workflows.",
  "Do not mark recovery complete until the customer-facing surface is updated.",
  "Do not create duplicate reports or emails when retrying a failed step.",
] as const;

export default function AuditRecoveryPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Audit Recovery Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Failures should become controlled recovery, not confusion.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Audit Recovery keeps payment, report, PDF, email, support, correction, and workflow events visible enough to recover while keeping customer-facing status safe.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/command-queue" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Command Queue</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Delivery History</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Recovery events</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Hold, retry, recover, resolve, and update the customer surface.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{RECOVERY_EVENTS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Audit fields</p><div className="mt-5 grid gap-3 md:grid-cols-2">{AUDIT_FIELDS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Recovery rules</p><div className="mt-5 grid gap-3">{RECOVERY_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Audit recovery guardrails">Audit Recovery Center. Payment confirmed. Report held. PDF retry. Email retry. Correction review. Support recovery. Event. Owner. Customer state. Internal state. Retry policy. Resolution. customer-safe recovery.</section>
    </main>
  );
}
