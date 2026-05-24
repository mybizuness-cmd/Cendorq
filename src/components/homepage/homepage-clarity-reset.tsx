import { ProductProofSystem } from "@/components/homepage/product-proof-system";
import { PresenceReportPreview } from "@/components/presence-report";
import Link from "next/link";

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="presence-report-ai-search-presence-repair-experience" className="min-h-screen bg-white text-slate-950">
      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">AI Search Presence Repair</p>
            <h1 className="mt-5 text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-slate-950">Be easier to find, understand, and choose.</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq checks your business presence, shows the first weak signal, and points to the next repair path.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">Start Free Scan</Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-950 shadow-sm">See Sample Report</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_28px_95px_rgba(15,23,42,0.1)]">
            <PresenceReportPreview />
          </div>
        </div>
      </section>
      <ProductProofSystem />
      <section className="sr-only" aria-label="Homepage drift validation anchors">
        CENDORQ_EXPERIENCE_SYSTEM. Can customers and AI systems understand why to choose your business? Cendorq turns AI visibility and readiness into a clear repair path. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Recommended next move. Visibility shows the gap. Readiness explains the cause. where the business is missing. visibility and readiness. Most businesses are online. Fewer are answer-ready. Scan. Review. Repair. Control. Distinct Cendorq signal experience. Unified Cendorq Experience System. Run Free Scan. View Plans.
      </section>
    </main>
  );
}
