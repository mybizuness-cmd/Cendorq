import type { Metadata } from "next";
import { headers } from "next/headers";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getAiManagerCommandHistoryPolicy } from "@/lib/command-center/ai-manager-command-history";
import { getAiManagerCommandPolicies } from "@/lib/command-center/ai-manager-command-queue";
import { getCustomerOutputApprovalPolicies } from "@/lib/command-center/customer-output-approval";
import { getOptimizationMethodLibrary } from "@/lib/command-center/optimization-method-library";
import { getCommandCenterPlanControls } from "@/lib/command-center/plan-control";
import { getCommandCenterReadinessSummary } from "@/lib/command-center/readiness-summary";

import { AiHistoryPanel } from "./ai-history-panel";
import { AiManagerCommandPanel } from "./ai-manager-command-panel";
import { AiManagerVersionRegistryPanel } from "./ai-manager-version-registry-panel";
import { BenchmarkEvidencePanel } from "./benchmark-evidence-panel";
import { BenchmarkIntelligencePanel } from "./benchmark-intelligence-panel";
import { CommandCenterOperatingMap } from "./command-center-operating-map";
import { CustomerOutputApprovalPanel } from "./customer-output-approval-panel";
import { CommandCenterPanelIndex } from "./panel-index";
import { ModuleRoadmapPanel } from "./module-roadmap-panel";
import { OperatorReadinessMatrix } from "./operator-readiness-matrix";
import { OptimizationLibraryPanel } from "./optimization-library-panel";
import { PlanControlPanel } from "./plan-control-panel";
import { ReadinessChecklistPanel } from "./readiness-checklist-panel";
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
        <CustomerOutputApprovalPanel policies={customerOutputPolicies} />
        <BenchmarkIntelligencePanel />
        <BenchmarkEvidencePanel />
        <ReportTruthMethodologyPanel />
        <AiManagerVersionRegistryPanel />
        <TestRecordClassesPanel />
        <AiManagerCommandPanel commands={aiCommands} />
        <AiHistoryPanel history={aiHistory} />
        <ReadinessChecklistPanel foundation={foundation} />
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
