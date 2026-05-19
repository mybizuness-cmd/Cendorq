export type OwnerReportTestGetDiscoveryEvaluation = {
  score: number;
  status: "pass" | "blocked";
  requiredKeys: readonly string[];
  missingKeys: readonly string[];
  ownerOnly: true;
  checkoutRequired: false;
  customerDeliveryAllowed: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

const REQUIRED_GET_KEYS = [
  "terminalRunbook",
  "apiResponseContract",
  "resultReviewContract",
  "fixtureBatch",
  "batchManifest",
  "fixtureCommands",
  "blueprints",
  "sampleOutputs",
] as const;

export const OWNER_REPORT_TEST_GET_DISCOVERY_STANDARD = [
  "GET discovery must expose the owner terminal runbook, API response contract, result review contract, fixture batch, batch manifest, fixture commands, preview blueprints, and sample outputs.",
  "GET discovery remains owner-only and must not require checkout or allow customer delivery.",
  "GET discovery is for backend terminal/API and Command Center review readiness.",
] as const;

export function evaluateOwnerReportTestGetDiscovery(response: Record<string, unknown>): OwnerReportTestGetDiscoveryEvaluation {
  const missingKeys = REQUIRED_GET_KEYS.filter((key) => !(key in response));
  const score = Math.round(((REQUIRED_GET_KEYS.length - missingKeys.length) / REQUIRED_GET_KEYS.length) * 100);

  return {
    score,
    status: missingKeys.length === 0 ? "pass" : "blocked",
    requiredKeys: REQUIRED_GET_KEYS,
    missingKeys,
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryAllowed: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
