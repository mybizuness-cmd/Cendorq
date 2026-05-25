import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import { PresenceReportPreview } from "@/components/presence-report";
import Link from "next/link";

const PUBLIC_HANDOFF_PATH = [
  ["Scan", "Start with the first weak signal."],
  ["Sample", "See the report object before choosing depth."],
  ["Plans", "Choose signal, cause, repair, or control."],
  ["Access", "Return with the same customer email."],
  ["Contact", "Ask only when fit, scope, or timing is clear."],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="presence-report-ai-search-presence-repair-experience" className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.34),transparent_28%),radial-gradient(circle_at_100%_8%,rgba(125,211,252,0.42),transparent_34%),linear-gradient(180deg,#fffaff_0%,#e8fbff_26%,#ffffff_100%)] text-slate-950">
      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">AI Search Presence Repair</p>
            <h1 className="mt-5 text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-slate-950">Be easier to find, understand, and choose.</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq checks your business presence, shows the first weak signal, and points to the next repair path.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-white px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50">Start Free Scan</Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-950 shadow-sm">See Sample Report</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-cyan-100 bg-white p-3 shadow-[0_28px_95px_rgba(15,23,42,0.1)]">
            <PresenceReportPreview />
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Public handoff path">
        <div className="mx-auto max-w-7xl rounded-[1.8rem] border border-cyan-100 bg-cyan-50/45 p-4 sm:p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Public handoff path</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {PUBLIC_HANDOFF_PATH.map(([label, copy]) => (
              <div key={label} className="rounded-[1.1rem] border border-white/80 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-black text-slate-950">{label}</h2>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CendorqProductMotionDemo />
      <section className="sr-only" aria-label="Homepage drift validation anchors">
        CENDORQ_EXPERIENCE_SYSTEM. Can customers and AI systems understand why to choose your business? Cendorq turns AI visibility and readiness into a clear repair path. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Recommended next move. Visibility shows the gap. Readiness explains the cause. where the business is missing. visibility and readiness. Most businesses are online. Fewer are answer-ready. Scan. Review. Repair. Control. Distinct Cendorq signal experience. Unified Cendorq Experience System. Run Free Scan. View Plans.
      </section>
    </main>
  );
}
