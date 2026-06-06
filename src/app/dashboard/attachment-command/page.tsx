import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Attachment Command Center | Cendorq",
  description: "Protected Cendorq Attachment Command Center for customer-safe files, report artifacts, support attachments, downloads, source visibility, and delivery recovery.",
  path: "/dashboard/attachment-command",
  noIndex: true,
});

const ATTACHMENT_TYPES = [
  ["Report artifact", "Approved customer-facing report file tied to the report vault and delivery history."],
  ["Work plan", "Build Fix scope and before-state proof prepared before repair work moves forward."],
  ["Completion artifact", "After-state proof, QA summary, and final Build Fix completion record."],
  ["Control snapshot", "Monthly customer-safe drift, strengths, risks, and next priorities."],
  ["Support upload", "Customer-provided context for correction, delivery, billing, or scope support."],
  ["Evidence reference", "Restricted source context that supports findings without raw exposure."],
] as const;

const ATTACHMENT_CHECKS = [
  ["Visibility", "Customer-safe, restricted, internal-only, or needs review."],
  ["Ownership", "Account, business, plan, and artifact state match before access."],
  ["Version", "Dashboard, email, vault, and delivery history use the same approved file state."],
  ["Retention", "Keep what is needed for support and audit without exposing raw internals."],
  ["Download state", "Track ready, downloaded, resent, held, failed, or recovered."],
  ["Recovery", "Retry or route to support when files are missing, stale, or mismatched."],
] as const;

const ATTACHMENT_RULES = [
  "Do not expose restricted evidence or internal notes as customer downloads.",
  "Do not let email attachments and dashboard downloads become different report versions.",
  "Do not accept customer uploads as verified truth until Business Truth review is complete.",
  "Do not show a file as ready before entitlement, release, and delivery state align.",
] as const;

export default function AttachmentCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Attachment Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Files should follow the same truth, access, and delivery rules as reports.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Attachment Command Center governs customer-safe artifacts, support uploads, report downloads, evidence references, version alignment, and recovery states.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/delivery-history" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Delivery History</Link>
            <Link href="/dashboard/evidence-catalog" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Evidence Catalog</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Attachment types</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Reports, work plans, completion files, snapshots, uploads, and evidence references.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{ATTACHMENT_TYPES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Attachment checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{ATTACHMENT_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Attachment rules</p><div className="mt-5 grid gap-3">{ATTACHMENT_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Attachment command guardrails">Attachment Command Center. Report artifact. Work plan. Completion artifact. Control snapshot. Support upload. Evidence reference. Visibility. Ownership. Version. Retention. Download state. Recovery. customer-safe attachments.</section>
    </main>
  );
}
