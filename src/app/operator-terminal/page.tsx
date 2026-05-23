import { getOperatorTerminalLanes, getOperatorTerminalSamplePackets } from "@/lib/operator-terminal-foundation";

export default function OperatorTerminalPage() {
  const lanes = getOperatorTerminalLanes();
  const packets = getOperatorTerminalSamplePackets();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Internal operator terminal</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Approve evidence before customer release.</h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-300">
                The operator terminal is the internal gate between captured signals and customer-facing Presence Reports. It keeps findings, repairs, approvals, and release logs behind review before any report package reaches a customer surface.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100">Release doctrine</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-cyan-50">No raw evidence, unapproved findings, operator notes, or unsupported certainty leaves this terminal.</p>
            </div>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-7" aria-label="Operator release lanes">
          {lanes.map((lane) => (
            <article key={lane.id} className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{lane.stage}</p>
              <h2 className="mt-3 text-lg font-semibold tracking-[-0.035em] text-white">{lane.label}</h2>
              <p className="mt-3 text-xs font-medium leading-6 text-slate-300">{lane.purpose}</p>
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/[0.05] p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Primary command</p>
                <p className="mt-1 text-xs font-bold text-white">{lane.primaryCommand}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Operator packets and release controls">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Command Queue</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white">Packets waiting on safe next gates.</h2>
            <div className="mt-5 grid gap-3">
              {packets.map((packet) => (
                <article key={packet.id} className="rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{packet.business}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{packet.state}</p>
                    </div>
                    <p className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">{packet.nextGate}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{packet.evidenceReady}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">ready</p>
                    </div>
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{packet.needsReview}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">review</p>
                    </div>
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{packet.blocked}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">blocked</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-semibold leading-6 text-slate-300">{packet.safeNextAction}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Approval Gate</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white">Release only after evidence, finding, repair, and approval gates pass.</h2>
            <div className="mt-6 grid gap-3">
              {["Business Truth Profile", "Evidence Console", "Finding Builder", "Repair Composer", "Approval Gate", "Release Log"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-[1.1rem] border border-white/10 bg-white/[0.045] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="mt-1 text-xs font-medium text-slate-400">Must produce a customer-safe output or stay blocked.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
