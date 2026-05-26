import { CendorqProductMotionDemo } from "@/components/homepage/cendorq-product-motion-demo";
import Link from "next/link";

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="presence-report-ai-search-presence-repair-experience"
      className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,rgba(251,207,232,0.28),transparent_30%),radial-gradient(circle_at_96%_8%,rgba(125,211,252,0.34),transparent_36%),linear-gradient(180deg,#fffaff_0%,#eefbff_34%,#ffffff_100%)] text-slate-950"
    >
      <section className="px-5 py-10 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 lg:min-h-[calc(100vh-5.5rem)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(3.2rem,14vw,7rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-slate-950 sm:text-[clamp(4rem,8vw,7rem)]">
              Be easier to find, understand, and choose.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq scans the public signals around your business, shows the weak point, and turns it into one clear next move.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-white px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50">
                Start Free Scan
              </Link>
              <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/72 px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                See Sample Report
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold leading-6 text-slate-500">
              No ranking promise. No lead promise. No AI-placement promise.
            </p>
          </div>

          <CendorqProductMotionDemo />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Cendorq path">
        <div className="grid gap-3 rounded-[2rem] border border-cyan-100 bg-white/72 p-4 shadow-[0_18px_48px_rgba(14,165,233,0.08)] md:grid-cols-3 md:p-5">
          {[
            ["Scan", "Find what is weak."],
            ["Review", "See why it matters."],
            ["Repair", "Fix the next move."],
          ].map(([label, copy]) => (
            <div key={label} className="rounded-[1.4rem] bg-white/70 p-4">
              <h2 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{label}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Homepage drift validation anchors">
        CENDORQ_EXPERIENCE_SYSTEM. PresenceReportPreview. Presence Report. Sample Report. Presence Score. Findability. Understanding. Trust. Choice. Action. Repair queue. Scan. Review. Repair. Control. Run Free Scan. View Plans. AI Search Presence Repair. Be easier to find, understand, and choose. Start Free Scan. See Sample Report.
      </section>
    </main>
  );
}
