import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

export function ProtectedFreeScanResultPreview() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur" aria-label="Protected Free Scan Presence Report preview">
      <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border-b border-cyan-100 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Protected Free Scan result</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">{report.title}</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">{report.summary}</p>
          <div className="mt-7 rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
            <p className="mt-2 text-6xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">out of 100</p>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-3 md:grid-cols-5">
            {report.pillars.map((pillar) => (
              <article key={pillar.key} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-950">{pillar.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{pillar.score}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">{pillar.state}</p>
              </article>
            ))}
          </div>

          <article className="rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">First weak point</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950">Proof and choice clarity need attention.</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{choiceGap.summary}</p>
          </article>

          <article className="rounded-[1.65rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Top repair priorities</p>
            <div className="mt-4 grid gap-3">
              {report.repairQueue.slice(0, 3).map((item, index) => (
                <div key={item.title} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/7 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span>
                  <p className="text-xs font-semibold leading-5 text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
