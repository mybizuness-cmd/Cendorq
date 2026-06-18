import Link from "next/link";

const TRUST_POINTS = [
  "First signal before paid pressure",
  "Decision Gap before the Repair Queue",
  "Scan, Review, Repair, and Control kept separate",
] as const;

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
          AI Search Presence Repair
        </p>

        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
          Be easier for AI, search, and customers to find, understand, and choose.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
          Cendorq turns public presence into a clear decision path: what is already visible, where the Decision Gap appears, and whether the next move is Scan, Review, Repair, or Control.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/free-check"
            className="inline-flex items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2"
          >
            Start Free Scan
          </Link>

          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-2xl border border-cyan-100 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2"
          >
            Read FAQ
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="border border-cyan-100 bg-white/84 px-4 py-3 font-semibold shadow-sm">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
