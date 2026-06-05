import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Evidence Catalog | Cendorq",
  description: "Protected Cendorq Evidence Catalog for source context, confidence, visibility, findings, report links, and release-safe evidence handling.",
  path: "/dashboard/evidence-catalog",
  noIndex: true,
});

const CATALOG_FIELDS = [
  ["Source context", "Where the evidence came from and what question it can support."],
  ["Capture state", "When it was observed, whether it is fresh, stale, repeated, or contradicted."],
  ["Confidence", "How directly the evidence supports a finding or report section."],
  ["Visibility", "Customer-safe, restricted, internal-only, or needs review."],
  ["Linked finding", "Which score, Choice Gap, Repair Priority, or Control Snapshot it supports."],
  ["Release use", "Whether it appears in dashboard, PDF, email, vault, or support context."],
] as const;

const EVIDENCE_STATES = [
  ["Customer-safe", "Can be summarized in a report or support explanation."],
  ["Restricted", "Can guide agents but needs editing before customer display."],
  ["Internal-only", "Used for operations, never copied directly into customer artifacts."],
  ["Needs review", "Not strong enough to support a final customer-facing statement yet."],
] as const;

const CATALOG_RULES = [
  "No customer-facing finding should be orphaned from evidence or uncertainty.",
  "Charts should link back to score reasons, findings, and safe evidence context.",
  "Raw internal notes should not appear in dashboard, PDF, email, or support summaries.",
  "Contradictory, stale, or missing evidence must lower confidence instead of raising claims.",
] as const;

export default function EvidenceCatalogPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Evidence Catalog</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Every finding should know what evidence supports it.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Evidence Catalog connects sources, confidence, visibility, findings, visuals, reports, delivery, and support context so Cendorq does not publish unsupported claims.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open report vault</Link>
            <Link href="/dashboard/business-truth" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Business Truth</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Evidence states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Customer-safe, restricted, internal-only, or needs review.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{EVIDENCE_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Catalog fields</p><div className="mt-5 grid gap-3 md:grid-cols-2">{CATALOG_FIELDS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Catalog rules</p><div className="mt-5 grid gap-3">{CATALOG_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Evidence catalog guardrails">Evidence Catalog. Source context. Capture state. Confidence. Visibility. Linked finding. Release use. Customer-safe. Restricted. Internal-only. Needs review. Report lineage. Score reasons. Visual module evidence. Report-safe evidence context.</section>
    </main>
  );
}
