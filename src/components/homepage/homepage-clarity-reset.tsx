import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import Link from "next/link";

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="presence-report-ai-search-presence-repair-experience"
      className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.22),transparent_30%),radial-gradient(circle_at_92%_2%,rgba(125,211,252,0.3),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_44%,#ffffff_100%)] text-slate-950"
    >
      <section className="px-5 py-8 sm:px-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:min-h-[calc(100vh-5.7rem)] lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(3.4rem,14vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.095em] text-slate-950 sm:text-[clamp(4.4rem,8vw,7.6rem)]">
              Make your business easier to choose.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq reads the public signals around your business, finds the choice gap, and turns it into one clear repair path.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.16)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                Start Free Scan
              </Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/78 px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                Watch the sample
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-slate-500">
              First signal only. No ranking, lead, revenue, or AI-placement promise.
            </p>
          </div>

          <CendorqProductMotionDemo />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Cendorq homepage promise">
        <div className="rounded-[2rem] border border-white/80 bg-white/78 p-5 shadow-[0_18px_55px_rgba(14,165,233,0.07)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <h2 className="text-[clamp(2.1rem,6vw,4.3rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-slate-950">
              Scan. See the gap. Fix the next move.
            </h2>
            <p className="text-base font-semibold leading-8 text-slate-600">
              The product should feel like a control room for public presence, not a pile of audit cards. Start with the scan, see the sample, then choose the smallest safe depth.
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
