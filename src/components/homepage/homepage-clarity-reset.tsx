import Link from "next/link";

const PRIMARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const PATH_STEPS = [
  ["Scan", "Find the first weak signal."],
  ["Review", "Prove the cause."],
  ["Repair", "Fix the clearest blocker."],
  ["Control", "Keep the signal from drifting."],
] as const;

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="minimal-ai-search-presence-repair-homepage"
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.16),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f7fcff_46%,#ffffff_100%)] text-slate-950"
    >
      <HomepageAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-14" aria-label="Cendorq homepage">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">AI Search Presence Repair</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.15rem,8vw,7.3rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Find what makes customers hesitate.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq gives a clear first read on what people, search, and AI can understand about your business — then points to the next right move.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={PRIMARY_CTA_CLASS}>Start Scan</Link>
            <Link href="/plans" className={SECONDARY_CTA_CLASS}>View Plans</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7" aria-label="Cendorq path preview">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,207,232,0.16),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.18),transparent_42%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-slate-500">The path stays simple</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.6vw,4.7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-slate-950">
              Scan first. Move deeper only when the signal supports it.
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {PATH_STEPS.map(([label, copy]) => (
                <article key={label} className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <h3 className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">{label}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-[1.15rem] border border-cyan-100 bg-cyan-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
              No crowded audit. No wall of boxes. One page, one decision path, one clear next command.
            </p>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Homepage validation anchors">
        Cendorq. AI Search Presence Repair. Start Scan. View Plans. Scan, Review, Repair, Control. Minimal homepage. One page. Clear concise body. No crowded boxes. Customer Access and FAQ live in header navigation. Footer keeps legal links only.
      </section>
    </main>
  );
}

function HomepageAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),transparent)]" aria-hidden="true" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
