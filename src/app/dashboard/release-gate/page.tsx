import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Release Gate | Cendorq",
  description: "Protected Cendorq release gate for customer-safe report approval before dashboard, PDF, email, and vault delivery.",
  path: "/dashboard/release-gate",
  noIndex: true,
});

const GATE_STEPS = [
  ["Evidence package", "Findings connect to approved source context and confidence."],
  ["Customer-safe writing", "The report explains risk and limits without overclaiming."],
  ["Visual check", "Charts and scorecards explain decisions instead of decorating the page."],
  ["Plan route", "The next command matches Scan, Review, Repair, or Control depth."],
  ["Artifact match", "Dashboard, PDF, email, and vault summary tell the same story."],
  ["Delivery ready", "Access, release state, and customer-facing status are aligned."],
] as const;

const RELEASE_RECORDS = [
  ["Free Scan", "Dashboard-only", "First signal approved for customer view."],
  ["Deep Review", "Presence Report", "Evidence-backed report held until approved PDF is ready."],
  ["Build Fix", "Completion Report", "Scope, before state, after state, and completion summary aligned."],
  ["Ongoing Control", "Monthly Snapshot", "Drift summary and monthly priorities approved for delivery."],
] as const;

const GATE_GUARDS = [
  "Do not release a report with unsupported customer-facing claims.",
  "Do not publish paid artifacts before access and delivery state are aligned.",
  "Do not let dashboard, PDF, and email tell different versions of the same report.",
  "Do not turn uncertainty into a stronger claim than the evidence supports.",
] as const;

export default function ReleaseGatePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Release gate</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Reports should pass approval before customers see them.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The release gate keeps evidence, language, visuals, plan route, dashboard, PDF, email, and vault state aligned before a customer-facing artifact is delivered.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open report vault</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">View delivery history</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Approval sequence</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Evidence to language to visuals to route to artifact to delivery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {GATE_STEPS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}
          </div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Release records</p><div className="mt-5 grid gap-3 md:grid-cols-2">{RELEASE_RECORDS.map(([name, state, copy]) => <article key={name} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{state}</p><h3 className="mt-2 text-xl font-semibold tracking-[-.04em] text-slate-950">{name}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Gate guardrails</p><div className="mt-5 grid gap-3">{GATE_GUARDS.map((guard) => <p key={guard} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{guard}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Release gate guardrails">Release Gate. Evidence package. Customer-safe writing. Visual check. Plan route. Artifact match. Delivery ready. Dashboard PDF email vault alignment. Customer-safe report approval.</section>
    </main>
  );
}
