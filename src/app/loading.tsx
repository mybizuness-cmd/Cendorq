import Link from "next/link";

const READOUTS = ["Get found", "Be answer-ready", "Build trust", "Win choice", "Drive action"] as const;

export default function GlobalLoadingPage() {
  return (
    <main data-cendorq-loading="market-command-loading-v2" className="min-h-screen bg-[#fffefa] px-5 py-16 text-slate-950 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center text-center">
        <p className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
          Cendorq Market Command Intelligence
        </p>

        <h1 className="mt-8 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-slate-950">
          Preparing the cleanest view.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Cendorq is loading the next command path. Start with the Free Scan if the page takes longer than expected.
        </p>

        <div className="mt-10 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="px-5 py-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Safest next step</p>
              <p className="mt-1 text-base font-semibold text-slate-950">Run the Free Scan before buying the bigger fix.</p>
            </div>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-[1.45rem] bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Start Free Scan
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-500">
          {READOUTS.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-4 py-2">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            Return Home
          </Link>
          <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            Review Plans
          </Link>
        </div>
      </section>
    </main>
  );
}
