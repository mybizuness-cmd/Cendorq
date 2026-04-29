import Link from "next/link";

import { OperatorApprovalList } from "@/components/customer-support/operator-approval-list";
import { OperatorApprovalPanel } from "@/components/customer-support/operator-approval-panel";
import { OperatorAssignmentList } from "@/components/customer-support/operator-assignment-list";
import { OperatorAssignmentPanel } from "@/components/customer-support/operator-assignment-panel";
import { OperatorBillingApprovalPanel } from "@/components/customer-support/operator-billing-approval-panel";
import { OperatorClosureApprovalPanel } from "@/components/customer-support/operator-closure-approval-panel";
import { OperatorSecurityApprovalPanel } from "@/components/customer-support/operator-security-approval-panel";
import { OperatorSafeSummaryConsole } from "@/components/customer-support/operator-safe-summary-console";
import { CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT, CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS } from "@/lib/customer-support-operator-console-contracts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support operator console | Cendorq",
  description: "Support operator console for safe summaries, assignment, separated review actions, safe history, and protected support triage.",
  path: "/admin/support",
  noIndex: true,
});

const OPERATOR_RULES = [
  "Safe summaries use safe-summary-only projection.",
  "Assignments, correction reviews, billing reviews, security reviews, and closure reviews require guarded APIs, fresh reauthentication, and immutable audit creation.",
  "Assignment and approval history use safe projections only.",
  "All operator actions remain separated by approval gate and reviewer role.",
] as const;

const SUPPORT_OPERATOR_SECTION_LINKS = [
  { href: "#review-intake", label: "Review intake", description: "Safe summaries and assignment routing" },
  { href: "#separated-actions", label: "Separated actions", description: "Gate-specific review actions" },
  { href: "#safe-history", label: "Safe history", description: "Projection-only records and filters" },
] as const;

const SUPPORT_OPERATOR_STATUS_ITEMS = [
  { label: "Sections", value: "3", detail: "Intake, actions, history" },
  { label: "Review gates", value: "4", detail: "Correction, billing, security, closure" },
  { label: "History mode", value: "Safe", detail: "Projection-only records" },
  { label: "Mutation rule", value: "Guarded", detail: "Audit before stored result" },
] as const;

const SUPPORT_OPERATOR_REVIEW_GATE_MAP = [
  { label: "Correction", endpoint: "/api/admin/support/approvals", gate: "specialist-review", reviewer: "support-specialist", projection: "operator-approval-safe" },
  { label: "Billing", endpoint: "/api/admin/support/approvals/billing", gate: "billing-approval", reviewer: "billing-approver", projection: "operator-billing-approval-safe" },
  { label: "Security", endpoint: "/api/admin/support/approvals/security", gate: "security-approval", reviewer: "security-reviewer", projection: "operator-security-approval-safe" },
  { label: "Closure", endpoint: "/api/admin/support/approvals/closure", gate: "support-admin-approval", reviewer: "support-admin", projection: "operator-closure-approval-safe" },
] as const;

const SUPPORT_OPERATOR_POSTURE_MAP = [
  { label: "Safe summaries", mode: "Read-only", record: "No mutation", check: "safe-summary-only projection" },
  { label: "Assignments", mode: "Guarded mutation", record: "Operator record required", check: "assignment projection" },
  { label: "Reviews", mode: "Gate-specific mutation", record: "Operator record before stored result", check: "safe approval projection" },
  { label: "History", mode: "Read-only", record: "Projection query only", check: "bounded safe list" },
] as const;

const SUPPORT_OPERATOR_COMPLETION_CHECKLIST = [
  { label: "Safe summary reviewed", detail: "Use the safe-summary projection before assigning or reviewing." },
  { label: "Customer-owned context confirmed", detail: "Use only customer-owned support context from guarded APIs." },
  { label: "Correct review gate selected", detail: "Match the panel to correction, billing, security, or closure." },
  { label: "Customer-safe copy prepared", detail: "Write bounded status or outcome copy before submitting a review." },
] as const;

