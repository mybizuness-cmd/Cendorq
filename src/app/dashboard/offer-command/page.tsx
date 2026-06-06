import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Offer Command Center | Cendorq",
  description: "Protected Cendorq Offer Command Center for services, packages, pricing context, guarantees, exclusions, proof, buying path, conversion friction, and repair routing.",
  path: "/dashboard/offer-command",
  noIndex: true,
});

const OFFER_AREAS = [
  ["Service clarity", "What the business sells, who it is for, where it applies, and what customer problem it solves."],
  ["Package structure", "Plans, bundles, service tiers, included work, optional add-ons, and boundaries."],
  ["Pricing context", "Visible pricing, quote paths, payment expectations, uncertainty, and friction before action."],
  ["Guarantees", "Guarantee language, risk reversal, limits, proof support, and claim safety."],
  ["Exclusions", "What is not included, what requires custom review, and where scope confusion may happen."],
  ["Buying path", "Calls, forms, bookings, checkout, consultation, support, and next-step clarity."],
] as const;

const OFFER_CHECKS = [
  ["Truth support", "Offer statements must match verified Business Truth and visible customer-facing pages."],
  ["Proof fit", "Claims about outcomes, guarantees, value, speed, or quality need evidence or careful boundaries."],
  ["Friction", "Unclear pricing, weak CTAs, missing proof, vague scope, and confusing steps become repair signals."],
  ["Plan fit", "Free Scan can flag confusion; Deep Review proves gaps; Build Fix repairs; Control watches drift."],
  ["Conversion path", "Every offer should have one clear next action and one safe support fallback."],
  ["Repair route", "Offer problems route to content, proof, profile, form, CTA, page structure, or support correction work."],
] as const;

const OFFER_RULES = [
  "Do not invent services, prices, discounts, guarantees, outcomes, availability, or included work.",
  "Do not present customer-provided offer details as verified public truth before Business Truth review.",
  "Do not imply Build Fix includes unlimited strategy, copywriting, development, or implementation beyond approved scope.",
  "Do not publish offer recommendations unless Source Command, Business Truth, Evidence Catalog, Report Lineage, and Quality Gate can support them.",
] as const;

export default function OfferCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Offer Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Offer clarity turns traffic, trust, and reports into action.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Offer Command Center governs services, packages, pricing context, guarantees, exclusions, proof, buying path, conversion friction, plan boundaries, and repair routing without inventing or overpromising.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/business-truth" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Business Truth</Link>
            <Link href="/dashboard/conversion-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Conversion Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Offer areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Services, packages, pricing, guarantees, exclusions, and buying path.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{OFFER_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Offer checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{OFFER_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Offer rules</p><div className="mt-5 grid gap-3">{OFFER_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Offer command guardrails">Offer Command Center. Service clarity. Package structure. Pricing context. Guarantees. Exclusions. Buying path. Truth support. Proof fit. Friction. Plan fit. Conversion path. Repair route. evidence-backed offer intelligence.</section>
    </main>
  );
}
