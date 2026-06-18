import Link from "next/link";

const OUTCOMES = [
  ["Presence Report", "Shows the current public signal and the first weak point."],
  ["Choice Gap", "Explains why a competitor may feel clearer or safer."],
  ["Repair Queue", "Turns the diagnosis into the next practical change."],
  ["Control", "Keeps the repaired presence from drifting backward."],
] as const;

export function Cendorq3DPresenceCommand() {
  return (
    <section data-cendorq-homepage-dashboard-demo="final-master-presence-command-center" className="relative isolate overflow-hidden bg-[#f8fcff] px-4 py-14 text-slate-950 sm:px-6 lg:px-8 lg:py-20" aria-label="Cendorq Presence Command Center explainer">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,.36),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#ffffff_100%)]" />
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.24em] text-sky-700">After the scan</p>
            <h2 className="mt-4 text-[clamp(2.35rem,5vw,4.6rem)] font-black leading-[.94] tracking-[-.08em] text-slate-950">The owner sees the problem, not a wall of metrics.</h2>
            <p className="mt-5 max-w-[39rem] text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-8">Cendorq should feel like a short explanation: what is wrong, why it matters, what proof supports it, and what gets repaired first.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_56%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link><Link href="/sample-report" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Sample Report</Link></div>
          </div>

          <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/82 p-2 shadow-[0_34px_110px_rgba(15,23,42,.16),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-2xl">
            <div className="grid gap-0 overflow-hidden rounded-[1.85rem] border border-slate-200 bg-[#f8fdff] sm:grid-cols-2">
              {OUTCOMES.map(([title, copy], index) => (
                <article key={title} className="min-h-44 border-b border-slate-200 bg-white/82 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <p className="text-xs font-black text-sky-700">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-black tracking-[-.055em] text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
