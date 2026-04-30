import { projectPlatformLaunchReadiness, type PlatformLaunchReadinessInput } from "./platform-launch-readiness-runtime";

export type ProductionLaunchChecklistItem = {
  key: string;
  label: string;
  status: "complete" | "blocked" | "needs-evidence";
  safeOwnerAction: string;
  releaseImpact: "blocks-public-launch" | "blocks-paid-launch" | "blocks-limited-launch" | "review-required";
};

export type ProductionLaunchChecklistProjection = {
  decision: string;
  safeSummary: string;
  checklist: readonly ProductionLaunchChecklistItem[];
  blockedLaunchReasons: readonly string[];
  readyCount: number;
  blockedCount: number;
  nextOperatorActions: readonly string[];
};

export function projectProductionLaunchChecklist(input: PlatformLaunchReadinessInput): ProductionLaunchChecklistProjection {
  const readiness = projectPlatformLaunchReadiness(input);
  const checklist: ProductionLaunchChecklistItem[] = [
    item("verified-main", "Latest main commit verified", input.verifiedMain, "Verify main before any release branch or production launch statement.", "blocks-public-launch"),
    item("route-validation", "Route validation wired and passing", Boolean(input.validateRoutesWired && input.validateRoutesPassing), "Run and record route validation before release review.", "blocks-public-launch"),
    item("vercel-green", "Vercel deployment green", input.vercelGreen, "Confirm a green Vercel deployment for the release pull request.", "blocks-limited-launch"),
    item("production-smoke", "Production smoke configured and passed", Boolean(input.productionSmokeConfigured && input.productionSmokePassed), "Configure and run production smoke without live privileged config, real payments, or production mutation.", "blocks-public-launch"),
    item("auth-provider", "Auth provider and server-only config ready", Boolean(input.authProviderConfigured && input.serverOnlySecretsConfigured), "Confirm provider configuration, server-only protected config, safe failure, and verified-email gates.", "blocks-public-launch"),
    item("payment-config", "Owner payment configuration ready", input.ownerPaymentConfigReady, "Confirm owner-provided payment links or provider checkout mapping before paid launch.", "blocks-paid-launch"),
    item("rollback-plan", "Rollback plan recorded", input.rollbackPlanReady, "Record rollback plan covering auth, billing, reports, support, and public conversion.", "blocks-public-launch"),
    item("audit-plan", "Audit plan recorded", input.auditPlanReady, "Record audit plan covering auth, support, billing, reports, operator actions, and maintenance.", "blocks-public-launch"),
    item("customer-handoffs", "Customer handoffs ready", input.customerHandoffsReady, "Confirm no customer journey dead ends and every surface has a safe next action.", "review-required"),
    item("reports-ready", "Reports and vault ready", input.reportsReady, "Confirm no pending-as-final reports, raw/internal rendering, or PDF/HTML drift.", "review-required"),
    item("billing-ready", "Billing and entitlement posture ready", input.billingReady, "Confirm checkout, webhook, entitlement, recovery, and support-safe billing posture.", "blocks-paid-launch"),
    item("support-command-center", "Support and command center ready", input.supportAndCommandCenterReady, "Confirm operator-only internal state, approval gates, and audit preservation.", "review-required"),
    item("controlled-maintenance", "Controlled maintenance ready", input.maintenanceReady, "Confirm no uncontrolled production mutation, agent drift, validation bypass, or missing rollback.", "review-required"),
  ];

  return {
    decision: readiness.decision,
    safeSummary: readiness.safeSummary,
    checklist,
    blockedLaunchReasons: checklist.filter((entry) => entry.status !== "complete").map((entry) => `${entry.key}: ${entry.safeOwnerAction}`),
    readyCount: checklist.filter((entry) => entry.status === "complete").length,
    blockedCount: checklist.filter((entry) => entry.status !== "complete").length,
    nextOperatorActions: readiness.safeNextActions,
  };
}

function item(key: string, label: string, ready: boolean | undefined, safeOwnerAction: string, releaseImpact: ProductionLaunchChecklistItem["releaseImpact"]): ProductionLaunchChecklistItem {
  return {
    key,
    label,
    status: ready ? "complete" : releaseImpact === "review-required" ? "needs-evidence" : "blocked",
    safeOwnerAction,
    releaseImpact,
  };
}
