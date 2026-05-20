import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportTerminalTestCommand = {
  commandId: string;
  route: "/api/command-center/owner-report-test-mode";
  method: "POST";
  acceptedInput: "public-company-url-only";
  companyName: string;
  companyUrl: string;
  requestedPlans: readonly OwnerReportTestPlanKey[];
  requiresCommandCenterAccess: true;
  bypassesCheckoutForOwnerTestOnly: true;
  customerDeliveryApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export type OwnerReportTerminalTestCommandProjection = {
  ok: boolean;
  command: OwnerReportTerminalTestCommand;
  curlPreview: string;
  uiRoute: "/command-center/owner-report-test";
  backendRoute: "/api/command-center/owner-report-test-mode";
  safety: {
    ownerOnly: true;
    publicUrlOnly: true;
    noCheckout: true;
    noCustomerDelivery: true;
    noBillingMutation: true;
    noEntitlementMutation: true;
  };
};

const DEFAULT_PLANS: readonly OwnerReportTestPlanKey[] = ["free-scan", "deep-review", "build-fix", "ongoing-control"];

export const OWNER_REPORT_TERMINAL_TEST_COMMAND_STANDARD = [
  "Owner can run tests through Command Center UI or backend terminal/API command.",
  "Terminal tests must use public company URL input only.",
  "Terminal tests must bypass checkout only for owner test mode and must not mutate customer delivery, billing, or entitlements.",
  "Terminal output should expose safety, acquisition, findings, preview packages, sample outputs, and release-gate posture.",
] as const;

export function buildOwnerReportTerminalTestCommand(input: {
  companyName: string;
  companyUrl: string;
  requestedPlans?: readonly OwnerReportTestPlanKey[];
}): OwnerReportTerminalTestCommandProjection {
  const requestedPlans: readonly OwnerReportTestPlanKey[] = input.requestedPlans?.length ? input.requestedPlans : DEFAULT_PLANS;
  const command: OwnerReportTerminalTestCommand = {
    commandId: `owner-terminal-test-${hash(`${input.companyName}:${input.companyUrl}:${requestedPlans.join("|")}`)}`,
    route: "/api/command-center/owner-report-test-mode",
    method: "POST",
    acceptedInput: "public-company-url-only",
    companyName: safe(input.companyName) || "Example Public Company",
    companyUrl: safe(input.companyUrl) || "https://example.com",
    requestedPlans,
    requiresCommandCenterAccess: true,
    bypassesCheckoutForOwnerTestOnly: true,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };

  return {
    ok: true,
    command,
    curlPreview: buildCurlPreview(command),
    uiRoute: "/command-center/owner-report-test",
    backendRoute: "/api/command-center/owner-report-test-mode",
    safety: {
      ownerOnly: true,
      publicUrlOnly: true,
      noCheckout: true,
      noCustomerDelivery: true,
      noBillingMutation: true,
      noEntitlementMutation: true,
    },
  };
}

function buildCurlPreview(command: OwnerReportTerminalTestCommand) {
  const payload = JSON.stringify({ companyName: command.companyName, companyUrl: command.companyUrl, requestedPlans: command.requestedPlans });
  return `curl -X POST /api/command-center/owner-report-test-mode -H 'Content-Type: application/json' -d '${payload}'`;
}

function safe(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 180);
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) result = (result * 31 + value.charCodeAt(index)) >>> 0;
  return result.toString(16).padStart(8, "0");
}
