import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ongoing Control Center | Cendorq",
  description: "Protected Ongoing Control Center for monthly signal health, drift alerts, protected strengths, Control Snapshot delivery, and next priorities.",
  path: "/dashboard/control-center",
  noIndex: true,
});

const CONTROL_STATUS = [
  ["Subscription", "Active before monthly monitoring opens", "Control access must follow entitlement and customer ownership."],
  ["Signal health", "Monthly readiness watch", "Findability, clarity, proof, action path, and public fact consistency stay separated."],
  ["Drift alerts", "Meaningful changes only", "Alerts should identify supported changes, not create anxiety or fake urgency."],
  ["Snapshot", "Dashboard + PDF + email", "The monthly artifact should be approved before customer delivery."],
] as const;

const MONITORED_SIGNALS = [
  ["Service clarity", "Watch whether the offer remains easy to understand."],
  ["Trust proof", "Watch review/proof freshness and placement near decision points."],
  ["Business facts", "Watch public name, service area, address, hours, and profile consistency."],
  ["Action path", "Watch whether customers can still call, book, request, or buy without friction."],
  ["Competitor pressure", "Watch whether alternatives explain the same choice faster or with stronger proof."],
  ["AI/search posture", "Watch whether public surfaces remain answer-ready without implying placement control."],
] as const;

const SNAPSHOT_SECTIONS = [
  ["Improved signals", "What got stronger since the last snapshot."],
  ["Stable strengths", "What should be protected and not over-edited."],
  ["New risks", "What changed enough to deserve attention."],
  ["Unresolved pressure", "What still needs Review or Build Fix before claiming improvement."],
  ["Monthly priorities", "The smallest safe next actions for the current period."],
  ["Delivery record", "Dashboard publish, PDF readiness, email delivery, and vault entry."],
] as const;

const CONTROL_GUARDS = [
  "Do not imply algorithm control, ranking control, AI placement control, or guaranteed leads.",
  "Do not treat a drift signal as a completed repair.",
  "Do not show monthly reports before release approval and PDF readiness.",
  "Do not hide limits when public evidence is stale, missing, or contradictory.",
] as const;

export default function ControlCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Ongoing Control Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Keep public signals from drifting after the report or repair.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Ongoing Control is the monthly watch layer: signal health, drift alerts, protected strengths, new risks, prior repair status, snapshot delivery, and next priorities.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports/ongoing-control" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open monthly artifact</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Back to report vault</Link>
          </div>
        </div>

        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Monthly control loop</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Monitor → detect drift → approve snapshot → deliver → route next priority.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {CONTROL_STATUS.map(([label, value, detail], index) => (
              <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3>
                <p className="mt-1 text-sm font-black text-cyan-100">{value}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{detail}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.08fr_.92fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Monitored signals</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {MONITORED_SIGNALS.map(([title, copy]) => (
              <article key={title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4">
                <h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{title}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Snapshot sections</p>
          <div className="mt-5 grid gap-3">
            {SNAPSHOT_SECTIONS.map(([title, copy]) => (
              <article key={title} className="rounded-[1.25rem] border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{title}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-[94rem] rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Control guardrails</p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {CONTROL_GUARDS.map((guard) => <p key={guard} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{guard}</p>)}
        </div>
      </section>

      <section className="sr-only" aria-label="Ongoing Control guardrails">Ongoing Control Center. Control Center. Monthly Control Snapshot. Signal health. Drift alerts. Protected strengths. New risks. Previous repair status. Next monthly priorities. Dashboard publish. PDF readiness. Email delivery. Report vault. No algorithm control. No ranking control. No AI placement control. No guaranteed leads.</section>
    </main>
  );
}
