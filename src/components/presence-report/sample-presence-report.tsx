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
    <section className="relative overflow-hidden rounded-[2.1rem] border border-white/85 bg-white/88 p-2 shadow-[0_24px_72px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[2.5rem]" aria-label="Sample Cendorq Presence Report">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_92%_0%,rgba(125,211,252,0.12),transparent_34%)]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff,#fbfdff_55%,#fff9fc)] sm:rounded-[2.1rem]">
        <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-slate-200/80 bg-white/72 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <h2 className="text-[clamp(2.05rem,5vw,3.55rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">{report.title}</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">{report.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-4 text-center shadow-[0_14px_38px_rgba(15,23,42,0.055)]">
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-500">Presence Score</h3>
                <p className="mt-1 text-5xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
                <p className="text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-[0_14px_38px_rgba(15,23,42,0.055)]">
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-200/70 to-transparent" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-500">Recommended next move</h3>
                <p className="mt-2 text-xl font-semibold tracking-[-0.05em] text-slate-950">{report.nextMove} or Build Fix</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">Depends on whether the cause is clear enough to repair safely.</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.25rem] border border-slate-200 bg-white/92 p-4 shadow-sm">
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Business Truth Profile</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{truthProfile.businessName}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{truthProfile.category} · {truthProfile.primaryLocation}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">Preferred CTA: {truthProfile.preferredCta}</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {report.pillars.map((pillar) => (
                <article key={pillar.key} className="rounded-[1.15rem] border border-slate-200/80 bg-white/92 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:shadow-[0_16px_42px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.035em] text-slate-950">{pillar.label}</h3>
                      <p className="mt-1 text-xs font-bold text-cyan-700">{pillar.state}</p>
                    </div>
                    <p className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">{pillar.score}</p>
                  </div>
                  <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{pillar.publicMeaning}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,#bae6fd,#f5d0fe)]" style={{ width: `${pillar.score}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              <section className="rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Choice Gap</h3>
                <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{choiceGap.summary}</p>
                <div className="mt-3 grid gap-2">
                  {choiceGap.signals.slice(0, 2).map((signal) => (
                    <article key={signal.title} className="rounded-[0.95rem] border border-slate-200 bg-white p-3 shadow-sm">
                      <h4 className="text-xs font-semibold leading-5 text-slate-950">{signal.title}</h4>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Repair Queue</h3>
                <div className="mt-3 grid gap-2">
                  {report.repairQueue.slice(0, 3).map((item, index) => (
                    <article key={item.title} className="grid grid-cols-[auto_1fr] gap-3 rounded-[0.95rem] border border-slate-200 bg-white p-3 shadow-sm">
                      <span className="text-xs font-black text-cyan-800">0{index + 1}</span>
                      <span>
                        <h4 className="text-sm font-semibold leading-5 text-slate-950">{item.title}</h4>
                        <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{item.publicReason}</p>
                      </span>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              <section className="rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">Release Gate</h3>
                <div className="mt-3 grid gap-2">
                  {releaseChecks.slice(0, 2).map((check) => (
                    <div key={check.label} className="rounded-[0.95rem] border border-slate-200 bg-white p-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-950">{check.label}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{check.customerSafeReason}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm">
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
