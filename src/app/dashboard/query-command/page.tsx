import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Query Command Center | Cendorq",
  description: "Protected Cendorq Query Command Center for customer questions, search intent, local and service prompts, comparison prompts, AI-answer prompts, evidence support, and plan-safe language.",
  path: "/dashboard/query-command",
  noIndex: true,
});

const QUERY_AREAS = [
  ["Customer questions", "Real buying, trust, service, pricing, timing, location, and comparison questions customers may ask."],
  ["Search intent", "Informational, commercial, local, branded, competitor, problem-aware, and high-intent queries."],
  ["AI-answer prompts", "Prompt families that test entity clarity, answer readiness, proof, and risk without claiming universal results."],
  ["Local/service prompts", "Location, service-area, specialty, urgent-need, and category phrases tied to business context."],
  ["Comparison prompts", "Safe comparison questions that expose proof gaps, positioning pressure, and category expectations."],
  ["Repair prompts", "Questions that reveal what content, proof, structure, or profile data needs to be improved."],
] as const;

const QUERY_CHECKS = [
  ["Intent", "What the customer or AI system is likely trying to resolve."],
  ["Plan fit", "Whether the query belongs in Scan, Deep Review, Build Fix, or Ongoing Control."],
  ["Evidence", "Which sources, pages, profiles, or proof can support the answer."],
  ["Variability", "Whether results may change by wording, location, platform, model, time, or user context."],
  ["Customer action", "What the query implies the business should fix, clarify, protect, or watch."],
  ["Report wording", "How the query should be described without fake certainty or overclaiming."],
] as const;

const QUERY_RULES = [
  "Do not treat a keyword, prompt, or query result as a permanent business truth by itself.",
  "Do not invent search volume, rankings, AI answer outcomes, or competitor presence without supported sources.",
  "Do not mix Free Scan directional hints with Deep Review evidence-backed findings.",
  "Do not publish query intelligence unless Source Command, AI Answer Command, Benchmark Command, Evidence Catalog, and Quality Gate can support it.",
] as const;

export default function QueryCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Query Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Queries should explain customer demand, AI pressure, and next action.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Query Command Center governs customer questions, search intent, local/service prompts, comparison prompts, AI-answer prompts, evidence support, variability, and plan-safe report language.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/ai-answer-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open AI Answer Command</Link>
            <Link href="/dashboard/source-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Source Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Query areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Questions, search intent, AI prompts, local service prompts, comparisons, and repair prompts.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{QUERY_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Query checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{QUERY_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Query rules</p><div className="mt-5 grid gap-3">{QUERY_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Query command guardrails">Query Command Center. Customer questions. Search intent. AI-answer prompts. Local service prompts. Comparison prompts. Repair prompts. Intent. Plan fit. Evidence. Variability. Customer action. Report wording. query intelligence with evidence support.</section>
    </main>
  );
}
