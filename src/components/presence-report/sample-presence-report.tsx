import { SAMPLE_BUSINESS_TRUTH_PROFILE } from "@/lib/business-truth-profile-contract";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_CONTROL_SNAPSHOT } from "@/lib/control-snapshot-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

const REPORT_SECTIONS = [
  "First signal summary",
  "Business Truth Profile",
  "Pillar scores",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Recommended next move",
] as const;

export function SamplePresenceReport() {
  const report = SAMPLE_PRESENCE_REPORT;
  const truthProfile = SAMPLE_BUSINESS_TRUTH_PROFILE;
  const choiceGap = SAMPLE_CHOICE_GAP;
  const controlSnapshot = SAMPLE_CONTROL_SNAPSHOT;

  return (
    <section className="rounded-[2.4rem] border border-white/85 bg-white/82 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[3rem]" aria-label="Sample Cendorq Presence Report">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f2fbff)] sm:rounded-[2.55rem]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.26),transparent_36%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Sample Presence Report</p>
            <h2 className="mt-4 text-[clamp(2.4rem,8vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-slate-950">
              {report.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">{report.summary}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
                <p className="mt-2 text-6xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recommended next move</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.055em] text-slate-950">{report.nextMove} or Build Fix</p>
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Depends on whether the cause is already clear enough to repair safely.</p>
              </div>
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Report sections</p>
              <div className="mt-4 grid gap-2">
                {REPORT_SECTIONS.map((section) => (
                  <div key={section} className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-sm font-semibold text-slate-700">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-cyan-200 bg-cyan-50/70 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Business Truth Profile</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950">{truthProfile.businessName}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{truthProfile.category} · {truthProfile.primaryLocation}</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">Preferred CTA: {truthProfile.preferredCta}</p>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid gap-3">
              {report.pillars.map((pillar) => (
                <article key={pillar.key} className="rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.045)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{pillar.label}</h3>
                        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{pillar.state}</span>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{pillar.publicMeaning}</p>
                    </div>
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">{pillar.score}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${pillar.score}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Choice Gap</p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{choiceGap.summary}</p>
              <div className="mt-4 grid gap-3">
                {choiceGap.signals.map((signal) => (
                  <article key={signal.title} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-6 text-slate-950">{signal.title}</h3>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-600">{signal.severity}</span>
                    </div>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Repair Queue</p>
              <div className="mt-4 grid gap-3">
                {report.repairQueue.map((item, index) => (
                  <article key={item.title} className="grid gap-3 rounded-[1.15rem] border border-white/10 bg-white/7 p-4 sm:grid-cols-[2rem_1fr]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-200 text-sm font-black text-slate-950">{index + 1}</span>
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-white">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-300">{item.publicReason}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-cyan-200 bg-cyan-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Control Snapshot</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950">{controlSnapshot.monthLabel}: {controlSnapshot.presenceScore} / 100</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{controlSnapshot.summary}</p>
              <div className="mt-4 grid gap-2">
                {controlSnapshot.signals.map((signal) => (
                  <div key={signal.label} className="rounded-[1rem] border border-cyan-100 bg-white p-3">
                    <p className="text-sm font-semibold text-slate-950">{signal.label}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{signal.nextAction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
