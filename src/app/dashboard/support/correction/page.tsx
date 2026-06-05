import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Correction Intake | Cendorq",
  description: "Protected Cendorq correction intake for business facts, report questions, delivery corrections, and customer-safe review routing.",
  path: "/dashboard/support/correction",
  noIndex: true,
});

const CORRECTION_TYPES = [
  ["Business facts", "Name, service area, address, hours, services, category, or audience needs review."],
  ["Proof details", "Review, credential, screenshot, listing, or public proof needs updated context."],
  ["Report wording", "A finding may need clearer language, confidence, limitation, or source explanation."],
  ["Delivery record", "Dashboard, PDF, email, download, resend, or report-vault state needs correction."],
  ["Plan state", "Scan, Review, Repair, or Control access appears unclear or mismatched."],
  ["Scope boundary", "Build Fix or Control expectations need a clearer included/excluded explanation."],
] as const;

const REVIEW_STEPS = [
  ["Receive", "Capture the customer-safe correction request."],
  ["Classify", "Route to business truth, report, delivery, plan, or scope review."],
  ["Verify", "Check the correction against approved customer context and visible evidence."],
  ["Update", "Change only the approved customer-facing artifact or status."],
  ["Record", "Keep correction history tied to the report and support thread."],
  ["Return", "Send the customer back to the right command surface."],
] as const;

const SAFE_INPUT_RULES = [
  "Send business context, not passwords, private keys, card data, or account secrets.",
  "Separate customer-provided claims from public evidence until review is complete.",
  "Do not treat a correction request as proof until it is verified.",
  "Do not rewrite reports outside the release and delivery flow.",
] as const;

export default function CorrectionIntakePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Correction intake</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Correct the source truth before changing the report.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Corrections should route business facts, proof details, report wording, delivery records, plan state, and scope boundaries through review before customer-facing artifacts change.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/request" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Start protected request</Link>
            <Link href="/dashboard/support/status" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Track status</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Review workflow</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Request to classification to verification to customer-safe update.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{REVIEW_STEPS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Correction types</p><div className="mt-5 grid gap-3 md:grid-cols-2">{CORRECTION_TYPES.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Safe input rules</p><div className="mt-5 grid gap-3">{SAFE_INPUT_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Correction intake guardrails">Correction intake. Business facts. Proof details. Report wording. Delivery record. Plan state. Scope boundary. Business Truth review. customer-safe update. support request. correction request. report correction.</section>
    </main>
  );
}
