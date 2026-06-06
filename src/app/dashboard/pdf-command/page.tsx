import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF Command Center | Cendorq",
  description: "Protected Cendorq PDF Command Center for approved report packages, executive-ready PDFs, visual modules, email attachments, vault downloads, and rendering recovery.",
  path: "/dashboard/pdf-command",
  noIndex: true,
});

const PDF_TYPES = [
  ["Deep Review report", "Evidence-backed diagnosis with score reasons, Choice Gap, visuals, limits, and next command."],
  ["Build Fix work plan", "Approved scope, before-state evidence, repair plan, expected deliverables, and customer-safe boundaries."],
  ["Build Fix completion", "After-state proof, QA summary, work completed, remaining issues, and completion record."],
  ["Control snapshot", "Monthly drift, protected strengths, new risks, priorities, and decision-ready trend context."],
  ["Support packet", "Customer-safe support status, correction outcome, or delivery recovery summary."],
  ["Executive summary", "Shorter decision-ready version with current state, boundary, proof, and next command."],
] as const;

const PDF_CHECKS = [
  ["Approved source", "PDF content must come from the same package as dashboard, email, and vault state."],
  ["Visual readiness", "Charts must be wide, labeled, numbered, and tied to decisions."],
  ["Page structure", "Executive summary, findings, proof, priorities, and next command are readable."],
  ["Access state", "Only the correct customer, business, plan, and artifact can open it."],
  ["Delivery state", "PDF readiness, email attachment, vault download, and history stay aligned."],
  ["Recovery state", "Held, failed, stale, or mismatched renders route to retry or support."],
] as const;

const PDF_RULES = [
  "Do not render a PDF from draft, held, mismatched, or unapproved report content.",
  "Do not export cramped dashboard screenshots as executive reports.",
  "Do not let PDF, dashboard, email, and vault versions drift apart.",
  "Do not hide rendering failures; show safe status and route recovery internally.",
] as const;

export default function PdfCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">PDF Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">PDFs should be executive-ready artifacts, not screenshots.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The PDF Command Center governs approved report packages, visual readiness, page structure, access state, vault downloads, email attachments, and rendering recovery.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/visual-registry" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Visual Registry</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Delivery History</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">PDF types</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Review, repair, completion, control, support, and executive artifacts.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{PDF_TYPES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">PDF checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{PDF_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">PDF rules</p><div className="mt-5 grid gap-3">{PDF_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="PDF command guardrails">PDF Command Center. Deep Review report. Build Fix work plan. Build Fix completion. Control snapshot. Support packet. Executive summary. Approved source. Visual readiness. Page structure. Access state. Delivery state. Recovery state. Executive-ready PDF.</section>
    </main>
  );
}
