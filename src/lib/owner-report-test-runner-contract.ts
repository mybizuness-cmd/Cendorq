import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportTestRunnerState = {
  mode: "owner-report-test-runner";
  input: {
    companyName: string;
    companyUrl: string;
    requestedPlans: readonly OwnerReportTestPlanKey[];
  };
  execution: {
    checkoutRequired: false;
    customerDeliveryAllowed: false;
    billingMutationAllowed: false;
    entitlementMutationAllowed: false;
    publicCompanyUrlOnly: true;
    ownerAccessRequired: true;
  };
  output: {
    previewBlueprintsRequired: true;
    sampleOutputsRequired: true;
    agentTraceRequired: true;
    chiefReviewRequired: true;
    releaseCaptainGateRequired: true;
    visualReportStructureRequired: true;
  };
};

export const OWNER_REPORT_TEST_RUNNER_CONTRACT = {
  mode: "owner-report-test-runner",
  purpose: "Allow the owner to run public-company report previews for every Cendorq plan without checkout, billing mutation, entitlement creation, customer delivery, or customer email.",
  acceptedInputs: ["companyName", "companyUrl", "requestedPlans"],
  defaultPlans: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
  blockedInputs: ["password", "private key", "session token", "raw provider payload", "non-public customer data", "card data", "bank data"],
  requiredOutputs: ["previewBlueprints", "sampleOutputs", "operatorTrace", "chiefReview", "releaseCaptainGate", "visualReportStructure", "watermark"],
  safety: {
    checkoutRequired: false,
    customerDeliveryAllowed: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailAllowed: false,
    reportReleaseAllowed: false,
    ownerAccessRequired: true,
    noindexRequired: true,
  },
} as const;

export function buildOwnerReportTestRunnerState(input: {
  companyName: string;
  companyUrl: string;
  requestedPlans?: readonly OwnerReportTestPlanKey[];
}): OwnerReportTestRunnerState {
  return {
    mode: "owner-report-test-runner",
    input: {
      companyName: clean(input.companyName, 120),
      companyUrl: clean(input.companyUrl, 260),
      requestedPlans: input.requestedPlans?.length ? input.requestedPlans : OWNER_REPORT_TEST_RUNNER_CONTRACT.defaultPlans,
    },
    execution: {
      checkoutRequired: false,
      customerDeliveryAllowed: false,
      billingMutationAllowed: false,
      entitlementMutationAllowed: false,
      publicCompanyUrlOnly: true,
      ownerAccessRequired: true,
    },
    output: {
      previewBlueprintsRequired: true,
      sampleOutputsRequired: true,
      agentTraceRequired: true,
      chiefReviewRequired: true,
      releaseCaptainGateRequired: true,
      visualReportStructureRequired: true,
    },
  };
}

function clean(value: string, max: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
