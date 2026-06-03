import Link from "next/link";
import type { VerticalSamplePresenceReport } from "@/lib/vertical-sample-presence-reports";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

const VERTICAL_READ = [
  ["Market proof", "What this buyer needs before trust forms."],
  ["Choice blocker", "Where comparison or confidence breaks."],
  ["Repair priority", "The smallest useful move before plan depth."],
] as const;

export function VerticalSamplePresenceReport({ sample }: { sample: VerticalSamplePresenceReport }) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f5fbff_38%,#ffffff_100%)] text-slate-950">
      <VerticalAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-center" aria-label="Vertical Sample Presence Report introduction">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">{sample.category}</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.5vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">{sample.label}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">{sample.trustStandard}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
            <Link href="/sample-report" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Back to Sample Report</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_24px_76px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.12),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Choice Gap</p>
            <h2 className="mt-3 text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Why this vertical can lose choice.</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600 sm:text-base">{sample.choiceGap.summary}</p>
            <div className="mt-5 grid gap-3">
              {sample.choiceGap.signals.map((signal) => (
                <article key={signal.title} className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-950">{signal.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{signal.repairDirection}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Vertical proof read">
        <div className="grid gap-3 md:grid-cols-3">
          {VERTICAL_READ.map(([label, copy]) => (
            <article key={label} className="rounded-[1.25rem] border border-white/80 bg-white/88 p-4 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <p className="text-sm font-semibold text-cyan-700">{label}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Vertical repair priorities">
        <article className="rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur sm:p-7">
          <p className="text-sm font-semibold text-cyan-700">Business Truth Profile</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{sample.truthProfile.businessName}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">{sample.truthProfile.mainOffer}</p>
          <div className="mt-5 grid gap-3">
            <p className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 text-sm font-semibold leading-6 text-slate-700">Preferred CTA: {sample.truthProfile.preferredCta}</p>
            <p className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 text-sm font-semibold leading-6 text-slate-700">Audience: {sample.truthProfile.primaryAudience}</p>
          </div>
        </article>

        <article className="rounded-[2.15rem] border border-white/80 bg-white/86 p-5 text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur sm:p-7">
          <p className="text-sm font-semibold text-cyan-700">Repair Queue</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Priority repairs</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">The sample makes the likely first move visible without claiming the same repair fits every business.</p>
          <div className="mt-5 grid gap-3">
            {sample.priorityRepairs.map((repair, index) => (
              <p key={repair} className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 text-sm font-semibold leading-6 text-slate-700">
                <span className="text-xs font-black text-cyan-800">0{index + 1}</span>
                <span>{repair}</span>
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Vertical sample boundaries">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Sample logic, not a promise.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">This category page shows how the Presence Report adapts proof, trust, and repair priority by market. Real recommendations depend on submitted business context.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <p className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 text-xs font-semibold leading-5 text-slate-700">Different verticals need different proof before customers choose.</p>
              <p className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 text-xs font-semibold leading-5 text-slate-700">Choice Gap signals should lead to scoped repairs, not broad promises.</p>
              <p className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 text-xs font-semibold leading-5 text-slate-700">Business Truth Profile details should match the real offer, audience, and CTA.</p>
              <p className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 text-xs font-semibold leading-5 text-slate-700">Priority repairs should explain the next useful move before plan depth is chosen.</p>
            </div>
          </div>
        </div>
      </section>

      <span className="sr-only">Choice Gap. Business Truth Profile. Priority repairs. vertical trust standard. repair priorities. Vertical Sample Presence Report. Repair Queue. Sample logic, not a promise. Different verticals need different proof before customers choose. Business Truth Profile details should match the real offer, audience, and CTA. Market proof. Choice blocker. Repair priority.</span>
    </main>
  );
}

function VerticalAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.1),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(246,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/18 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
