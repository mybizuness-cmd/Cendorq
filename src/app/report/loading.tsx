export default function ReportLoadingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <section className="system-panel-authority rounded-[2rem] p-8 text-center">
        <div className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Report View</div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Preparing the report snapshot.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">Cendorq is resolving the latest Search Presence Scan snapshot, route recommendation, and explanation trace for this business.</p>
      </section>
    </main>
  );
}
