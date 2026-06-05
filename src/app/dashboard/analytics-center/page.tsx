import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Analytics Center | Cendorq",
  description: "Protected Cendorq Analytics Center for report lifecycle, delivery health, plan conversion, quality checks, support trends, and workflow metrics.",
  path: "/dashboard/analytics-center",
  noIndex: true,
});

const METRIC_AREAS = [
  ["Report lifecycle", "Scan created, Review started, release approved, artifact delivered, and vault opened."],
  ["Delivery health", "Dashboard publish, PDF readiness, email delivery, downloads, resend, and recovery."],
  ["Plan conversion", "Free Scan to Deep Review, Review to Build Fix, and repair to Ongoing Control."],
  ["Quality checks", "Evidence support, safe wording, visual usefulness, plan route, and artifact alignment."],
  ["Support trends", "Report questions, delivery issues, corrections, billing blockers, and scope confusion."],
  ["Workflow health", "Queue age, held jobs, recovery states, monthly snapshots, and completion timing."],
] as const;

const EVENT_SEQUENCE = [
  ["Free Scan submitted", "First business signal enters the system."],
  ["Report viewed", "Customer opens the protected result or paid artifact."],
  ["Deep Review purchased", "Evidence-backed review workflow can begin."],
  ["Build Fix approved", "Repair work moves from finding to scoped work."],
  ["Completion delivered", "Work state, after evidence, PDF/email, and vault record align."],
  ["Control snapshot sent", "Monthly drift and priorities reach the customer."],
] as const;

const METRIC_RULES = [
  "Do not mix internal business analytics with customer-facing report metrics.",
  "Do not redefine a metric silently across dashboards, reports, or workflows.",
  "Do not count a held, failed, or pending artifact as delivered.",
  "Do not treat conversion as success unless the customer received value before the next CTA.",
] as const;

export default function AnalyticsCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Analytics Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Metrics should explain value, delivery, quality, and workflow health.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Analytics Center separates internal operating metrics from customer-facing report metrics so Cendorq can track lifecycle, delivery, conversion, quality, support, and workflow health without confusing customers.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/command-queue" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Command Queue</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open delivery history</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Event sequence</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Scan to report to repair to completion to monthly control.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{EVENT_SEQUENCE.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Metric areas</p><div className="mt-5 grid gap-3 md:grid-cols-2">{METRIC_AREAS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Metric rules</p><div className="mt-5 grid gap-3">{METRIC_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Analytics center guardrails">Analytics Center. Report lifecycle. Delivery health. Plan conversion. Quality checks. Support trends. Workflow health. Free Scan submitted. Report viewed. Deep Review purchased. Build Fix approved. Completion delivered. Control snapshot sent. Metric Steward.</section>
    </main>
  );
}
