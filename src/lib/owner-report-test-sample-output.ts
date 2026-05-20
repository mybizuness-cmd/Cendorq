import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS } from "./owner-report-test-preview-rendering";
import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportTestSampleOutput = {
  planKey: OwnerReportTestPlanKey;
  title: string;
  watermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY";
  sampleCompany: string;
  sampleUrl: string;
  reportSections: readonly {
    heading: string;
    purpose: string;
    visual: string;
    customerSafePreview: string;
  }[];
  operatorTrace: readonly {
    role: "agent" | "chief" | "release-captain";
    action: string;
    visibleInOwnerTest: true;
    visibleToCustomer: false;
  }[];
  safety: {
    checkoutRequired: false;
    customerDeliveryApproved: false;
    billingMutationAllowed: false;
    entitlementMutationAllowed: false;
    rawEvidenceReturned: false;
  };
};

export const OWNER_REPORT_TEST_SAMPLE_OUTPUTS = OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.map((blueprint): OwnerReportTestSampleOutput => ({
  planKey: blueprint.planKey,
  title: blueprint.title,
  watermark: blueprint.previewWatermark,
  sampleCompany: "Example Public Company",
  sampleUrl: "https://example.com",
  reportSections: [
    {
      heading: "Executive signal",
      purpose: "Show the top-level business readability and trust posture in plain language.",
      visual: blueprint.visualStandard[0] ?? "premium summary card",
      customerSafePreview: "This section explains what appears strong, unclear, risky, or ready for the next command using public evidence only.",
    },
    {
      heading: "Proof and confidence",
      purpose: "Separate observed public facts, assumptions, inferences, confidence, and limitations.",
      visual: "evidence and confidence grid",
      customerSafePreview: "This section teaches what is known, what is inferred, and what still needs confirmation.",
    },
    {
      heading: "Next command",
      purpose: "Give one plan-appropriate next action without unsupported guarantees or pressure.",
      visual: "next-command board",
      customerSafePreview: "This section tells the owner what to inspect, improve, or monitor next.",
    },
  ],
  operatorTrace: [
    { role: "agent", action: blueprint.operatorTrace[0] ?? "public evidence scan", visibleInOwnerTest: true, visibleToCustomer: false },
    { role: "chief", action: blueprint.chiefCaptainReview[0] ?? "truth separation review", visibleInOwnerTest: true, visibleToCustomer: false },
    { role: "release-captain", action: "customer-safe projection not approved for delivery in test mode", visibleInOwnerTest: true, visibleToCustomer: false },
  ],
  safety: {
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceReturned: false,
  },
}));

export function getOwnerReportTestSampleOutput(planKey: OwnerReportTestPlanKey) {
  return OWNER_REPORT_TEST_SAMPLE_OUTPUTS.find((output) => output.planKey === planKey);
}
