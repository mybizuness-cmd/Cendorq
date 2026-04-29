"use client";

import { useEffect, useState } from "react";

type SafeAssignment = {
  assignmentId: string;
  supportRequestId: string;
  assignedRole: string;
  assignmentState: string;
  decision: string;
  reasonCode: string;
  customerSafeSummary: string;
  createdAt: string;
  updatedAt: string;
  auditEventId: string;
};

type AssignmentListApiSuccess = {
  ok: true;
  returned: number;
  entries: SafeAssignment[];
  projection: "operator-assignment-safe-list";
};

type AssignmentListApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type AssignmentListApiResponse = AssignmentListApiSuccess | AssignmentListApiError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: SafeAssignment[] }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

export function OperatorAssignmentList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  async function loadAssignments() {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/admin/support/assignments/list?limit=50", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as AssignmentListApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "Safe assignment records could not be loaded.", details: ["Use a verified operator session and try again."] });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Safe assignment records could not be loaded.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }
      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }
      setState({ kind: "ready", entries: data.entries });
    } catch {
      setState({ kind: "error", message: "The assignment list service could not be reached.", details: ["Open the operator console from a verified session and try again."] });
    }
  }

  useEffect(() => {
    void loadAssignments();
  }, []);

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Assignment records</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Safe assignment history.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            This list displays safe assignment projections only. Customer ownership hashes, actor references, raw storage flags, internal notes, and authorization internals are intentionally absent.
          </p>
        </div>
        <button type="button" onClick={() => void loadAssignments()} className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
          Refresh assignments
        </button>
      </div>

      {state.kind === "loading" ? <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading safe assignment records...</div> : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="text-sm font-semibold text-cyan-50">No assignment records are visible yet.</div>
          <p className="mt-2 text-sm leading-7 text-cyan-50/80">Assignments created through the guarded assignment panel will appear here as safe projections.</p>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">{detail}</div>)}</div> : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.entries.map((entry) => (
            <article key={entry.assignmentId} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{entry.assignmentState} · {entry.decision}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{entry.assignedRole}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{entry.customerSafeSummary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold text-slate-300">Safe projection</div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <AssignmentDetail label="Assignment ID" value={entry.assignmentId} />
                <AssignmentDetail label="Support request" value={entry.supportRequestId} />
                <AssignmentDetail label="Reason" value={entry.reasonCode} />
                <AssignmentDetail label="Audit event" value={entry.auditEventId} />
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function AssignmentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
