import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import Link from "next/link";

const PROOF_POINTS = [
  "AI, search, local, proof, and action shown as one decision path",
  "Presence Report preview before long explanation",
  "One next command: scan, review, repair, or control",
] as const;

const HOMEPAGE_READ_ORDER = [
  ["Read signal", "Start with what AI, search, and customers can already understand."],
  ["See gap", "Find the Choice Gap before buying review, repair, or control."],
  ["Move once", "Take the next safest command instead of guessing across pages."],
] as const;

const COMMAND_PATH = [
  ["Scan", "First signal", "Read what buyers and AI can already see."],
  ["Review", "Cause proof", "Prove the reason before buying a fix."],
  ["Repair", "Scoped move", "Fix the weakest choice blocker first."],
  ["Control", "Drift watch", "Keep the public signal from sliding back."],
] as const;

const REPORT_CARDS = [
  ["Presence Score", "67", "First signal only"],
  ["Choice gap", "High", "Proof appears too late"],
  ["Next command", "Review", "Confirm cause before repair"],
] as const;

const PRIMARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.16)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/78 px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="presence-report-ai-search-presence-repair-experience"
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_92%_2%,rgba(125,211,252,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f5fbff_42%,#ffffff_100%)] text-slate-950"
    >
      <HomepageAtmosphere />
      <section className="relative mx-auto grid max-w-[92rem] gap-6 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:min-h-[calc(100vh-5.7rem)] lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-8 lg:pb-12" aria-label="Cendorq homepage hero">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">AI Search Presence Repair</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.9rem,10.6vw,7rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-slate-950 sm:mt-4 sm:text-[clamp(4rem,7.2vw,7rem)]">
            Be easier to find, understand, and choose.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq turns public visibility into a repair decision: what AI, search, and customers can understand, where choice gets weak, and what to do first.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={PRIMARY_CTA_CLASS}>Start Free Scan</Link>
            <Link href="/sample-report" className={SECONDARY_CTA_CLASS}>See Sample Report</Link>
          </div>
          <div className="mt-5 hidden gap-2 sm:grid">
            {PROOF_POINTS.map((point, index) => (
              <p key={point} className="grid grid-cols-[auto_1fr] items-start gap-3 text-sm font-semibold leading-6 text-slate-600">
                <span className="text-xs font-black text-cyan-800">0{index + 1}</span>
                <span>{point}</span>
              </p>
            ))}
          </div>
        </div>

        <CendorqProductMotionDemo />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Homepage read order">
        <div className="grid gap-3 md:grid-cols-3">
          {HOMEPAGE_READ_ORDER.map(([label, copy]) => (
            <article key={label} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-sm font-black text-cyan-700">{label}</div>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Cendorq proof summary">
        <div className="grid gap-3 md:grid-cols-3">
          {REPORT_CARDS.map(([label, value, copy]) => (
            <article key={label} className="rounded-[1.4rem] border border-white/80 bg-white/88 p-4 shadow-[0_16px_42px_rgba(15,23,42,0.052)] backdrop-blur">
              <p className="text-sm font-semibold text-cyan-700">{label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.07em] text-slate-950">{value}</p>
              <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Cendorq homepage promise">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch">
            <div className="relative overflow-hidden bg-white p-5 sm:p-7 lg:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.14),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.12),transparent_40%)]" aria-hidden="true" />
              <div className="relative">
                <p className="text-sm font-semibold text-cyan-700">The decision path</p>
                <h2 className="mt-3 text-[clamp(2.1rem,6vw,4.35rem)] font-semibold leading-[0.94] tracking-[-0.078em] text-slate-950">Scan. See the gap. Fix the next move.</h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                  The product should feel like a diagnostic machine: one public signal, one gap, one safest next command.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/plans" className={SECONDARY_CTA_CLASS}>View Plans</Link>
                  <Link href="/faq" className={SECONDARY_CTA_CLASS}>Read FAQ</Link>
                </div>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7 lg:p-8">
              {COMMAND_PATH.map(([title, label, copy]) => (
                <article key={title} className="rounded-[1.25rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-cyan-700">{label}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Homepage drift validation anchors">
        CENDORQ_EXPERIENCE_SYSTEM. PresenceReportPreview. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Scan. Review. Repair. Control. Run Free Scan. View Plans. AI Search Presence Repair. Be easier to find, understand, and choose. Start Free Scan. See Sample Report. Mobile product-flow compression. Product proof before long explanation. One dominant next command per screen band. AI answer snapshot. Local proof. Review sentiment. Choice Gap. Repair Queue. Homepage read order. Read signal. See gap. Move once. Scan, See the gap, Fix the next move.
      </section>
    </main>
  );
}

function HomepageAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.1),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(246,252,255,0.42)_42%,rgba(255,255,255,0.72)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
