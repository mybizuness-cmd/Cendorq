import { SAMPLE_BUSINESS_TRUTH_PROFILE } from "@/lib/business-truth-profile-contract";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_CONTROL_SNAPSHOT } from "@/lib/control-snapshot-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";
import { SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS } from "@/lib/presence-report-release-gate";

export function SamplePresenceReport() {
  const report = SAMPLE_PRESENCE_REPORT;
  const truthProfile = SAMPLE_BUSINESS_TRUTH_PROFILE;
  const choiceGap = SAMPLE_CHOICE_GAP;
  const controlSnapshot = SAMPLE_CONTROL_SNAPSHOT;
  const releaseChecks = SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS;

  return (
    <section className="rounded-[1.85rem] border border-white/85 bg-white/84 p-2 shadow-[0_20px_60px_rgba(14,165,233,0.08)] backdrop-blur-xl sm:rounded-[2.25rem]" aria-label="Sample Cendorq Presence Report">
      <div className="overflow-hidden rounded-[1.55rem] border border-cyan-100 bg-white sm:rounded-[1.9rem]">
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-cyan-100 bg-[linear-gradient(180deg,#ffffff,#f7fdff)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">{report.title}</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">{report.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-cyan-100 bg-white p-4 text-center shadow-sm">
                <h3 className="text-xs font-bold text-slate-500">Presence Score</h3>
                <p className="mt-1 text-5xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
                <p className="text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/38 p-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500">Recommended next move</h3>
                <p className="mt-2 text-xl font-semibold tracking-[-0.05em] text-slate-950">{report.nextMove} or Build Fix</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">Depends on whether the cause is clear enough to repair safely.</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-cyan-100 bg-white p-4 shadow-sm">
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Business Truth Profile</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{truthProfile.businessName}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{truthProfile.category} · {truthProfile.primaryLocation}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">Preferred CTA: {truthProfile.preferredCta}</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {report.pillars.map((pillar) => (
                <article key={pillar.key} className="rounded-[1.1rem] border border-cyan-100 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.035em] text-slate-950">{pillar.label}</h3>
                      <p className="mt-1 text-xs font-bold text-cyan-700">{pillar.state}</p>
                    </div>
                    <p className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">{pillar.score}</p>
                  </div>
                  <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{pillar.publicMeaning}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${pillar.score}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              <section className="rounded-[1.2rem] border border-cyan-100 bg-white p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Choice Gap</h3>
                <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{choiceGap.summary}</p>
                <div className="mt-3 grid gap-2">
                  {choiceGap.signals.slice(0, 2).map((signal) => (
                    <article key={signal.title} className="rounded-[0.9rem] border border-cyan-100 bg-cyan-50/32 p-3">
                      <h4 className="text-xs font-semibold leading-5 text-slate-950">{signal.title}</h4>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/32 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Repair Queue</h3>
                <div className="mt-3 grid gap-2">
                  {report.repairQueue.slice(0, 3).map((item) => (
                    <article key={item.title} className="rounded-[0.9rem] border border-cyan-100 bg-white p-3 shadow-sm">
                      <h4 className="text-sm font-semibold leading-5 text-slate-950">{item.title}</h4>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{item.publicReason}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              <section className="rounded-[1.2rem] border border-cyan-100 bg-white p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Release Gate</h3>
                <div className="mt-3 grid gap-2">
                  {releaseChecks.slice(0, 2).map((check) => (
                    <div key={check.label} className="rounded-[0.9rem] border border-cyan-100 bg-cyan-50/32 p-3">
                      <p className="text-xs font-semibold text-slate-950">{check.label}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{check.customerSafeReason}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/32 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Control Snapshot</h3>
                <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-slate-950">{controlSnapshot.monthLabel}: {controlSnapshot.presenceScore} / 100</p>
                <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{controlSnapshot.summary}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">First signal summary. Pillar scores. Business Truth Profile. Choice Gap. Repair Queue. Release Gate. Control Snapshot. Recommended next move. report.pillars.map. report.repairQueue.map. releaseChecks.map.</span>
    </section>
  );
}
