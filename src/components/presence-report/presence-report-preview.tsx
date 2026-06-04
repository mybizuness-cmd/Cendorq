import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

export function PresenceReportPreview() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <div className="relative mx-auto w-full max-w-[40rem] lg:ml-auto" aria-label="Sample Cendorq Presence Report preview">
      <div className="relative overflow-hidden rounded-[2.35rem] border border-white/90 bg-white/88 p-2 shadow-[0_30px_95px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[3rem] sm:p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.18),transparent_32%),radial-gradient(circle_at_86%_10%,rgba(125,211,252,0.16),transparent_34%)]" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[1.85rem] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff,#f8fdff_58%,#fff8fc)] p-5 shadow-inner sm:rounded-[2.45rem] sm:p-6">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" aria-hidden="true" />
          <div className="grid gap-5 border-b border-slate-200/80 pb-5 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">{report.title}</h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600">Visible, but not easy to choose. Example preview. The real Free Scan opens from your business details.</p>
            </div>
            <div className="relative min-w-[9.5rem] overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white p-4 text-center shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" aria-hidden="true" />
              <p className="text-5xl font-semibold tracking-[-0.08em] text-slate-950">{report.score}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">Presence score out of 100</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {report.pillars.map((pillar) => (
              <div key={pillar.key} className="group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:shadow-[0_18px_46px_rgba(15,23,42,0.065)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{pillar.label}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{pillar.publicMeaning}</p>
                  </div>
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{pillar.score}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-full rounded-full bg-[linear-gradient(90deg,#bae6fd,#f5d0fe)]" style={{ width: `${pillar.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="rounded-[1.4rem] border border-slate-200/80 bg-white/92 p-5 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">Choice gap</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{choiceGap.summary}</p>
            </div>

            <div className="relative overflow-hidden rounded-[1.4rem] border border-slate-800/90 bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.14),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(251,207,232,0.12),transparent_38%)]" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-[-0.055em] text-white">Repair queue</h3>
                <div className="mt-4 grid gap-3">
                  {report.repairQueue.map((item, index) => (
                    <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3 rounded-[1rem] border border-white/10 bg-white/[0.055] p-3">
                      <span className="text-sm font-semibold text-cyan-100">0{index + 1}</span>
                      <p className="text-sm font-semibold leading-6 text-white">{item.title}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.055] p-4">
                  <h4 className="text-base font-semibold tracking-[-0.03em] text-white">Recommended next move</h4>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-cyan-50">Deep Review or Build Fix, depending on evidence.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="sr-only">Sample Presence Report. Presence Score. Choice Gap. Repair queue. Recommended next move. Findability. Understanding. Trust. Action. Deep Review or Build Fix.</p>
        </div>
      </div>
    </div>
  );
}
