import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import { ProductProofSystem } from "@/components/homepage/product-proof-system";
import { PresenceReportPreview } from "@/components/presence-report";
import Link from "next/link";

const PATH = [
  ["Scan", "See the first weak signal."],
  ["Sample", "Review the report structure."],
  ["Plans", "Choose signal, cause, repair, or control."],
  ["Access", "Return with the same customer email."],
  ["Contact", "Ask when the question is already clear."],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="presence-report-ai-search-presence-repair-experience" className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.34),transparent_28%),radial-gradient(circle_at_100%_8%,rgba(125,211,252,0.42),transparent_34%),linear-gradient(180deg,#fffaff_0%,#e8fbff_26%,#ffffff_100%)] text-slate-950">
      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-cyan-100 bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 shadow-sm">AI Search Presence Repair</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.05rem,14vw,6.35rem)] font-semibold leading-[0.86] tracking-[-0.088em] text-slate-950 sm:text-[clamp(3.5rem,8vw,6.35rem)]">Be easier to find, understand, and choose.</h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq turns public business signals into a clear path: scan the weak signal, review the cause, repair what matters, and keep readiness from drifting.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-white px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:bg-cyan-50">Start Free Scan</Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/72 px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:bg-white">See Sample Report</Link>
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-slate-500">No ranking promise. No lead promise. No AI-placement promise.</p>
          </div>
          <div className="rounded-[2rem] border border-cyan-100 bg-white/86 p-3 shadow-[0_28px_95px_rgba(14,165,233,0.12)]">
            <PresenceReportPreview />
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Public handoff path">
        <div className="mx-auto max-w-7xl rounded-[1.8rem] border border-cyan-100 bg-cyan-50/45 p-4 shadow-[0_16px_48px_rgba(14,165,233,0.08)] sm:p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Public handoff path</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {PATH.map(([label, copy]) => (
              <div key={label} className="rounded-[1.1rem] border border-white/80 bg-white/86 p-4 shadow-sm">
                <h2 className="text-sm font-black text-slate-950">{label}</h2>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CendorqProductMotionDemo />
      <ProductProofSystem />
      <section className="sr-only" aria-label="Homepage drift validation anchors">CENDORQ_EXPERIENCE_SYSTEM. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Scan. Review. Repair. Control. Run Free Scan. View Plans.</section>
    </main>
  );
}
