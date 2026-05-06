import type { Metadata } from "next";
import { headers } from "next/headers";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getAiManagerCommandHistoryPolicy } from "@/lib/command-center/ai-manager-command-history";
import { getAiManagerCommandPolicies } from "@/lib/command-center/ai-manager-command-queue";
import { getCustomerOutputApprovalPolicies } from "@/lib/command-center/customer-output-approval";
import { COMMAND_CENTER_MODULES } from "@/lib/command-center/modules";
import { getOptimizationMethodLibrary } from "@/lib/command-center/optimization-method-library";
import { getCommandCenterPlanControls } from "@/lib/command-center/plan-control";
import { COMMAND_CENTER_READINESS_CHECKS } from "@/lib/command-center/readiness";
import { getCommandCenterReadinessSummary } from "@/lib/command-center/readiness-summary";

import { AdminCommandCenterControlPanel } from "./admin-command-center-control-panel";
import { AgentOperatingSystemPanel } from "./agent-operating-system-panel";
import { AiHistoryPanel } from "./ai-history-panel";
import { AiManagerCommandPanel } from "./ai-manager-command-panel";
import { AiManagerVersionRegistryPanel } from "./ai-manager-version-registry-panel";
import { BenchmarkEvidencePanel } from "./benchmark-evidence-panel";
import { BenchmarkIntelligencePanel } from "./benchmark-intelligence-panel";
import { ClosedCommandCenterPanel } from "./closed-command-center-panel";
import { CommandCenterHeroPanel } from "./command-center-hero-panel";
import { CommandCenterOperatingMap } from "./command-center-operating-map";
import { CustomerOutputApprovalPanel } from "./customer-output-approval-panel";
import { CommandCenterPanelIndex } from "./panel-index";
import { LaunchEvidencePanel } from "./launch-evidence-panel";
import { ModuleRoadmapPanel } from "./module-roadmap-panel";
import { OperatorControlInterfacePanel } from "./operator-control-interface-panel";
import { OperatorReadinessMatrix } from "./operator-readiness-matrix";
import { OptimizationLibraryPanel } from "./optimization-library-panel";
import { OwnerConfigurationEvidencePanel } from "./owner-configuration-evidence-panel";
import { OwnerConfigurationWorkflowPanel } from "./owner-configuration-workflow-panel";
import { PaidReportDeliveryOpsPanel } from "./paid-report-delivery-ops-panel";
import { PlanControlPanel } from "./plan-control-panel";
import { PlanDeliveryOrchestrationPanel } from "./plan-delivery-orchestration-panel";
import { PlanRoutingRuntimePanel } from "./plan-routing-runtime-panel";
import { PlatformLaunchReadinessPanel } from "./platform-launch-readiness-panel";
import { ProductionLaunchChecklistPanel } from "./production-launch-checklist-panel";
import { ProductionLaunchFinalBlockerPanel } from "./production-launch-final-blocker-panel";
import { ProductionSmokeTargetPanel } from "./production-smoke-target-panel";
import { ReadinessChecklistPanel } from "./readiness-checklist-panel";
import { ReportEvidenceOrchestrationPanel } from "./report-evidence-orchestration-panel";
import { ReportEvidenceRecordPanel } from "./report-evidence-record-panel";
import { ReportTruthMethodologyPanel } from "./report-truth-methodology-panel";
import { SecurityPosturePanel } from "./security-posture-panel";
import { TestRecordClassesPanel } from "./test-record-classes-panel";
import { ValidationRegistryPanel } from "./validation-registry-panel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Private Command Center | Cendorq",
  description: "Private Cendorq operating layer. Closed by default. No customer records or private intelligence are exposed until authentication, database, and production access controls are configured.",
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

  if (!accessState.allowed) return <ClosedCommandCenterPanel />;

  const foundation = getCommandCenterReadinessSummary();
  const aiCommands = getAiManagerCommandPolicies();
  const aiHistory = getAiManagerCommandHistoryPolicy();
  const planControls = getCommandCenterPlanControls();
  const optimizationMethods = getOptimizationMethodLibrary();
  const customerOutputPolicies = getCustomerOutputApprovalPolicies();
  const moduleCount = COMMAND_CENTER_MODULES.length;
  const readinessCheckCount = COMMAND_CENTER_READINESS_CHECKS.length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="sr-only">
          Private Command Center. Closed by default. No customer records or private intelligence are exposed from this server-rendered shell; COMMAND_CENTER_MODULES and COMMAND_CENTER_READINESS_CHECKS stay synchronized before access controls are configured. Current private module count: {moduleCount}. Current private readiness check count: {readinessCheckCount}.
        </p>
        <CommandCenterHeroPanel foundation={foundation} />
        <CommandCenterOperatingMap />
        <SecurityPosturePanel />
        <OperatorControlInterfacePanel />
        <AdminCommandCenterControlPanel />
        <PlatformLaunchReadinessPanel />
        <ProductionLaunchChecklistPanel />
        <ProductionLaunchFinalBlockerPanel />
        <LaunchEvidencePanel />
        <ProductionSmokeTargetPanel />
        <AgentOperatingSystemPanel />
        <OwnerConfigurationEvidencePanel />
        <OwnerConfigurationWorkflowPanel />
        <OperatorReadinessMatrix />
        <CommandCenterPanelIndex />
        <ValidationRegistryPanel />
        <ModuleRoadmapPanel />
        <PlanControlPanel plans={planControls} />
        <PlanDeliveryOrchestrationPanel />
        <PlanRoutingRuntimePanel />
        <PaidReportDeliveryOpsPanel />
        <OptimizationLibraryPanel methods={optimizationMethods} />
        <CustomerOutputApprovalPanel policies={customerOutputPolicies} />
        <BenchmarkIntelligencePanel />
        <BenchmarkEvidencePanel />
        <ReportTruthMethodologyPanel />
        <ReportEvidenceOrchestrationPanel />
        <ReportEvidenceRecordPanel />
        <AiManagerVersionRegistryPanel />
        <TestRecordClassesPanel />
        <AiManagerCommandPanel commands={aiCommands} />
        <AiHistoryPanel history={aiHistory} />
        <ReadinessChecklistPanel foundation={foundation} />
      </section>
    </main>
  );
}
