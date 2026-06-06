import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Answer Command Center | Cendorq",
  description: "Protected Cendorq AI Answer Command Center for AI visibility prompts, entity clarity, answer readiness, citation context, hallucination risk, source support, and safe report language.",
  path: "/dashboard/ai-answer-command",
  noIndex: true,
});

const AI_ANSWER_AREAS = [
  ["Prompt set", "Customer, category, local, service, problem, comparison, and buying-intent questions."],
  ["Entity clarity", "Name, category, location, services, proof, profiles, and website signals that help AI systems identify the business."],
  ["Answer readiness", "Whether available public context can support a useful AI answer without guessing."],
  ["Citation context", "Which public pages, profiles, reviews, listings, or references could support an answer."],
  ["Hallucination risk", "Where missing, conflicting, stale, or thin source context may cause bad AI answers."],
  ["Safe language", "How report wording explains visibility pressure without claiming universal model behavior."],
] as const;

const AI_ANSWER_CHECKS = [
  ["Surface", "Which AI-answer surface or prompt family is being discussed."],
  ["Source support", "What source context supports the observation, and how strong it is."],
  ["Variability", "Whether results may vary by model, time, location, prompt wording, or user context."],
  ["Customer impact", "What the signal means for trust, discovery, comparison, or conversion."],
  ["Repair path", "What can be improved: website clarity, proof, profiles, listings, reviews, or structured context."],
  ["Report boundary", "What should be framed as observed, directional, uncertain, or needing deeper review."],
] as const;

const AI_ANSWER_RULES = [
  "Do not claim a business is always present or always absent across every AI system unless the evidence supports that exact scope.",
  "Do not invent AI citations, prompt results, rankings, recommendations, or model-specific outcomes.",
  "Do not treat a single prompt response as a permanent market truth.",
  "Do not bypass Source Command, Benchmark Command, Competitor Command, Evidence Catalog, Report Lineage, or Quality Gate when reporting AI-answer findings.",
] as const;

export default function AiAnswerCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">AI Answer Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">AI visibility should be diagnosed with source support and uncertainty.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The AI Answer Command Center governs prompt sets, entity clarity, answer readiness, citation context, hallucination risk, source support, and safe report language so findings are useful without pretending model behavior is fixed everywhere.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/source-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Source Command</Link>
            <Link href="/dashboard/quality-gate" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Quality Gate</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">AI-answer areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Prompts, entity clarity, readiness, citations, risk, and safe language.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{AI_ANSWER_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">AI-answer checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{AI_ANSWER_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">AI-answer rules</p><div className="mt-5 grid gap-3">{AI_ANSWER_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="AI answer command guardrails">AI Answer Command Center. Prompt set. Entity clarity. Answer readiness. Citation context. Hallucination risk. Safe language. Surface. Source support. Variability. Customer impact. Repair path. Report boundary. AI visibility with uncertainty.</section>
    </main>
  );
}
