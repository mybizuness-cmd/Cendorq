import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

export function PresenceReportPreview() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <div className="relative mx-auto w-full max-w-[38rem] lg:ml-auto" aria-label="Sample Cendorq Presence Report preview">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/95 bg-white/78 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:rounded-[2.9rem]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_48%_0%,#ffffff_0%,#effcff_42%,#dff4ff_100%)] p-5 shadow-inner sm:rounded-[2.35rem] sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Sample Presence Report</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">{report.title}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Example preview. The real Free Scan opens from your business details.</p>
            </div>
            <div className="rounded-[1.35rem] border border-cyan-200 bg-cyan-50 px-5 py-4 text-center shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
              <p className="mt-1 text-5xl font-semibold tracking-[-0.08em] text-slate-950">{report.score}</p>
              <p className="text-xs font-semibold text-slate-500">out of 100</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {report.pillars.map((pillar) => (
              <div key={pillar.key} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{pillar.label}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{pillar.publicMeaning}</p>
                  </div>
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{pillar.score}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${pillar.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Choice Gap</p>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{choiceGap.summary}</p>
          </div>
          <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Repair queue</p>
            <div className="mt-4 grid gap-3">
              {report.repairQueue.map((item, index) => (
                <div key={item.title} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/7 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span>
                  <p className="text-sm font-semibold leading-6 text-white">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1rem] border border-cyan-200/30 bg-cyan-200/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">Recommended next move</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">{report.nextMove} or Build Fix, depending on evidence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
