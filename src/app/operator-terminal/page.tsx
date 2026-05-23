import { resolveOperatorTerminalAccessMatrix, summarizeOperatorTerminalAccessMatrix } from "@/lib/operator-terminal-access-matrix";
import { getOperatorTerminalAccessSafety } from "@/lib/operator-terminal-access-safety";
import { getOperatorTerminalLanes, getOperatorTerminalSamplePackets } from "@/lib/operator-terminal-foundation";
import { resolveOperatorTerminalPacketRuntimeBatch } from "@/lib/operator-terminal-packet-runtime";
import { resolveOperatorTerminalServerAccess } from "@/lib/operator-terminal-server-access-gate";

export default function OperatorTerminalPage() {
  const accessSafety = getOperatorTerminalAccessSafety();
  const serverAccess = resolveOperatorTerminalServerAccess({
    role: "operator",
    serverVerifiedIdentity: true,
    sessionBoundToServer: true,
    acceptedInternalBoundary: true,
    requestedAction: "review-packet",
  });
  const accessMatrix = resolveOperatorTerminalAccessMatrix();
  const accessMatrixSummary = summarizeOperatorTerminalAccessMatrix(accessMatrix);
  const lanes = getOperatorTerminalLanes();
  const packets = getOperatorTerminalSamplePackets();
  const packetRuntime = resolveOperatorTerminalPacketRuntimeBatch(
    packets.map((packet) => ({
      packet,
      completedChecks: packet.state === "release-ready" ? ["released package id", "approval actor", "approval time", "evidence references", "rollback path"] : [],
      approvedOutputs: packet.state === "release-ready" ? ["release summary", "audit entry"] : [],
      approvalActor: packet.state === "release-ready" ? "sample-operator" : null,
      approvalTime: packet.state === "release-ready" ? "sample-approval-time" : null,
      releaseNote: packet.state === "release-ready" ? "Sample customer-safe release note." : null,
    })),
  );

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

        <section className="rounded-[2rem] border border-amber-200/20 bg-amber-200/10 p-5 sm:p-6" aria-label="Operator terminal access safety">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-100">{accessSafety.label}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">Access safety is sample-only until server-owned gating exists.</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-amber-50">{accessSafety.banner}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-100">Required before production: {accessSafety.requiredGateBeforeProduction}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-200">Disabled actions</p>
                <div className="mt-3 grid gap-2">
                  {accessSafety.disabledActions.map((action) => (
                    <p key={action} className="rounded-full border border-rose-200/20 bg-rose-200/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-rose-50">
                      {action}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">Allowed sample actions</p>
                <div className="mt-3 grid gap-2">
                  {accessSafety.allowedSampleActions.map((action) => (
                    <p key={action} className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-50">
                      {action}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-200/20 bg-cyan-200/10 p-5 sm:p-6" aria-label="Operator terminal server access gate">
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100">Server access gate</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">Server-owned gate status: {serverAccess.state}</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-cyan-50">{serverAccess.reason}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Terminal</p>
                <p className="mt-2 text-xl font-semibold text-white">{serverAccess.terminalVisible ? "visible" : "hidden"}</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Packet review</p>
                <p className="mt-2 text-xl font-semibold text-white">{serverAccess.packetReviewAllowed ? "allowed" : "blocked"}</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Approval</p>
                <p className="mt-2 text-xl font-semibold text-white">{serverAccess.approvalAllowed ? "allowed" : "limited"}</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">Release execution: {serverAccess.releaseExecutionAllowed ? "enabled" : "disabled"} · Provider access: {serverAccess.providerAccessAllowed ? "enabled" : "disabled"}</p>
        </section>

        <section className="rounded-[2rem] border border-violet-200/20 bg-violet-200/10 p-5 sm:p-6" aria-label="Operator terminal access matrix">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-violet-100">Access decision matrix</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">Role and action coverage is checked before live auth wiring.</h2>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-[1rem] bg-white/[0.06] p-3">
                  <p className="text-2xl font-semibold text-white">{accessMatrixSummary.passed}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-100">passed</p>
                </div>
                <div className="rounded-[1rem] bg-white/[0.06] p-3">
                  <p className="text-2xl font-semibold text-white">{accessMatrixSummary.failed}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-100">failed</p>
                </div>
                <div className="rounded-[1rem] bg-white/[0.06] p-3">
                  <p className="text-2xl font-semibold text-white">{accessMatrixSummary.total}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-100">total</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {accessMatrix.map((result) => (
                <article key={result.scenario.id} className="rounded-[1.2rem] border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-5 text-white">{result.scenario.label}</p>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-violet-100">{result.passed ? "pass" : "fail"}</span>
                  </div>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-100">{result.resolution.state}</p>
                  <p className="mt-2 text-xs font-medium leading-6 text-slate-300">{result.resolution.reason}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Command Queue</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-white">Packets waiting on safe next gates.</h2>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-[0.9rem] bg-white/[0.05] px-3 py-2">
                  <p className="text-lg font-semibold text-white">{packetRuntime.releaseReady.length}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">ready</p>
                </div>
                <div className="rounded-[0.9rem] bg-white/[0.05] px-3 py-2">
                  <p className="text-lg font-semibold text-white">{packetRuntime.needsReview.length}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">review</p>
                </div>
                <div className="rounded-[0.9rem] bg-white/[0.05] px-3 py-2">
                  <p className="text-lg font-semibold text-white">{packetRuntime.releaseBlocked.length}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">blocked</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {packetRuntime.packets.map((runtimePacket) => (
                <article key={runtimePacket.terminalPacket.id} className="rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{runtimePacket.terminalPacket.business}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{runtimePacket.visibleState}</p>
                    </div>
                    <p className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">{runtimePacket.approvalResolution.nextGate}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{runtimePacket.approvalResolution.evidenceSummary.customerReady}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">ready</p>
                    </div>
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{runtimePacket.approvalResolution.evidenceSummary.needsReview}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">review</p>
                    </div>
                    <div className="rounded-[0.9rem] bg-white/[0.05] p-3">
                      <p className="text-lg font-semibold text-white">{runtimePacket.approvalResolution.evidenceSummary.blocked}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">blocked</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-semibold leading-6 text-slate-300">{runtimePacket.operatorNotice}</p>
                  <p className="mt-2 text-xs font-semibold leading-6 text-cyan-100">{runtimePacket.safeNextAction}</p>
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
