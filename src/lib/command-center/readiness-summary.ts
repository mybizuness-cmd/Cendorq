import { getCommandCenterAuthReadiness } from "@/lib/command-center/auth-readiness";
import { getCommandCenterAutomationReadiness } from "@/lib/command-center/automation-readiness";
import { getCommandCenterBillingReadiness } from "@/lib/command-center/billing-readiness";
import { getCommandCenterDatabaseReadiness } from "@/lib/command-center/database-readiness";
import { getCommandCenterDeliveryReadiness } from "@/lib/command-center/delivery-readiness";
import { getCommandCenterFileStorageReadiness } from "@/lib/command-center/file-storage-readiness";
import { getCommandCenterGovernanceReadiness } from "@/lib/command-center/governance-readiness";
import { getCommandCenterIntelligenceReadiness } from "@/lib/command-center/intelligence-readiness";

export type CommandCenterReadinessArea =
  | "database"
  | "auth"
  | "files"
  | "billing"
  | "delivery"
  | "automation"
  | "governance"
  | "intelligence";

export type CommandCenterReadinessSummaryItem = {
  area: CommandCenterReadinessArea;
  configured: boolean;
  requiredCount: number;
  missingCount: number;
  scopeCount: number;
  capabilityCount: number;
};

export type CommandCenterReadinessSummary = {
  ready: boolean;
  totalAreas: number;
  configuredAreas: number;
  missingAreas: number;
  items: readonly CommandCenterReadinessSummaryItem[];
};

type ReadinessForSummary = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables?: readonly string[];
  protectedSchemaAreas?: readonly string[];
  requiredCapabilities?: readonly string[];
};

export function getCommandCenterReadinessSummary(env: NodeJS.ProcessEnv = process.env): CommandCenterReadinessSummary {
  const items: CommandCenterReadinessSummaryItem[] = [
    toSummaryItem("database", getCommandCenterDatabaseReadiness(env)),
    toSummaryItem("auth", getCommandCenterAuthReadiness(env)),
    toSummaryItem("files", getCommandCenterFileStorageReadiness(env)),
    toSummaryItem("billing", getCommandCenterBillingReadiness(env)),
    toSummaryItem("delivery", getCommandCenterDeliveryReadiness(env)),
    toSummaryItem("automation", getCommandCenterAutomationReadiness(env)),
    toSummaryItem("governance", getCommandCenterGovernanceReadiness(env)),
    toSummaryItem("intelligence", getCommandCenterIntelligenceReadiness(env)),
  ];

  const configuredAreas = items.filter((item) => item.configured).length;
  const missingAreas = items.length - configuredAreas;

  return {
    ready: missingAreas === 0,
    totalAreas: items.length,
    configuredAreas,
    missingAreas,
    items,
  };
}

function toSummaryItem(area: CommandCenterReadinessArea, readiness: ReadinessForSummary): CommandCenterReadinessSummaryItem {
  return {
    area,
    configured: readiness.configured,
    requiredCount: readiness.requiredServerConfig.length,
    missingCount: readiness.missingServerConfig.length,
    scopeCount: (readiness.protectedTables ?? readiness.protectedSchemaAreas ?? []).length,
    capabilityCount: (readiness.requiredCapabilities ?? []).length,
  };
}
