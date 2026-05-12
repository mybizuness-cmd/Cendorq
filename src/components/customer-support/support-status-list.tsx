"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CustomerSupportCommunicationPlan = {
  supportRequestId: string;
  status: CustomerSupportStatusEntry["customerVisibleStatus"];
  decision: "send" | "hold" | "suppress";
  notificationKey: string;
  emailKey: string;
  primaryPath: string;
  channels: readonly ("dashboard-notification" | "email" | "support-status")[];
  sendReasons: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  requiredGuards: readonly string[];
};

type CustomerSupportStatusEntry = {
  supportRequestId: string;
  requestType: string;
  workStartGate: string;
  workStartPlanKey: string;
  workStartGateTitle: string;
  workStartCustomerAction: string;
  workStartRequiredBeforeQueue: string[];
  workStartBackendStartRule: string;
  workStartBlockedPattern: string;
  businessContext: string;
  safeSummary: string;
  customerVisibleStatus: "received" | "reviewing" | "waiting-on-customer" | "in-specialist-review" | "resolved" | "closed";
  customerSafeStatus: string;
  statusLabel: string;
  statusCopy: string;
  primaryCta: string;
  primaryPath: string;
  communicationPlan: CustomerSupportCommunicationPlan;
  createdAt: string;
  updatedAt: string;
  operatorReviewRequired: boolean;
  downstreamProcessingAllowed: boolean;
};

type SupportStatusApiSuccess = { ok: true; returned: number; entries: CustomerSupportStatusEntry[] };
type SupportStatusApiError = { ok: false; error?: string; details?: string[] };
type SupportStatusApiResponse = SupportStatusApiSuccess | SupportStatusApiError;
type LoadState = { kind: "loading" } | { kind: "ready"; entries: CustomerSupportStatusEntry[] } | { kind: "empty" } | { kind: "error"; message: string; details: string[] };

const BUTTON_SECONDARY = "rounded-2xl border border-cyan-100 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950";
const BUTTON_PRIMARY = "inline-flex rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50";

