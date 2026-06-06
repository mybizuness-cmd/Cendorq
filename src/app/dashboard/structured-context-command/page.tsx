import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Structured Context Command Center | Cendorq",
  description: "Protected Cendorq Structured Context Command Center for schema, FAQ blocks, same-as links, service and location context, proof markup, AI/search readability, conflicts, and repair routing.",
  path: "/dashboard/structured-context-command",
  noIndex: true,
});

const CONTEXT_AREAS = [
  ["Schema layer", "Organization, LocalBusiness, Service, FAQ, Review, Breadcrumb, Product, Article, and page-level context."],
  ["Same-as links", "Public profiles, listings, social pages, maps, and trusted references that connect entity signals."],
  ["Service context", "Offer names, service descriptions, exclusions, proof, pricing context, and customer questions."],
  ["Location context", "Address, service area, local pages, map profiles, hours, and location-specific proof."],
  ["Proof context", "Reviews, testimonials, case examples, certifications, awards, guarantees, and trust markers that need support."],
  ["AI readability", "Machine-readable signals that help answer engines understand the business without guessing."],
] as const;

const CONTEXT_CHECKS = [
  ["Truth match", "Structured data must match verified Business Truth and visible page content."],
  ["Conflict check", "Contradictory names, categories, locations, services, or proof require review before release."],
  ["Source support", "Every marked-up claim needs a source, confidence level, and safe visibility state."],
  ["Coverage", "Important entity, service, location, and proof context is not missing from key pages."],
  ["Validation", "Markup should be syntactically valid, crawlable, and aligned with page intent."],
  ["Repair route", "Missing or broken structure routes to Build Fix scope, support, or Control watch state."],
] as const;

const CONTEXT_RULES = [
  "Do not mark up facts, awards, reviews, ratings, locations, services, or guarantees that are not supported.",
  "Do not use structured data to hide claims that are not visible or customer-safe on the page.",
  "Do not treat schema alone as proof of search or AI visibility.",
  "Do not publish structured context recommendations unless Entity Command, Source Command, Business Truth, Evidence Catalog, and Quality Gate can support them.",
] as const;

export default function StructuredContextCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Structured Context Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Machine-readable context should clarify truth, not manufacture authority.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Structured Context Command Center governs schema, FAQ blocks, same-as links, service and location context, proof markup, AI/search readability, conflicts, validation, and repair routing.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/entity-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Entity Command</Link>
            <Link href="/dashboard/business-truth" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Business Truth</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Context areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Schema, same-as, services, locations, proof, and AI readability.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{CONTEXT_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Context checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{CONTEXT_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Context rules</p><div className="mt-5 grid gap-3">{CONTEXT_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Structured context command guardrails">Structured Context Command Center. Schema layer. Same-as links. Service context. Location context. Proof context. AI readability. Truth match. Conflict check. Source support. Coverage. Validation. Repair route. machine-readable context with Business Truth support.</section>
    </main>
  );
}