export default function SupportOperatorConsolePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Support operator console</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Review, assign, approve, and track support with protected audit controls.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This operator-facing support surface is organized into safe intake and routing, separated review actions, and safe history. It is designed to inspect customer support context and route review paths without exposing unsafe raw data, private internals, or customer-visible operator identity.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Customer dashboard
          </Link>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
            Customer support status
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Operator console status strip">
        {SUPPORT_OPERATOR_STATUS_ITEMS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            <div className="mt-2 text-xs leading-6 text-slate-300">{item.detail}</div>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4">
        {OPERATOR_RULES.map((rule) => (
          <article key={rule} className="system-surface rounded-[1.5rem] p-5 text-sm leading-7 text-slate-200">
            {rule}
          </article>
        ))}
      </section>

      <nav aria-label="Operator console section navigation" className="relative z-10 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Console navigation</div>
        <p className="mt-2 text-sm leading-7 text-slate-300">Jump links only. Navigation does not change guarded API behavior, review gates, audit requirements, or projection rules.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {SUPPORT_OPERATOR_SECTION_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              <div className="text-sm font-semibold text-white">{link.label}</div>
              <div className="mt-1 text-xs leading-6 text-slate-400">{link.description}</div>
            </a>
          ))}
        </div>
      </nav>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6" aria-label="Operator review gate map">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Review gate map</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Separated review paths.</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">This map is informational only. It lists the endpoint, approval gate, reviewer role, and safe projection for each review path without changing protected API behavior.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {SUPPORT_OPERATOR_REVIEW_GATE_MAP.map((item) => (
            <article key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="mt-4 grid gap-3 text-xs leading-6 text-slate-300">
                <GateMapDetail label="Endpoint" value={item.endpoint} />
                <GateMapDetail label="Gate" value={item.gate} />
                <GateMapDetail label="Reviewer" value={item.reviewer} />
                <GateMapDetail label="Projection" value={item.projection} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6" aria-label="Operator posture map">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Posture map</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Read and write surfaces at a glance.</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">This map is informational only. It separates read-only surfaces from guarded write surfaces without changing authorization, review gates, stored records, or projections.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {SUPPORT_OPERATOR_POSTURE_MAP.map((item) => (
            <article key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="mt-4 grid gap-3 text-xs leading-6 text-slate-300">
                <GateMapDetail label="Mode" value={item.mode} />
                <GateMapDetail label="Record" value={item.record} />
                <GateMapDetail label="Check" value={item.check} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6" aria-label="Operator completion checklist">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Completion checklist</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Check before review action.</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">This checklist is informational only. It does not approve, deny, store, or expose support data.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {SUPPORT_OPERATOR_COMPLETION_CHECKLIST.map((item) => (
            <article key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <p className="mt-3 text-xs leading-6 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Contract lock</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Closed-by-default operator access.</h2>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Route: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.route}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Access: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.access}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Default mode: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.defaultMode}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Projection: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.customerProjection}</div>
          </div>
        </article>

        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Required guardrails</div>
          <div className="mt-5 grid gap-3">
            {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS.slice(0, 4).map((guard) => (
              <div key={guard} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                {guard}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="review-intake" className="relative z-10 mt-10 scroll-mt-8">
        <OperatorSectionHeader eyebrow="Review intake" title="Safe intake and routing." description="Start with safe summaries and assignment routing before any review action. These panels do not change customer-visible outcomes by themselves." />
        <div className="mt-5 grid gap-8">
          <OperatorSafeSummaryConsole />
          <OperatorAssignmentPanel />
        </div>
      </section>

      <section id="separated-actions" className="relative z-10 mt-10 scroll-mt-8">
        <OperatorSectionHeader eyebrow="Separated actions" title="Approval actions by gate." description="Correction, billing, security, and closure reviews stay separated by endpoint, gate, reviewer role, audit path, and safe projection output." />
        <div className="mt-5 grid gap-8">
          <OperatorApprovalPanel />
          <OperatorBillingApprovalPanel />
          <OperatorSecurityApprovalPanel />
          <OperatorClosureApprovalPanel />
        </div>
      </section>

      <section id="safe-history" className="relative z-10 mt-10 scroll-mt-8">
        <OperatorSectionHeader eyebrow="Safe history" title="Projection-only history." description="Assignment and approval history show safe projections only, with filtering and refresh controls that never add customer hashes, raw fields, or internal authorization details to the UI." />
        <div className="mt-5 grid gap-8">
          <OperatorAssignmentList />
          <OperatorApprovalList />
        </div>
      </section>
    </main>
  );
}

function OperatorSectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function GateMapDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 break-words font-semibold text-slate-100">{value}</div>
    </div>
  );
}
