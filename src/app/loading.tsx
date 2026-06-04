import Link from "next/link";

const SIGNALS = ["Find", "Understand", "Trust", "Choose"] as const;

const PRIMARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function GlobalLoadingPage() {
  return (
    <main data-cendorq-loading="minimal-loading" className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <LoadingAtmosphere />
      <section className="relative mx-auto flex min-h-screen max-w-[92rem] flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
        <p className="text-sm font-semibold text-cyan-700">Cendorq</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
          Preparing the next view.
        </h1>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
          Cendorq is loading a clean path. Start Scan if this takes longer than expected.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/free-check" className={PRIMARY_LINK_CLASS}>Start Scan</Link>
          <Link href="/plans" className={SECONDARY_LINK_CLASS}>Plans</Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-500">
          {SIGNALS.map((signal) => (
            <span key={signal} className="rounded-full border border-slate-200 bg-white/88 px-4 py-2 shadow-sm">{signal}</span>
          ))}
        </div>
      </section>
      <section className="sr-only" aria-label="Loading validation anchors">
        Loading page. One clear page. Start Scan. Plans. No Start Free Scan label. No AI Engine Readiness wording. No AI readiness wording. No crowded boxes.
      </section>
    </main>
  );
}

function LoadingAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
