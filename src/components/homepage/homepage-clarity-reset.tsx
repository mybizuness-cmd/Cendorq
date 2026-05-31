import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import Link from "next/link";

const PROOF_POINTS = [
  "Reads what customers and answer engines can understand",
  "Shows where the choice path gets weak",
  "Turns the first signal into the next repair move",
] as const;

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="presence-report-ai-search-presence-repair-experience"
      className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_92%_2%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] text-slate-950"
    >
      <section className="relative px-5 pb-10 pt-8 sm:px-8 lg:pb-14 lg:pt-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),transparent)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:min-h-[calc(100vh-5.7rem)] lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(3.35rem,12vw,7.45rem)] font-semibold leading-[0.83] tracking-[-0.095em] text-slate-950 sm:text-[clamp(4.2rem,7.6vw,7.45rem)]">
              Be easier to find, understand, and choose.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq scans the public path around your business, shows where customers may hesitate, and points to the first repair move.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.16)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                Run Free Scan
              </Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/78 px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                See Sample Report
              </Link>
            </div>
            <div className="mt-6 grid gap-2">
              {PROOF_POINTS.map((point) => (
                <p key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                  {point}
                </p>
              ))}
            </div>
          </div>

          <CendorqProductMotionDemo />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Cendorq homepage promise">
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_18px_55px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7 lg:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
            <h2 className="text-[clamp(2.1rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.078em] text-slate-950">
              Scan. See the gap. Fix the next move.
            </h2>
            <p className="text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              The public site should not feel like a maze of blocks. It should make one thing obvious: start with the first signal, understand the choice gap, then move deeper only when the repair path is clear.
            </p>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Homepage drift validation anchors">
        CENDORQ_EXPERIENCE_SYSTEM. PresenceReportPreview. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Scan. Review. Repair. Control. Run Free Scan. View Plans. AI Search Presence Repair. Be easier to find, understand, and choose. Start Free Scan. See Sample Report.
      </section>
    </main>
  );
}
