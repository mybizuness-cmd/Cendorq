import type { Metadata } from "next";
import { headers } from "next/headers";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getAiManagerCommandHistoryPolicy } from "@/lib/command-center/ai-manager-command-history";
import { getAiManagerCommandPolicies } from "@/lib/command-center/ai-manager-command-queue";
import { getCustomerOutputApprovalPolicies, type CustomerOutputApprovalPolicy } from "@/lib/command-center/customer-output-approval";
import { getOptimizationMethodLibrary } from "@/lib/command-center/optimization-method-library";
import { getCommandCenterPlanControls } from "@/lib/command-center/plan-control";
import { COMMAND_CENTER_READINESS_CHECKS } from "@/lib/command-center/readiness";
import { getCommandCenterReadinessSummary } from "@/lib/command-center/readiness-summary";

import { AiManagerVersionRegistryPanel } from "./ai-manager-version-registry-panel";
import { BenchmarkEvidencePanel } from "./benchmark-evidence-panel";
import { BenchmarkIntelligencePanel } from "./benchmark-intelligence-panel";
import { CommandCenterOperatingMap } from "./command-center-operating-map";
import { CommandCenterPanelIndex } from "./panel-index";
import { ModuleRoadmapPanel } from "./module-roadmap-panel";
import { OperatorReadinessMatrix } from "./operator-readiness-matrix";
import { OptimizationLibraryPanel } from "./optimization-library-panel";
import { PlanControlPanel } from "./plan-control-panel";
import { ReportTruthMethodologyPanel } from "./report-truth-methodology-panel";
import { SecurityPosturePanel } from "./security-posture-panel";
import { TestRecordClassesPanel } from "./test-record-classes-panel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Command Center | Cendorq",
  description: "Private Cendorq operating layer. Closed by default until authentication, database, and production access controls are configured.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function CommandCenterPage() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
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

  const foundation = getCommandCenterReadinessSummary();
  const aiCommands = getAiManagerCommandPolicies();
  const aiHistory = getAiManagerCommandHistoryPolicy();
  const planControls = getCommandCenterPlanControls();
  const optimizationMethods = getOptimizationMethodLibrary();
  const customerOutputPolicies = getCustomerOutputApprovalPolicies();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Cendorq Command Center</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Private operating system shell.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            The source-of-truth foundations are ready. Dashboard modules remain gated until production auth and durable database configuration are active.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric label="Areas" value={foundation.totalAreas} />
            <Metric label="Configured" value={foundation.configuredAreas} />
            <Metric label="Missing" value={foundation.missingAreas} />
            <Metric label="Ready" value={foundation.ready ? "Yes" : "No"} />
          </div>
        </div>
        <CommandCenterOperatingMap />
        <SecurityPosturePanel />
        <OperatorReadinessMatrix />
        <CommandCenterPanelIndex />
        <ModuleRoadmapPanel />
        <PlanControlPanel plans={planControls} />
        <OptimizationLibraryPanel methods={optimizationMethods} />
        <div className="mt-10 rounded-[2rem] border border-rose-200/10 bg-rose-200/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Customer Output Approval</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Preview, review, approve, then send</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Metadata only. Every customer-facing output stays blocked until required reviews, previews, block-condition checks, and audit events prove it is truthful, plan-scoped, customer-safe, and approved.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {customerOutputPolicies.map((policy) => (
              <CustomerOutputPolicyCard key={policy.outputType} policy={policy} />
            ))}
          </div>
        </div>
        <BenchmarkIntelligencePanel />
        <BenchmarkEvidencePanel />
        <ReportTruthMethodologyPanel />
        <AiManagerVersionRegistryPanel />
        <TestRecordClassesPanel />
        <div className="mt-10 rounded-[2rem] border border-cyan-200/10 bg-cyan-200/[0.035] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">AI Manager</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Controlled command queue</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Metadata only. These are the future AI manager actions available from the private panel. AI can draft, review, compare, test, summarize, and recommend, but it cannot send customer output or change live records without review and approval.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {aiCommands.map((command) => (
              <div key={command.commandType} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base font-semibold text-white">{command.label}</p>
                  <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    {command.defaultState}
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
                  <p><span className="font-semibold text-slate-200">Context:</span> {command.requiredContext.slice(0, 3).join(", ")}</p>
                  <p><span className="font-semibold text-slate-200">Guards:</span> {command.requiredGuards.slice(0, 3).join(", ")}</p>
                  <p><span className="font-semibold text-slate-200">Blocked:</span> {command.blockedActions.slice(0, 3).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 rounded-[2rem] border border-emerald-200/10 bg-emerald-200/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">AI History</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Command audit trail</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Every future AI command should record request context, model and policy labels, review details, blocked reasons, and final decisions before anything can become customer-facing.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <HistoryCard title="Required fields" items={aiHistory.requiredFields.slice(0, 6)} />
            <HistoryCard title="Review fields" items={aiHistory.reviewFields.slice(0, 6)} />
            <HistoryCard title="Blocked reasons" items={aiHistory.blockedReasonTypes.slice(0, 6)} />
            <HistoryCard title="Audit events" items={aiHistory.auditEvents.slice(0, 6)} />
          </div>
          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Retention states</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{aiHistory.retentionStates.join(" · ")}</p>
          </div>
        </div>
        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Readiness</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Private configuration checklist</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Metadata only. This view lists required server-side configuration names and protected data areas without reading values, secrets, or customer records.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {foundation.items.map((item) => (
              <div key={item.area} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base font-semibold capitalize text-white">{item.area}</p>
                  <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    {item.configured ? "ready" : "pending"}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <MiniMetric label="Required" value={item.requiredCount} />
                  <MiniMetric label="Missing" value={item.missingCount} />
                  <MiniMetric label="Scope" value={item.scopeCount} />
                  <MiniMetric label="Checks" value={item.capabilityCount} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMMAND_CENTER_READINESS_CHECKS.map((check) => (
              <div key={check.key} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base font-semibold text-white">{check.label}</p>
                  <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
                    {check.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{check.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{check.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function CustomerOutputPolicyCard({ policy }: { policy: CustomerOutputApprovalPolicy }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{policy.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Output type: {policy.outputType}</p>
        </div>
        <span className="rounded-full border border-rose-200/20 bg-rose-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-100">
          {policy.defaultState}
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListCard title="Required reviews" items={policy.requiredReviews} />
        <ListCard title="Preview requirements" items={policy.previewRequirements} />
        <ListCard title="Block conditions" items={policy.blockConditions} />
        <ListCard title="Audit events" items={policy.auditEvents} />
      </div>
    </article>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function HistoryCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
