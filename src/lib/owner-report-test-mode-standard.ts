export type OwnerReportTestPlanKey = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

export type OwnerReportTestModeInput = {
  companyName: string;
  companyUrl: string;
  requestedPlans: readonly OwnerReportTestPlanKey[];
  ownerAccessVerified: boolean;
};

export type OwnerReportTestModeProjection = {
  ok: boolean;
  mode: "owner-only-report-test-mode";
  companyName: string;
  companyUrl: string;
  checkoutRequired: false;
  customerEntitlementCreated: false;
  customerEmailSent: false;
  customerRecordCreated: false;
  allowedPlans: readonly OwnerReportTestPlanKey[];
  reportPreviewRequirements: readonly string[];
  operatorTraceRequirements: readonly string[];
  safety: {
    ownerOnly: true;
    noCustomerDelivery: true;
    noBillingMutation: true;
    noEntitlementMutation: true;
    noPublicIndexing: true;
    testWatermarkRequired: true;
    rawSecretsAllowed: false;
    privateCredentialsAllowed: false;
  };
};

export const OWNER_REPORT_TEST_MODE_STANDARD = [
  "Owner test mode must allow the owner to run Free Scan, Deep Review, Build Fix, and Ongoing Control report previews without checkout.",
  "Owner test mode must never create a paid customer entitlement, send a customer email, mutate billing, or mark delivery complete.",
  "Owner test mode must accept real public company URLs for testing while avoiding private credentials, private keys, account logins, or non-public data.",
  "Every test report must be clearly watermarked as owner test mode and excluded from customer delivery metrics.",
  "Every test report must show visual structure, report sections, confidence, evidence classes, limitations, next command, and plan boundary.",
  "Every test report must include an operator trace showing agent findings, chief review posture, release-captain gate posture, blocked claims, and why the output is or is not customer-safe.",
  "Test mode output can evaluate public company surfaces, but it must not claim certainty beyond available public evidence.",
  "Test mode exists to inspect report quality, visual quality, agent quality, review gates, and plan-specific value before production customer delivery.",
] as const;

export function projectOwnerReportTestMode(input: OwnerReportTestModeInput): OwnerReportTestModeProjection {
  const allowedPlans = input.ownerAccessVerified ? normalizePlans(input.requestedPlans) : [];
  return {
    ok: input.ownerAccessVerified && allowedPlans.length > 0,
    mode: "owner-only-report-test-mode",
    companyName: cleanLabel(input.companyName),
    companyUrl: cleanUrl(input.companyUrl),
    checkoutRequired: false,
    customerEntitlementCreated: false,
    customerEmailSent: false,
    customerRecordCreated: false,
    allowedPlans,
    reportPreviewRequirements: [
      "owner-test watermark",
      "plan-specific cover section",
      "Signal, Proof, Risk, Limit, Next command structure",
      "visual report hierarchy for web and PDF review",
      "evidence class and confidence labeling",
      "plan boundary and non-delivery disclaimer",
    ],
    operatorTraceRequirements: [
      "agent mission summary",
      "finding evidence class",
      "chief review posture",
      "release-captain gate posture",
      "blocked claim scan result",
      "customer-safe projection readiness",
    ],
    safety: {
      ownerOnly: true,
      noCustomerDelivery: true,
      noBillingMutation: true,
      noEntitlementMutation: true,
      noPublicIndexing: true,
      testWatermarkRequired: true,
      rawSecretsAllowed: false,
      privateCredentialsAllowed: false,
    },
  };
}

function normalizePlans(values: readonly OwnerReportTestPlanKey[]) {
  const allowed = new Set<OwnerReportTestPlanKey>(["free-scan", "deep-review", "build-fix", "ongoing-control"]);
  return Array.from(new Set(values.filter((value): value is OwnerReportTestPlanKey => allowed.has(value))));
}

function cleanLabel(value: string) {
  return value.replace(/[^a-zA-Z0-9 .,&'_-]/g, "").replace(/\s+/g, " ").trim().slice(0, 120);
}

function cleanUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString().slice(0, 260);
  } catch {
    return "";
  }
}
