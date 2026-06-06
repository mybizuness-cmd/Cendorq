import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reputation Command Center | Cendorq",
  description: "Protected Cendorq Reputation Command Center for ratings, review themes, recency, owner responses, testimonials, proof claims, trust gaps, source support, and repair routing.",
  path: "/dashboard/reputation-command",
  noIndex: true,
});

const REPUTATION_AREAS = [
  ["Ratings", "Visible rating signals, rating distribution, platform context, and confidence limits."],
  ["Review recency", "Freshness, review velocity, stale proof, seasonality, and drift risk."],
  ["Review themes", "Customer praise, complaints, repeated friction, service expectations, and trust patterns."],
  ["Owner responses", "Response coverage, tone, unresolved issues, correction signals, and public reassurance."],
  ["Testimonials", "Website testimonials, case examples, named proof, claim support, and customer-safe limitations."],
  ["Trust gaps", "Missing proof, weak review density, unresolved reputation risk, or mismatched public confidence."],
] as const;

const REPUTATION_CHECKS = [
  ["Source support", "Which review platform, website page, profile, listing, or customer material supports the signal."],
  ["Freshness", "Whether the reputation signal is current enough to support a finding or visual."],
  ["Theme confidence", "Whether the pattern is repeated, isolated, directional, or needs deeper review."],
  ["Public visibility", "What customers can see before they click, call, book, or compare."],
  ["Business Truth", "Customer-provided proof and testimonials must be reviewed before becoming report evidence."],
  ["Repair route", "What should be improved through review response, proof placement, profile updates, or Build Fix scope."],
] as const;

const REPUTATION_RULES = [
  "Do not invent reviews, ratings, testimonial details, customer quotes, platform signals, or sentiment patterns.",
  "Do not treat one review as a full business truth unless the report clearly frames it as isolated evidence.",
  "Do not publish unsupported review claims, awards, guarantees, or proof language.",
  "Do not bypass Source Command, Business Truth, Evidence Catalog, Report Lineage, Visual Registry, or Quality Gate when reporting reputation findings.",
] as const;

export default function ReputationCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Reputation Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Reputation signals should become proof, not unsupported claims.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Reputation Command Center governs ratings, review recency, review themes, owner responses, testimonials, proof claims, trust gaps, source support, and repair routing so customer trust signals remain evidence-backed.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/source-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Source Command</Link>
            <Link href="/dashboard/evidence-catalog" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Evidence Catalog</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Reputation areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Ratings, recency, themes, responses, testimonials, and trust gaps.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{REPUTATION_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Reputation checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{REPUTATION_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Reputation rules</p><div className="mt-5 grid gap-3">{REPUTATION_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Reputation command guardrails">Reputation Command Center. Ratings. Review recency. Review themes. Owner responses. Testimonials. Trust gaps. Source support. Freshness. Theme confidence. Public visibility. Business Truth. Repair route. evidence-backed reputation intelligence.</section>
    </main>
  );
}
