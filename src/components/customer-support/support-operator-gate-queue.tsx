"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type OperatorSupportEntry = {
  id: string;
  businessContext: string;
  requestType: string;
  workStartGate: string;
  workStartPlanKey: string;
  workStartRequiredBeforeQueue: string[];
  workStartBackendStartRule: string;
  workStartBlockedPattern: string;
  safeDescription: string;
  safeSummary: string;
  decision: "allow" | "sanitize" | "challenge" | "block" | "quarantine";
  riskFlags: string[];
  createdAt: string;
  updatedAt: string;
  rawPayloadStored: false;
  customerOwnershipRequired: boolean;
  supportAuditRequired: boolean;
  downstreamProcessingAllowed: boolean;
  operatorReviewRequired: boolean;
};

type OperatorSupportApiSuccess = {
  ok: true;
  returned: number;
  entries: OperatorSupportEntry[];
};

type OperatorSupportApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type OperatorSupportApiResponse = OperatorSupportApiSuccess | OperatorSupportApiError;

type LoadState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; entries: OperatorSupportEntry[] }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

const GATE_FILTERS = [
  { label: "All gates", value: "" },
  { label: "Review intake", value: "review-intake" },
  { label: "Repair prerequisite", value: "repair-prerequisite" },
  { label: "Control baseline", value: "control-baseline" },
] as const;

const DECISION_FILTERS = [
  { label: "All decisions", value: "" },
  { label: "Allow", value: "allow" },
  { label: "Sanitize", value: "sanitize" },
  { label: "Challenge", value: "challenge" },
  { label: "Quarantine", value: "quarantine" },
] as const;

export function SupportOperatorGateQueue() {
  const [adminKey, setAdminKey] = useState("");
  const [gateFilter, setGateFilter] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [state, setState] = useState<LoadState>({ kind: "idle" });

  const readyCount = useMemo(() => (state.kind === "ready" ? state.entries.filter((entry) => entry.downstreamProcessingAllowed && !entry.operatorReviewRequired).length : 0), [state]);
  const heldCount = useMemo(() => (state.kind === "ready" ? state.entries.filter((entry) => !entry.downstreamProcessingAllowed || entry.operatorReviewRequired).length : 0), [state]);

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    if (name === "gateFilter") setGateFilter(value);
    if (name === "decisionFilter") setDecisionFilter(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadQueue();
  }

  async function loadQueue() {
    if (!adminKey.trim()) {
      setState({ kind: "error", message: "Enter the configured support admin key before loading the queue.", details: ["The key is sent as an admin-read header and is not stored by this page."] });
      return;
    }

    setState({ kind: "loading" });
    const params = new URLSearchParams({ limit: "50" });
    if (gateFilter) params.set("workStartGate", gateFilter);
    if (decisionFilter) params.set("decision", decisionFilter);

    try {
      const response = await fetch(`/api/customer/support/request?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-support-admin-key": adminKey,
          "x-intake-admin-key": adminKey,
        },
        cache: "no-store",
      });
      const data = (await response.json().catch(() => null)) as OperatorSupportApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The operator queue could not be loaded safely.", details: [] });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The operator queue could not be loaded safely.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }
      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }
      setState({ kind: "ready", entries: data.entries });
    } catch {
      setState({ kind: "error", message: "The operator queue service could not be reached.", details: ["Check the authenticated environment and try again."] });
    }
  }

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Operator work-start queue</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Review what can enter the backend queue.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            This queue uses the same protected support intake envelope. It shows safe summaries and Cendorq work-start gates only. It does not expose customer hashes, raw payloads, internal notes, billing data, tokens, or operator identities.
          </p>
        </div>
        <div className="grid gap-2 rounded-[1.35rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm text-cyan-50 lg:min-w-72">
          <div className="font-semibold">Ready without operator review: {readyCount}</div>
          <div className="font-semibold">Held or review-required: {heldCount}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 lg:grid-cols-[1fr_13rem_13rem_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Support admin key</span>
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            autoComplete="off"
            placeholder="Enter configured read key"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Gate</span>
          <select name="gateFilter" value={gateFilter} onChange={handleFilterChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">
            {GATE_FILTERS.map((filter) => <option key={filter.value || "all"} value={filter.value}>{filter.label}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Decision</span>
          <select name="decisionFilter" value={decisionFilter} onChange={handleFilterChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">
            {DECISION_FILTERS.map((filter) => <option key={filter.value || "all"} value={filter.value}>{filter.label}</option>)}
          </select>
        </label>
        <button type="submit" className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60" disabled={state.kind === "loading"}>
          {state.kind === "loading" ? "Loading..." : "Load queue"}
        </button>
      </form>

      {state.kind === "idle" ? <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Enter the support admin key to load projected gate entries.</div> : null}
      {state.kind === "loading" ? <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading protected operator queue...</div> : null}
      {state.kind === "empty" ? <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5 text-sm font-semibold text-cyan-50">No support entries match the selected filters.</div> : null}
      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">{detail}</div>)}</div> : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.entries.map((entry) => <OperatorQueueCard key={entry.id} entry={entry} />)}
        </div>
      ) : null}
    </section>
  );
}

function OperatorQueueCard({ entry }: { entry: OperatorSupportEntry }) {
  const queueState = entry.downstreamProcessingAllowed && !entry.operatorReviewRequired ? "Ready for queue" : entry.downstreamProcessingAllowed ? "Review before queue" : "Held";
  const requirements = entry.workStartRequiredBeforeQueue.length ? entry.workStartRequiredBeforeQueue.slice(0, 5).join(" • ") : "No requirements projected.";
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{queueState}</div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{entry.businessContext}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{entry.safeSummary || entry.safeDescription}</p>
        </div>
        <span className="rounded-full border border-cyan-300/25 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">{entry.workStartGate}</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <QueueDetail label="Request ID" value={entry.id} />
        <QueueDetail label="Plan layer" value={entry.workStartPlanKey} />
        <QueueDetail label="Risk decision" value={entry.decision} />
        <QueueDetail label="Operator review" value={entry.operatorReviewRequired ? "Required" : "Not required"} />
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <QueueDetail label="Required before queue" value={requirements} />
        <QueueDetail label="Backend rule" value={entry.workStartBackendStartRule} />
        <QueueDetail label="Blocked pattern" value={entry.workStartBlockedPattern} />
      </div>
      <div className="mt-4 rounded-[1.25rem] border border-amber-300/15 bg-amber-300/10 p-4 text-xs leading-6 text-amber-50">
        Do not start backend work from this card alone unless the gate requirements, customer ownership, and operator-review state are satisfied.
      </div>
    </article>
  );
}

function QueueDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