export function SupportStatusList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  async function loadStatus() {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/customer/support/status", { method: "GET", headers: { Accept: "application/json" } });
      const data = (await response.json().catch(() => null)) as SupportStatusApiResponse | null;
      if (!response.ok || !data) { setState({ kind: "error", message: "Support status could not be loaded safely.", details: [] }); return; }
      if (!data.ok) { setState({ kind: "error", message: data.error ?? "Support status could not be loaded safely.", details: Array.isArray(data.details) ? data.details : [] }); return; }
      if (!data.entries.length) { setState({ kind: "empty" }); return; }
      setState({ kind: "ready", entries: data.entries });
    } catch {
      setState({ kind: "error", message: "The support status service could not be reached right now.", details: ["Open this page from the authenticated customer dashboard and try again."] });
    }
  }

  useEffect(() => { void loadStatus(); }, []);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Your protected support requests.</h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
            Status is shown through customer-safe projection only. Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.
          </p>
        </div>
        <button type="button" onClick={() => void loadStatus()} className={BUTTON_SECONDARY}>Refresh status</button>
      </div>

      {state.kind === "loading" ? <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-cyan-50/45 p-5 text-sm font-medium leading-7 text-slate-600">Loading protected support status...</div> : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-cyan-50/55 p-5">
          <div className="text-sm font-semibold text-slate-950">No active support requests are visible yet.</div>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-600">Start a protected request when you need report help, correction review, billing support, security review, or plan guidance.</p>
          <Link href="/dashboard/support/request" className={`mt-4 ${BUTTON_PRIMARY}`}>Start protected request</Link>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5">
          <div className="text-sm font-semibold text-rose-900">{state.message}</div>
          {state.details.length ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-rose-200 bg-white p-3 text-xs font-medium leading-6 text-rose-800">{detail}</div>)}</div> : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.entries.map((entry) => {
            const primaryCustomerPath = buildCustomerSupportStatusPath(entry);
            return (
              <article key={entry.supportRequestId} className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/35 p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">{entry.statusLabel}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{entry.businessContext}</h3>
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{entry.statusCopy}</p>
                  </div>
                  <Link href={primaryCustomerPath} className={BUTTON_SECONDARY}>{entry.primaryCta}</Link>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <StatusDetail label="Request ID" value={entry.supportRequestId} />
                  <StatusDetail label="Request type" value={entry.requestType} />
                  <StatusDetail label="Processing" value={entry.downstreamProcessingAllowed ? "Allowed" : "Held for review"} />
                  <StatusDetail label="Operator review" value={entry.operatorReviewRequired ? "Required" : "Not required"} />
                </div>
                <WorkStartGatePanel entry={entry} />
                <CommunicationPlanPanel communicationPlan={entry.communicationPlan} supportRequestId={entry.supportRequestId} />
                <div className="mt-4 rounded-[1.25rem] border border-cyan-100 bg-white p-4 text-xs font-medium leading-6 text-slate-600">
                  {entry.customerVisibleStatus === "waiting-on-customer" ? "Use the safe update path for this request. Cendorq will not ask you to paste rejected raw content again." : entry.customerSafeStatus}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
      <div className="sr-only">Light support status list. No black support status list blocks. No dark blue support status list blocks.</div>
    </section>
  );
}

function WorkStartGatePanel({ entry }: { entry: CustomerSupportStatusEntry }) {
  const required = entry.workStartRequiredBeforeQueue.length ? entry.workStartRequiredBeforeQueue.slice(0, 4).join(" • ") : "No queue requirements projected.";
  return <div className="mt-4 rounded-[1.25rem] border border-cyan-100 bg-white p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">Cendorq work-start gate</div><p className="mt-2 text-sm font-semibold text-slate-950">{entry.workStartGateTitle}</p><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-slate-600">{entry.workStartCustomerAction}</p></div><Link href={buildGatePath(entry)} className={BUTTON_SECONDARY}>Open gate path</Link></div><div className="mt-4 grid gap-3 md:grid-cols-3"><StatusDetail label="Plan layer" value={entry.workStartPlanKey} /><StatusDetail label="Required before queue" value={required} /><StatusDetail label="Blocked pattern" value={entry.workStartBlockedPattern} /></div></div>;
}

function CommunicationPlanPanel({ communicationPlan, supportRequestId }: { communicationPlan: CustomerSupportCommunicationPlan; supportRequestId: string }) {
  const channels = communicationPlan.channels.length ? communicationPlan.channels.map(formatCommunicationChannel).join(", ") : "No customer channel selected";
  const guards = communicationPlan.requiredGuards.length ? communicationPlan.requiredGuards.map(formatCommunicationGuard).join(" • ") : "Customer-safe projection";
  const communicationPath = buildCommunicationPlanPath(communicationPlan, supportRequestId);
  return <div className="mt-4 rounded-[1.25rem] border border-violet-100 bg-violet-50/50 p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">Next communication path</div><p className="mt-2 text-sm font-semibold text-slate-950">{formatCommunicationDecision(communicationPlan.decision)}</p><p className="mt-2 max-w-3xl text-xs font-medium leading-6 text-slate-600">{communicationDecisionCopy(communicationPlan.decision)}</p></div><Link href={communicationPath} className="rounded-2xl border border-violet-100 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50">Open communication path</Link></div><div className="mt-4 grid gap-3 md:grid-cols-3"><StatusDetail label="Communication decision" value={formatCommunicationDecision(communicationPlan.decision)} /><StatusDetail label="Safe channels" value={channels} /><StatusDetail label="Required guards" value={guards} /></div></div>;
}

function StatusDetail({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-cyan-100 bg-white p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div><div className="mt-2 break-words text-sm font-semibold text-slate-950">{value}</div></div>; }
function buildCustomerSupportStatusPath(entry: CustomerSupportStatusEntry) { if (entry.customerVisibleStatus === "waiting-on-customer") return buildSafeSupportUpdatePath(entry.supportRequestId); return entry.primaryPath; }
function buildCommunicationPlanPath(communicationPlan: CustomerSupportCommunicationPlan, supportRequestId: string) { if (communicationPlan.status === "waiting-on-customer") return buildSafeSupportUpdatePath(supportRequestId); return communicationPlan.primaryPath; }
function buildGatePath(entry: CustomerSupportStatusEntry) { if (entry.workStartGate === "repair-prerequisite") return "/dashboard/support/request"; if (entry.workStartGate === "control-baseline") return "/dashboard/billing"; return "/dashboard/reports"; }
function buildSafeSupportUpdatePath(supportRequestId: string) { return `/dashboard/support/request?update=${encodeURIComponent(supportRequestId)}`; }
function formatCommunicationDecision(decision: CustomerSupportCommunicationPlan["decision"]) { if (decision === "send") return "Ready to communicate"; if (decision === "hold") return "Protected hold"; return "Suppressed by safety controls"; }
function communicationDecisionCopy(decision: CustomerSupportCommunicationPlan["decision"]) { if (decision === "send") return "Cendorq can use the approved customer channels for this status while keeping the request customer-owned and safely projected."; if (decision === "hold") return "Cendorq is keeping the communication controlled until the customer-safe conditions for this status are satisfied."; return "Cendorq is avoiding duplicate, unavailable, or blocked communication for this status while preserving the protected support path."; }
function formatCommunicationChannel(channel: CustomerSupportCommunicationPlan["channels"][number]) { if (channel === "dashboard-notification") return "Dashboard notification"; if (channel === "support-status") return "Support status"; return "Email"; }
function formatCommunicationGuard(guard: string) { return guard.split("-").join(" ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
