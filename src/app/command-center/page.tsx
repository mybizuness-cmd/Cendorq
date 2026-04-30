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
import { ClosedCommandCenterPanel } from "./closed-command-center-panel";
import { CommandCenterHeroPanel } from "./command-center-hero-panel";
import { CommandCenterOperatingMap } from "./command-center-operating-map";
import { CustomerOutputApprovalPanel } from "./customer-output-approval-panel";
import { CommandCenterPanelIndex } from "./panel-index";
import { ModuleRoadmapPanel } from "./module-roadmap-panel";
import { OperatorControlInterfacePanel } from "./operator-control-interface-panel";
import { OperatorReadinessMatrix } from "./operator-readiness-matrix";
import { OptimizationLibraryPanel } from "./optimization-library-panel";
import { PlanControlPanel } from "./plan-control-panel";
import { PlatformLaunchReadinessPanel } from "./platform-launch-readiness-panel";
import { ProductionLaunchChecklistPanel } from "./production-launch-checklist-panel";
import { ProductionLaunchFinalBlockerPanel } from "./production-launch-final-blocker-panel";
import { ReadinessChecklistPanel } from "./readiness-checklist-panel";
import { ReportTruthMethodologyPanel } from "./report-truth-methodology-panel";
import { SecurityPosturePanel } from "./security-posture-panel";
import { TestRecordClassesPanel } from "./test-record-classes-panel";
import { ValidationRegistryPanel } from "./validation-registry-panel";

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

  if (!accessState.allowed) return <ClosedCommandCenterPanel />;

  const foundation = getCommandCenterReadinessSummary();
  const aiCommands = getAiManagerCommandPolicies();
  const aiHistory = getAiManagerCommandHistoryPolicy();
  const planControls = getCommandCenterPlanControls();
  const optimizationMethods = getOptimizationMethodLibrary();
  const customerOutputPolicies = getCustomerOutputApprovalPolicies();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <CommandCenterHeroPanel foundation={foundation} />
        <CommandCenterOperatingMap />
        <SecurityPosturePanel />
        <OperatorControlInterfacePanel />
        <PlatformLaunchReadinessPanel />
        <ProductionLaunchChecklistPanel />
        <ProductionLaunchFinalBlockerPanel />
        <OperatorReadinessMatrix />
        <CommandCenterPanelIndex />
        <ValidationRegistryPanel />
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
