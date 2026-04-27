export function ClosedCommandCenterPanel() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Private Command Center</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Closed by default.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          This is the private Cendorq operating layer for intake, reports, projects, files, payments, delivery, intelligence, governance, and audit history.
          It will stay closed until production authentication, database access, and authorization controls are configured.
        </p>
        <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100">
          No customer records, private intelligence, files, reports, evidence, payment data, automation controls, readiness checks, AI manager controls, AI history, or dashboard modules are exposed from this route.
        </div>
      </section>
    </main>
  );
}
