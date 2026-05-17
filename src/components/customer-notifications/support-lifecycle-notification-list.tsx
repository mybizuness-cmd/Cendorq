"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SupportLifecycleNotificationEntry = {
  source: "support-lifecycle";
  notificationId: string;
  supportRequestId: string;
  notificationKey: string;
  status: "received" | "reviewing" | "waiting-on-customer" | "in-specialist-review" | "resolved" | "closed";
  channel: "dashboard-notification" | "email" | "support-status";
  state: "queued" | "displayed" | "sent" | "read" | "suppressed" | "failed";
  createdAt: string;
  queuedAt?: string;
  displayedAt?: string;
  sentAt?: string;
  readAt?: string;
  suppressedAt?: string;
  failedAt?: string;
  customerVisibleTitle: string;
  customerVisibleBody: string;
  primaryPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
};

type CustomerNotificationApiSuccess = {
  ok: true;
  returned: number;
  entries: SupportLifecycleNotificationEntry[];
};

type CustomerNotificationApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type CustomerNotificationReadSuccess = {
  ok: true;
  acknowledged: number;
  matched: number;
  state: "read";
  customerOwned: true;
  rawPayloadReturned: false;
  rawEvidenceReturned: false;
  internalNotesReturned: false;
};

type CustomerNotificationReadError = {
  ok: false;
  error?: string;
  details?: string[];
};

type CustomerNotificationApiResponse = CustomerNotificationApiSuccess | CustomerNotificationApiError;
type CustomerNotificationReadResponse = CustomerNotificationReadSuccess | CustomerNotificationReadError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: SupportLifecycleNotificationEntry[]; message?: string }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

type ReadState = { kind: "idle" } | { kind: "submitting"; scope: string } | { kind: "error"; message: string };

export function SupportLifecycleNotificationList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [readState, setReadState] = useState<ReadState>({ kind: "idle" });

  async function loadNotifications(message?: string) {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/customer/notifications?source=support-lifecycle&limit=25", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as CustomerNotificationApiResponse | null;

      if (!response.ok || !data) {
        setState({ kind: "error", message: "Support lifecycle notifications could not be loaded safely.", details: [] });
        return;
      }

      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Support lifecycle notifications could not be loaded safely.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }

      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }

      setState({ kind: "ready", entries: data.entries, message });
    } catch {
      setState({ kind: "error", message: "The notification service could not be reached right now.", details: ["Open notifications from the authenticated customer dashboard and try again."] });
    }
  }

  async function markNotificationRead(payload: { notificationId?: string; supportRequestId?: string; markAllSupportLifecycle?: boolean }, scope: string) {
    setReadState({ kind: "submitting", scope });
    try {
      const response = await fetch("/api/customer/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as CustomerNotificationReadResponse | null;
      if (!response.ok || !data || !data.ok) {
        setReadState({ kind: "error", message: data && !data.ok && data.error ? data.error : "Notification acknowledgement could not be saved safely." });
        return;
      }
      setReadState({ kind: "idle" });
      await loadNotifications(data.acknowledged > 0 ? "Notification marked read." : "Notification was already read.");
    } catch {
      setReadState({ kind: "error", message: "The notification acknowledgement service could not be reached right now." });
    }
  }

  useEffect(() => {
    void loadNotifications();
  }, []);

  return (
    <section className="relative z-10 mt-8 rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">Live support notifications</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Customer-owned support alerts from the protected notification API.</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            These records come from the protected notification center API and are projected for the signed-in customer only. Raw payloads, evidence, billing data, internal notes, audit internals, suppression reasons, operator identities, risk scoring, secrets, and support context keys are not rendered here.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => void loadNotifications()} className="rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50">
            Refresh notifications
          </button>
          <button type="button" onClick={() => void markNotificationRead({ markAllSupportLifecycle: true }, "all")} disabled={readState.kind === "submitting"} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-bold text-cyan-900 shadow-sm transition hover:border-cyan-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
            {readState.kind === "submitting" && readState.scope === "all" ? "Marking read..." : "Mark all read"}
          </button>
        </div>
      </div>

      {readState.kind === "error" ? <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-900">{readState.message}</div> : null}

      {state.kind === "loading" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-cyan-50/45 p-5 text-sm font-medium leading-7 text-slate-600">Loading protected support lifecycle notifications...</div>
      ) : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-100 bg-cyan-50/55 p-5">
          <div className="text-sm font-semibold text-slate-950">No live support lifecycle notifications are visible yet.</div>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-600">When a customer-owned support request changes status, safe notification records can appear here without exposing internal support data.</p>
          <Link href="/dashboard/support" className="mt-4 inline-flex rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50">
            Open support center
          </Link>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5">
          <div className="text-sm font-semibold text-rose-900">{state.message}</div>
          {state.details.length ? (
            <div className="mt-3 grid gap-2">
              {state.details.map((detail) => (
                <div key={detail} className="rounded-2xl border border-rose-200 bg-white p-3 text-xs font-medium leading-6 text-rose-800">
                  {detail}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.message ? <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">{state.message}</div> : null}
          {state.entries.map((entry) => (
            <article key={entry.notificationId} className="rounded-[1.5rem] border border-cyan-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{formatState(entry.state)} · {formatChannel(entry.channel)}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{entry.customerVisibleTitle}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{entry.customerVisibleBody}</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                  <Link href={entry.primaryPath} className="rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50">
                    Open safe path
                  </Link>
                  <button type="button" onClick={() => void markNotificationRead({ notificationId: entry.notificationId }, entry.notificationId)} disabled={entry.state === "read" || readState.kind === "submitting"} className="rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-center text-sm font-bold text-cyan-900 shadow-sm transition hover:border-cyan-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
                    {entry.state === "read" ? "Read" : readState.kind === "submitting" && readState.scope === entry.notificationId ? "Marking..." : "Mark read"}
                  </button>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <NotificationDetail label="Status" value={formatStatus(entry.status)} />
                <NotificationDetail label="Channel" value={formatChannel(entry.channel)} />
                <NotificationDetail label="State" value={formatState(entry.state)} />
                <NotificationDetail label="Created" value={formatDate(entry.createdAt)} />
              </div>
              <div className="mt-4 rounded-[1.25rem] border border-cyan-100 bg-cyan-50/55 p-4 text-xs font-medium leading-6 text-cyan-900">
                Support request {entry.supportRequestId} is shown through customer-safe notification projection only.
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function NotificationDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-100 bg-cyan-50/45 p-4">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function formatStatus(status: SupportLifecycleNotificationEntry["status"]) {
  if (status === "waiting-on-customer") return "Waiting on customer";
  if (status === "in-specialist-review") return "Specialist review";
  return status.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatChannel(channel: SupportLifecycleNotificationEntry["channel"]) {
  if (channel === "dashboard-notification") return "Dashboard notification";
  if (channel === "support-status") return "Support status";
  return "Email";
}

function formatState(state: SupportLifecycleNotificationEntry["state"]) {
  return state.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Protected timestamp";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
