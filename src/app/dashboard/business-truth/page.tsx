import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Business Truth Profile | Cendorq",
  description: "Protected Cendorq Business Truth Profile for verified business facts, source confidence, correction state, and report-safe context.",
  path: "/dashboard/business-truth",
  noIndex: true,
});

const TRUTH_SECTIONS = [
  ["Identity", "Business name, website, category, audience, and customer-facing positioning."],
  ["Services", "Approved services, service language, exclusions, and unclear offer claims."],
  ["Market area", "Locations, service area, local context, and public profile consistency."],
  ["Proof", "Reviews, credentials, examples, listings, screenshots, and customer-safe evidence."],
  ["Action path", "Call, book, request, buy, message, demo, or quote path expectations."],
  ["Corrections", "Customer updates that require review before changing reports or artifacts."],
] as const;

const TRUTH_STATES = [
  ["Verified", "Can support customer-facing report language."],
  ["Customer-provided", "Useful context, but not public proof until checked."],
  ["Needs review", "May be incomplete, outdated, unclear, or contradictory."],
  ["Not customer-visible", "Internal notes stay out of reports and PDFs."],
] as const;

const TRUTH_RULES = [
  "Do not turn customer-provided claims into report proof without review.",
  "Do not publish services, locations, guarantees, or credentials that are not supported.",
  "Keep Business Truth updates connected to correction requests and report release flow.",
  "Use uncertainty when public facts are stale, missing, or conflicting.",
] as const;

export default function BusinessTruthPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Business Truth Profile</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Reports should start from verified business truth.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Business Truth Profile separates verified facts, customer-provided context, reviewed evidence, and corrections so Scan, Review, Repair, and Control do not overstate what is known.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/correction" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Request correction</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Truth states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Verified, provided, needs review, or internal-only.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{TRUTH_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Truth sections</p><div className="mt-5 grid gap-3 md:grid-cols-2">{TRUTH_SECTIONS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Truth rules</p><div className="mt-5 grid gap-3">{TRUTH_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Business truth guardrails">Business Truth Profile. Business Truth review. Verified facts. Customer-provided context. Needs review. Internal-only. Identity. Services. Market area. Proof. Action path. Corrections. Report-safe context.</section>
    </main>
  );
}
