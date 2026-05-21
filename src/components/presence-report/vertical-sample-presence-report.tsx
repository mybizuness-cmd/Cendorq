import Link from "next/link";
import type { VerticalSamplePresenceReport } from "@/lib/vertical-sample-presence-reports";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export function VerticalSamplePresenceReport({ sample }: { sample: VerticalSamplePresenceReport }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#e9fbff_24%,#f8fbff_70%,#ffffff_100%)] text-slate-950">
      <section className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 lg:pb-12 lg:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.28),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-cyan-200 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 shadow-[0_10px_28px_rgba(14,165,233,0.08)]">{sample.category}</p>
            <h1 className="mt-5 text-[clamp(2.6rem,9vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">{sample.label}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">{sample.trustStandard}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/sample-report" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Back to Sample Report</Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/80 bg-white/82 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.085)] backdrop-blur-2xl sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Choice Gap</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Why this vertical can lose choice.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">{sample.choiceGap.summary}</p>
            <div className="mt-5 grid gap-3">
              {sample.choiceGap.signals.map((signal) => (
                <article key={signal.title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4">
                  <p className="text-sm font-semibold text-slate-950">{signal.title}</p>
                  <p className="mt-2 text-xs font-medium leading-5 text-slate-600">{signal.repairDirection}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Vertical repair priorities">
        <article className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:rounded-[2.5rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Business Truth Profile</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{sample.truthProfile.businessName}</h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">{sample.truthProfile.mainOffer}</p>
          <div className="mt-5 grid gap-3">
            <p className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-6 text-slate-700">Preferred CTA: {sample.truthProfile.preferredCta}</p>
            <p className="rounded-[1.15rem] border border-cyan-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">Audience: {sample.truthProfile.primaryAudience}</p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.15)] sm:rounded-[2.5rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Priority repairs</p>
          <div className="mt-5 grid gap-3">
            {sample.priorityRepairs.map((repair, index) => (
              <div key={repair} className="flex gap-3 rounded-[1.15rem] border border-white/10 bg-white/7 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span>
                <p className="text-sm font-semibold leading-6 text-white">{repair}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
