import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Source Command Center | Cendorq",
  description: "Protected Cendorq Source Command Center for website pages, public profiles, reviews, listings, AI-answer signals, customer-provided material, source freshness, conflicts, and evidence use.",
  path: "/dashboard/source-command",
  noIndex: true,
});

const SOURCE_AREAS = [
  ["Owned website", "Home, service, location, proof, FAQ, pricing, contact, booking, and conversion pages."],
  ["Public profiles", "Business listings, maps profiles, social pages, review platforms, and third-party directories."],
  ["Search surface", "SERP snippets, local results, knowledge panels, answer boxes, and query intent context."],
  ["AI-answer surface", "AI response visibility, answer readiness, citation context, and missing trust signals."],
  ["Customer material", "Uploads, claims, screenshots, notes, examples, and corrections that need verification."],
  ["Market references", "Comparable public signals and category context without unsupported competitor claims."],
] as const;

const SOURCE_CHECKS = [
  ["Freshness", "When the source was observed and whether it is current enough to support a finding."],
  ["Conflict", "Whether sources disagree about name, services, location, hours, proof, or action path."],
  ["Confidence", "How directly a source supports the report statement, score, or visual."],
  ["Visibility", "Customer-safe, restricted, internal-only, or needs review before use."],
  ["Lineage", "Which finding, score, visual, report artifact, support answer, or correction it supports."],
  ["Recovery", "What happens when a source is missing, blocked, stale, contradictory, or customer-provided only."],
] as const;

const SOURCE_RULES = [
  "Do not turn a customer-provided claim into public proof before verification.",
  "Do not cite stale, contradictory, blocked, or unclear sources as high-confidence evidence.",
  "Do not overstate competitor, ranking, market, or AI-answer position without supported source context.",
  "Do not let source research bypass Business Truth, Evidence Catalog, Report Lineage, or Quality Gate.",
] as const;

export default function SourceCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Source Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Deep research needs governed sources, not loose screenshots.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Source Command Center maps website pages, public profiles, search surfaces, AI-answer signals, customer material, source freshness, conflicts, confidence, visibility, and evidence use before findings reach reports.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/evidence-catalog" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Evidence Catalog</Link>
            <Link href="/dashboard/report-lineage" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Report Lineage</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Source areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Website, profiles, search, AI answers, customer material, and market references.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{SOURCE_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Source checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{SOURCE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Source rules</p><div className="mt-5 grid gap-3">{SOURCE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Source command guardrails">Source Command Center. Owned website. Public profiles. Search surface. AI-answer surface. Customer material. Market references. Freshness. Conflict. Confidence. Visibility. Lineage. Recovery. governed source research.</section>
    </main>
  );
}
