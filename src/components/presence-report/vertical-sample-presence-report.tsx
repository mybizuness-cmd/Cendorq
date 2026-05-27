import Link from "next/link";
import type { VerticalSamplePresenceReport } from "@/lib/vertical-sample-presence-reports";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export function VerticalSamplePresenceReport({ sample }: { sample: VerticalSamplePresenceReport }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#e9fbff_24%,#f8fbff_70%,#ffffff_100%)] text-slate-950">
      <section className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 lg:pb-12 lg:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.16),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.22),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-cyan-700">{sample.category}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,9vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">{sample.label}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">{sample.trustStandard}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/sample-report" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Back to Sample Report</Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/80 bg-white/84 p-5 shadow-[0_24px_80px_rgba(14,165,233,0.085)] backdrop-blur-2xl sm:p-7">
            <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Why this vertical can lose choice.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">{sample.choiceGap.summary}</p>
            <div className="mt-5 grid gap-3">
              {sample.choiceGap.signals.map((signal) => (
                <article key={signal.title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/38 p-4">
                  <h3 className="text-sm font-semibold text-slate-950">{signal.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Vertical repair priorities">
        <article className="rounded-[2rem] border border-white/80 bg-white/84 p-6 shadow-[0_18px_60px_rgba(14,165,233,0.06)] backdrop-blur sm:rounded-[2.5rem] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{sample.truthProfile.businessName}</h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">{sample.truthProfile.mainOffer}</p>
          <div className="mt-5 grid gap-3">
            <p className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/38 p-4 text-sm font-semibold leading-6 text-slate-700">Preferred CTA: {sample.truthProfile.preferredCta}</p>
            <p className="rounded-[1.15rem] border border-cyan-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">Audience: {sample.truthProfile.primaryAudience}</p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/80 bg-white/84 p-6 text-slate-950 shadow-[0_18px_60px_rgba(14,165,233,0.06)] backdrop-blur sm:rounded-[2.5rem] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Repair priorities</h2>
          <div className="mt-5 grid gap-3">
            {sample.priorityRepairs.map((repair) => (
              <p key={repair} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/38 p-4 text-sm font-semibold leading-6 text-slate-700">{repair}</p>
            ))}
          </div>
        </article>
      </section>
      <span className="sr-only">Choice Gap. Business Truth Profile. Priority repairs. vertical trust standard. repair priorities.</span>
    </main>
  );
}
