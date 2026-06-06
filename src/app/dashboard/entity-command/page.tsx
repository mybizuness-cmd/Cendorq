import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Entity Command Center | Cendorq",
  description: "Protected Cendorq Entity Command Center for business identity, category, location, services, profiles, structured context, conflicting facts, and AI/search recognition.",
  path: "/dashboard/entity-command",
  noIndex: true,
});

const ENTITY_AREAS = [
  ["Identity", "Business name, aliases, brand spelling, ownership context, website, and contact consistency."],
  ["Category", "Primary category, service type, specialties, audience, and category-language clarity."],
  ["Location", "Address, service area, local pages, map profiles, hours, and location-specific trust context."],
  ["Services", "Core offers, exclusions, proof, buying path, service pages, and customer question coverage."],
  ["Profiles", "Public profiles, listings, review surfaces, social pages, and third-party entity references."],
  ["Structured context", "Schema, page structure, FAQ context, same-as links, and machine-readable proof support."],
] as const;

const ENTITY_CHECKS = [
  ["Consistency", "Whether public sources agree about the business name, category, location, services, and action paths."],
  ["Completeness", "Whether enough public context exists for search and AI systems to understand the entity."],
  ["Conflict", "Which source conflicts need Business Truth review before report claims are made."],
  ["Source support", "Which pages, profiles, listings, or customer-provided materials support the entity signal."],
  ["Recognition risk", "Where thin, stale, inconsistent, or missing entity context may weaken visibility."],
  ["Repair route", "What can be improved through pages, profiles, structured context, proof, listings, or support corrections."],
] as const;

const ENTITY_RULES = [
  "Do not invent business facts, locations, services, ownership, certifications, awards, or profile data.",
  "Do not treat customer-provided identity details as verified public truth until Business Truth review is complete.",
  "Do not claim AI or search systems recognize the business universally from one source or one prompt.",
  "Do not publish entity recommendations unless Source Command, Query Command, Search Surface Command, Evidence Catalog, and Quality Gate can support them.",
] as const;

export default function EntityCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Entity Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">AI and search visibility starts with a clean business entity.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Entity Command Center governs identity, category, location, services, profiles, structured context, conflicting facts, recognition risk, source support, and repair routing without inventing facts.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/business-truth" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Business Truth</Link>
            <Link href="/dashboard/source-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Source Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Entity areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Identity, category, location, services, profiles, and structured context.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{ENTITY_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Entity checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{ENTITY_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Entity rules</p><div className="mt-5 grid gap-3">{ENTITY_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Entity command guardrails">Entity Command Center. Identity. Category. Location. Services. Profiles. Structured context. Consistency. Completeness. Conflict. Source support. Recognition risk. Repair route. clean entity intelligence with Business Truth and evidence support.</section>
    </main>
  );
}
