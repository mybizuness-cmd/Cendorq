import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Competitor Command Center | Cendorq",
  description: "Protected Cendorq Competitor Command Center for category peers, public proof gaps, positioning pressure, AI-answer contrast, visual comparison, and uncertainty-safe competitor signals.",
  path: "/dashboard/competitor-command",
  noIndex: true,
});

const COMPETITOR_AREAS = [
  ["Peer set", "Relevant category, location, service, audience, and buying-path peers instead of random brands."],
  ["Public proof gap", "Visible reviews, profiles, examples, trust markers, offer clarity, and third-party confidence signals."],
  ["Positioning pressure", "Message clarity, service naming, audience fit, proof density, and action-path comparison."],
  ["AI-answer contrast", "Entity clarity, answer readiness, citation context, and missing proof compared with visible peers."],
  ["Visual comparison", "Matrix, benchmark bar, signal stack, and scorecard views that explain what matters."],
  ["Uncertainty boundary", "What cannot be claimed, what is stale, and what needs deeper review before reporting."],
] as const;

const COMPETITOR_CHECKS = [
  ["Relevance", "Competitors or peers must match the customer's real category and decision context."],
  ["Source basis", "Comparison claims need public source context, freshness, and confidence."],
  ["Signal type", "Separate proof gaps, offer gaps, trust gaps, friction gaps, and AI visibility gaps."],
  ["Customer decision", "Every comparison should answer what the customer should fix, protect, or review next."],
  ["Visual clarity", "Comparisons must be readable, bounded, and tied to a report finding."],
  ["Plan boundary", "Free Scan can flag pressure; Deep Review validates; Build Fix acts; Control watches drift."],
] as const;

const COMPETITOR_RULES = [
  "Do not invent private competitor data, revenue, traffic, ranking, market share, or AI placement.",
  "Do not compare against irrelevant enterprise examples when local or category peers explain the issue better.",
  "Do not let competitor research bypass Source Command, Benchmark Command, Evidence Catalog, or Quality Gate.",
  "Do not make comparison visuals look exact when the evidence only supports directional pressure.",
] as const;

export default function CompetitorCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Competitor Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Competitor signals should create useful pressure without fake certainty.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Competitor Command Center governs peer sets, public proof gaps, positioning pressure, AI-answer contrast, comparison visuals, and uncertainty so agents can compare intelligently without inventing private data.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/benchmark-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Benchmark Command</Link>
            <Link href="/dashboard/source-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Source Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Competitor areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Peer set, proof gap, positioning pressure, AI contrast, visuals, and uncertainty.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{COMPETITOR_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Competitor checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{COMPETITOR_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Competitor rules</p><div className="mt-5 grid gap-3">{COMPETITOR_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Competitor command guardrails">Competitor Command Center. Peer set. Public proof gap. Positioning pressure. AI-answer contrast. Visual comparison. Uncertainty boundary. Relevance. Source basis. Signal type. Customer decision. Visual clarity. Plan boundary. competitor-safe comparison.</section>
    </main>
  );
}
