import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search Surface Command Center | Cendorq",
  description: "Protected Cendorq Search Surface Command Center for search result snippets, local visibility, business profile signals, review visibility, answer surfaces, AI answer pressure, source support, and safe report language.",
  path: "/dashboard/search-surface-command",
  noIndex: true,
});

const SEARCH_AREAS = [
  ["Result snippets", "Titles, descriptions, page clarity, proof language, and query fit visible before the click."],
  ["Local visibility", "Map visibility, category clarity, service area, review signals, photos, services, and action paths."],
  ["Business profile signals", "Name, category, location, services, descriptions, profiles, and conflicting public facts."],
  ["Answer surfaces", "Short answers, question modules, FAQ opportunities, and source-context gaps."],
  ["AI answer pressure", "AI summary readiness, citation pressure, source gaps, and variability across prompts and time."],
  ["Review visibility", "Rating, recency, volume, themes, owner responses, and trust signals visible before click."],
] as const;

const SEARCH_CHECKS = [
  ["Surface", "Which search surface or result type is being reviewed."],
  ["Source support", "What page, profile, listing, review, or source context supports the observation."],
  ["Freshness", "Whether the observed result is current enough to support the finding."],
  ["Variability", "Whether results may change by location, device, personalization, time, or query wording."],
  ["Customer impact", "What the visibility signal means for trust, discovery, comparison, or conversion."],
  ["Repair route", "What can be improved through content, profiles, proof, structured context, reviews, or action paths."],
] as const;

const SEARCH_RULES = [
  "Do not claim fixed placement, guaranteed visibility, or universal discovery from one observed result.",
  "Do not invent demand, visible features, local position, review facts, or AI answer inclusion.",
  "Do not treat search snippets as permanent truth without Source Command, Query Command, and Evidence Catalog support.",
  "Do not publish search-surface findings unless Report Lineage, Visual Registry, and Quality Gate can support the language and visuals.",
] as const;

export default function SearchSurfaceCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Search Surface Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Search surfaces should be read as supported signals, not fake certainty.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Search Surface Command Center governs snippets, local visibility, business profile signals, reviews, answer surfaces, AI answer pressure, source support, freshness, variability, and safe report language.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/query-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Query Command</Link>
            <Link href="/dashboard/source-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Source Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Search areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Snippets, local visibility, profiles, answers, AI pressure, and reviews.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{SEARCH_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Search checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{SEARCH_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Search rules</p><div className="mt-5 grid gap-3">{SEARCH_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Search surface command guardrails">Search Surface Command Center. Result snippets. Local visibility. Business profile signals. Answer surfaces. AI answer pressure. Review visibility. Surface. Source support. Freshness. Variability. Customer impact. Repair route. search surface intelligence with uncertainty.</section>
    </main>
  );
}
