import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Agent Operating Doctrine | Cendorq",
  description: "Protected Cendorq Agent Operating Doctrine for Scan, Review, Repair, Control, support, evidence, visuals, release, delivery, and recovery behavior.",
  path: "/dashboard/agent-doctrine",
  noIndex: true,
});

const AGENT_LANES = [
  ["Scan agent", "Find the first visible weak signal, confidence, limit, and next command without pretending it is a full diagnosis."],
  ["Review agent", "Build evidence-backed findings, Choice Gap, score reasons, priorities, limits, and customer-safe report language."],
  ["Repair agent", "Translate approved findings into scope, before evidence, work plan, QA, after evidence, and completion artifact."],
  ["Control agent", "Monitor monthly drift, protected strengths, new risks, baseline changes, and next priorities."],
  ["Support agent", "Route report questions, delivery issues, corrections, billing blockers, and scope confusion safely."],
  ["Evidence agent", "Connect source context, confidence, capture state, visibility, findings, visuals, and release use."],
  ["Visual agent", "Use scorecards, matrices, trends, tables, and timelines only when they clarify a decision."],
  ["Recovery agent", "Turn held, failed, or missing workflow states into safe recovery and customer-visible status."],
] as const;

const DOCTRINE_STATES = [
  ["Observe", "Gather business truth, evidence, plan state, and customer context."],
  ["Separate", "Keep Scan, Review, Repair, and Control depth distinct."],
  ["Prove", "Connect every customer-facing claim to evidence, confidence, and limits."],
  ["Route", "Send the customer to the safest next surface, not the loudest CTA."],
] as const;

const AGENT_RULES = [
  "Do not invent facts, scores, evidence, competitor positions, rankings, or customer outcomes.",
  "Do not expose raw evidence, internal notes, prompts, secrets, payment records, or private identifiers.",
  "Do not move paid artifacts past release, quality, entitlement, or delivery gates early.",
  "Do not copy another platform; adapt proven patterns into Cendorq-specific customer value and proof.",
] as const;

export default function AgentDoctrinePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Agent Operating Doctrine</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Agents should operate from proof, plan depth, and customer-safe next commands.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Agent Operating Doctrine tells every Cendorq agent how to handle Scan, Review, Repair, Control, support, evidence, visuals, release, delivery, and recovery without overclaiming or creating mess.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/quality-gate" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Quality Gate</Link>
            <Link href="/dashboard/operations-index" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Operations Index</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Doctrine states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Observe, separate, prove, and route.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{DOCTRINE_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Agent lanes</p><div className="mt-5 grid gap-3 md:grid-cols-2">{AGENT_LANES.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Agent rules</p><div className="mt-5 grid gap-3">{AGENT_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Agent doctrine guardrails">Agent Operating Doctrine. Scan agent. Review agent. Repair agent. Control agent. Support agent. Evidence agent. Visual agent. Recovery agent. Observe. Separate. Prove. Route. customer-safe next command. agent operating doctrine.</section>
    </main>
  );
}
