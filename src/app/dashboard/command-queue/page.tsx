import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Command Queue | Cendorq",
  description: "Protected Cendorq Command Queue for scans, paid reviews, repair work, delivery, support, and monthly Control snapshots.",
  path: "/dashboard/command-queue",
  noIndex: true,
});

const QUEUE_LANES = [
  ["Free Scan", "Submitted", "Create the first signal result and route to report vault."],
  ["Deep Review", "Paid review", "Open evidence workflow, release gate, PDF, and email delivery."],
  ["Build Fix", "Repair work", "Create scope, before evidence, work state, QA, and completion artifact."],
  ["Ongoing Control", "Monthly watch", "Refresh signals, detect drift, approve snapshot, and deliver."],
  ["Support", "Customer help", "Route report, billing, delivery, correction, or scope questions."],
  ["Recovery", "Failed step", "Retry delivery, clarify missing context, or hold the artifact safely."],
] as const;

const RUN_FIELDS = [
  ["Trigger", "What started the workflow: scan, payment, support, correction, or schedule."],
  ["Owner", "Which lane or agent is responsible for the current step."],
  ["Inputs", "Business, plan, evidence, entitlement, report, and delivery state."],
  ["Quality check", "What must pass before the workflow moves forward."],
  ["Customer state", "What the customer can safely see right now."],
  ["Recovery path", "What happens if data, approval, PDF, email, or access is not ready."],
] as const;

const QUEUE_RULES = [
  "Do not let paid work run without plan entitlement and customer ownership.",
  "Do not mark a report delivered until dashboard, PDF, email, and vault state align.",
  "Do not mark Build Fix complete before scope, work, QA, and completion artifact are ready.",
  "Do not run monthly Control without a clear period, drift summary, and customer-safe snapshot.",
] as const;

export default function CommandQueuePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Command Queue</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Every customer action should enter a clear workflow lane.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Command Queue organizes scans, paid reviews, repairs, delivery, support, recovery, and Control snapshots so Cendorq does not rely on manual chaos.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open report vault</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open delivery history</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Workflow lanes</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Scan, review, repair, control, support, and recovery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{QUEUE_LANES.map(([label, state, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{state}</p><h3 className="mt-2 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Run fields</p><div className="mt-5 grid gap-3 md:grid-cols-2">{RUN_FIELDS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Queue rules</p><div className="mt-5 grid gap-3">{QUEUE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Command queue guardrails">Command Queue. Free Scan. Deep Review. Build Fix. Ongoing Control. Support. Recovery. Trigger. Owner. Inputs. Quality check. Customer state. Recovery path. Workflow Router. Command workflow engine.</section>
    </main>
  );
}
