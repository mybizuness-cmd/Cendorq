import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Conversion Command Center | Cendorq",
  description: "Protected Cendorq Conversion Command Center for value-first CTAs, proof-led plan movement, delivery state, and customer-safe next commands.",
  path: "/dashboard/conversion-command",
  noIndex: true,
});

const CONVERSION_STAGES = [
  ["Signal", "Free Scan shows a first weak signal, confidence, limit, and next command."],
  ["Proof", "Deep Review proves cause, priority, evidence, and the safer repair path."],
  ["Repair", "Build Fix turns approved findings into scoped implementation and completion proof."],
  ["Control", "Ongoing Control protects progress through monthly signal watch and priorities."],
  ["Support", "Support reduces friction when billing, delivery, report, or correction questions appear."],
  ["Recovery", "Held or failed states get customer-safe recovery instead of pressure or silence."],
] as const;

const CTA_RULES = [
  "Lead with current value and proof before showing paid depth.",
  "Send customers to plan detail pages before payment when a notification or report creates interest.",
  "Do not show a repair CTA before the weak point and scope are clear.",
  "Do not show Control as a generic upsell; tie it to drift, protected strengths, or remaining risks.",
] as const;

const VALUE_CHECKS = [
  ["Current state", "What does the customer know right now?"],
  ["Boundary", "What does this plan or report not include?"],
  ["Proof", "What evidence or signal justifies the next step?"],
  ["Next command", "What is the single safest action?"],
] as const;

export default function ConversionCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Conversion Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Conversion should feel like the next logical command, not pressure.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Conversion Command Center keeps CTAs tied to current value, proof, plan boundaries, delivery state, support status, and one safe next action.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/plans" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Compare plan depth</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Conversion stages</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Signal to proof to repair to control, with support and recovery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{CONVERSION_STAGES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Value checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{VALUE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">CTA rules</p><div className="mt-5 grid gap-3">{CTA_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Conversion command guardrails">Conversion Command Center. Signal. Proof. Repair. Control. Support. Recovery. Current state. Boundary. Proof. Next command. proof-led conversion. value-first CTA. plan detail before payment.</section>
    </main>
  );
}
