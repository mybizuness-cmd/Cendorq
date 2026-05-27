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
    <section className="rounded-[2.4rem] border border-white/85 bg-white/82 p-3 shadow-[0_28px_90px_rgba(14,165,233,0.1)] backdrop-blur-2xl sm:rounded-[3rem]" aria-label="Sample Cendorq Presence Report">
      <div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-[linear-gradient(180deg,#ffffff,#f4fcff)] sm:rounded-[2.55rem]">
        <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-cyan-100 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.2),transparent_36%),linear-gradient(180deg,#ffffff,#f2fcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <h2 className="text-[clamp(2.4rem,8vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-slate-950">{report.title}</h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">{report.summary}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-cyan-100 bg-white p-5 text-center shadow-sm">
                <h3 className="text-sm font-bold text-slate-500">Presence Score</h3>
                <p className="mt-2 text-6xl font-semibold tracking-[-0.09em] text-slate-950">{report.score}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/48 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500">Recommended next move</h3>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.055em] text-slate-950">{report.nextMove} or Build Fix</p>
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Depends on whether the cause is already clear enough to repair safely.</p>
              </div>
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-cyan-100 bg-white p-5 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">Business Truth Profile</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{truthProfile.businessName}</p>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{truthProfile.category} · {truthProfile.primaryLocation}</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">Preferred CTA: {truthProfile.preferredCta}</p>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid gap-3">
              {report.pillars.map((pillar) => (
                <article key={pillar.key} className="rounded-[1.45rem] border border-cyan-100 bg-white p-4 shadow-[0_10px_30px_rgba(14,165,233,0.045)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{pillar.label}</h3>
                      <p className="mt-1 text-xs font-bold text-cyan-700">{pillar.state}</p>
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

            <div className="mt-5 rounded-[1.65rem] border border-cyan-100 bg-white p-5 shadow-[0_14px_42px_rgba(14,165,233,0.055)]">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">Choice Gap</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{choiceGap.summary}</p>
              <div className="mt-4 grid gap-3">
                {choiceGap.signals.map((signal) => (
                  <article key={signal.title} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4">
                    <h4 className="text-sm font-semibold leading-6 text-slate-950">{signal.title}</h4>
                    <p className="mt-1 text-xs font-bold text-cyan-700">{signal.severity}</p>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-cyan-100 bg-cyan-50/42 p-5 shadow-[0_14px_42px_rgba(14,165,233,0.055)]">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">Repair Queue</h3>
              <div className="mt-4 grid gap-3">
                {report.repairQueue.map((item) => (
                  <article key={item.title} className="rounded-[1.15rem] border border-cyan-100 bg-white p-4 shadow-sm">
                    <h4 className="text-base font-semibold leading-6 text-slate-950">{item.title}</h4>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.publicReason}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-cyan-100 bg-white p-5 shadow-[0_14px_42px_rgba(14,165,233,0.055)]">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">Release Gate</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">Approved facts before release.</p>
              <div className="mt-4 grid gap-2">
                {releaseChecks.map((check) => (
                  <div key={check.label} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/38 p-3">
                    <p className="text-sm font-semibold text-slate-950">{check.label}</p>
                    <p className="mt-1 text-xs font-bold text-cyan-700">{check.status}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{check.customerSafeReason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-cyan-100 bg-cyan-50/42 p-5 shadow-[0_14px_42px_rgba(14,165,233,0.055)]">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">Control Snapshot</h3>
              <p className="mt-3 text-lg font-semibold tracking-[-0.035em] text-slate-950">{controlSnapshot.monthLabel}: {controlSnapshot.presenceScore} / 100</p>
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
      <span className="sr-only">First signal summary. Pillar scores. Business Truth Profile. Choice Gap. Repair Queue. Release Gate. Control Snapshot. Recommended next move.</span>
    </section>
  );
}
