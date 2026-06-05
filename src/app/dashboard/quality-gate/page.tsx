import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quality Gate Center | Cendorq",
  description: "Protected Cendorq Quality Gate Center for evidence support, report wording, visual clarity, entitlement checks, delivery readiness, support routing, and recovery state.",
  path: "/dashboard/quality-gate",
  noIndex: true,
});

const QUALITY_CHECKS = [
  ["Evidence support", "Every finding connects to source context, confidence, and uncertainty."],
  ["Business truth", "Customer-provided facts are reviewed before they become customer-facing proof."],
  ["Report wording", "Language is useful, bounded, and clear without unsupported promises."],
  ["Visual clarity", "Numbers, labels, graphs, tables, and scorecards explain a decision."],
  ["Plan boundary", "Scan, Review, Repair, and Control depth stay separated."],
  ["Entitlement", "Account, business, plan, artifact, and release state align before access."],
  ["Delivery readiness", "Dashboard, PDF, email, vault, and delivery history tell the same story."],
  ["Recovery path", "Held, failed, or missing states route to customer-safe recovery."],
] as const;

const QA_STATES = [
  ["Pass", "Safe to show or move forward."],
  ["Hold", "Needs review before customer-facing delivery."],
  ["Revise", "Needs clearer wording, stronger evidence, or better visuals."],
  ["Recover", "Needs retry, support routing, or customer-safe status update."],
] as const;

const GATE_RULES = [
  "Do not publish a report when evidence, wording, visuals, entitlement, or delivery state is incomplete.",
  "Do not use charts that are too small, unlabeled, decorative, or detached from findings.",
  "Do not turn customer-provided context into verified proof before review.",
  "Do not let paid CTAs appear before the customer understands the current value and boundary.",
] as const;

export default function QualityGatePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Quality Gate Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Customer-facing work should pass quality before it ships.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Quality Gate checks evidence, business truth, report wording, visual clarity, plan boundary, entitlement, delivery readiness, support routing, and recovery state before the customer sees the artifact.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/operations-index" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Operations Index</Link>
            <Link href="/dashboard/release-gate" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Release Gate</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">QA states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Pass, hold, revise, or recover before delivery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{QA_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Quality checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{QUALITY_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Gate rules</p><div className="mt-5 grid gap-3">{GATE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Quality gate guardrails">Quality Gate Center. Evidence support. Business truth. Report wording. Visual clarity. Plan boundary. Entitlement. Delivery readiness. Recovery path. Pass. Hold. Revise. Recover. Customer-facing quality gate.</section>
    </main>
  );
}
