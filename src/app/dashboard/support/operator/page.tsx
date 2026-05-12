import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportOperatorGateQueue } from "@/components/customer-support/support-operator-gate-queue";

export const metadata = buildMetadata({
  title: "Support operator gate queue | Cendorq",
  description: "Protected Cendorq operator queue for reviewing work-start gate state before backend work begins.",
  path: "/dashboard/support/operator",
  noIndex: true,
});

const OPERATOR_RULES = [
  "Use the work-start gate before deciding whether backend work can begin.",
  "Repair stays held until diagnosis and repair scope are approved.",
  "Control stays held until a baseline and monthly priority are approved.",
  "Never expose raw payloads, customer hashes, tokens, billing data, internal notes, or risk-scoring internals from the operator queue.",
] as const;

export default function SupportOperatorQueuePage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <OperatorAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Protected operator queue
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            See the gate before work enters the backend queue.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            This surface keeps Review, Repair, and Control from arriving as generic tickets. Operators see the safe intake projection, the work-start gate, and the rule that decides whether work can start.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#operator-gate-queue" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open operator queue
            </Link>
            <Link href="/dashboard/support/status" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Customer status view
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Operator rule</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Do not start from payment alone.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Payment, intake, and status can unlock the right path. Backend work only starts when the gate is satisfied.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {OPERATOR_RULES.slice(0, 2).map((rule) => (
              <div key={rule} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5">
                <p className="text-sm font-semibold leading-7 text-slate-300">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="operator-gate-queue" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-10 sm:px-6">
        <SupportOperatorGateQueue />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Operator queue safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Operator safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Route work without exposing private internals.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {OPERATOR_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support operator queue guardrails">
        Protected operator queue. Operator work-start queue. Review what can enter the backend queue. See the gate before work enters the backend queue. Review intake. Repair prerequisite. Control baseline. Do not start backend work from this card alone. No raw payloads. No customer hashes. No internal notes. No billing data. No tokens. No risk-scoring internals. {OPERATOR_RULES.join(" ")}
      </section>
    </main>
  );
}

function OperatorAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
