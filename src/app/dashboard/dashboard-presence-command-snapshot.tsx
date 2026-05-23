import Link from "next/link";
import { getPresenceReportPackage } from "@/lib/presence-report-package-source";

const SNAPSHOT_STATES = ["State", "Gap", "Queue", "Control"] as const;

const SNAPSHOT_OPERATING_NOTES = [
  ["Report source", "Customer-safe package"],
  ["Evidence boundary", "No raw evidence shown"],
  ["Next action", "Review before repair"],
] as const;

export function DashboardPresenceCommandSnapshot() {
  const packageSource = getPresenceReportPackage();
  const report = packageSource.report;
  const choiceGap = packageSource.choiceGap;
  const control = packageSource.controlSnapshot;

  return (
    <section className="relative z-10" aria-label="Presence command snapshot">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-cyan-100 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Presence command snapshot</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{report.title}</h2>
            <p className="mt-5 text-base font-medium leading-8 text-slate-600">The dashboard should make the current business state obvious: score, top weakness, Choice Gap, Repair Queue, and Control Snapshot.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SNAPSHOT_STATES.map((state) => (
                <span key={state} className="rounded-full border border-cyan-200 bg-white/80 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{state}</span>
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {SNAPSHOT_OPERATING_NOTES.map(([label, value]) => (
                <div key={label} className="rounded-[1rem] border border-cyan-100 bg-white/75 p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">{label}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.45rem] border border-cyan-200 bg-cyan-50 p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
                <p className="mt-2 text-6xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="rounded-[1.45rem] border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Next move</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{report.nextMove}</p>
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Use deeper review when the cause needs proof before repair.</p>
              </div>
            </div>
            <Link href="/dashboard/reports/free-scan" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Open Free Scan result →</Link>
          </div>

          <div className="grid gap-4 p-5 sm:p-7 lg:p-8">
            <div className="grid gap-3 lg:grid-cols-5">
              {report.pillars.map((pillar) => (
                <article key={pillar.key} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-950">{pillar.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{pillar.score}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">{pillar.state}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Choice Gap</p>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{choiceGap.summary}</p>
                <div className="mt-4 grid gap-2">
                  {choiceGap.signals.slice(0, 2).map((signal) => (
                    <p key={signal.title} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/50 p-3 text-xs font-semibold leading-5 text-slate-700">{signal.title}</p>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.65rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Repair Queue</p>
                <div className="mt-4 grid gap-2">
                  {report.repairQueue.slice(0, 3).map((item, index) => (
                    <div key={item.title} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/7 p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span>
                      <p className="text-xs font-semibold leading-5 text-white">{item.title}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="rounded-[1.65rem] border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Control Snapshot</p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{control.summary}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
