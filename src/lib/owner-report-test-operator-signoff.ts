export type OwnerReportTestOperatorSignoffRole = "operator" | "chief" | "captain" | "release-review";

export type OwnerReportTestOperatorSignoff = {
  role: OwnerReportTestOperatorSignoffRole;
  status: "signed-off-for-owner-preview";
  requiredBeforeCustomerRelease: true;
  signedForOwnerTestOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export type OwnerReportTestOperatorSignoffSet = {
  signoffId: string;
  status: "owner-preview-signed-off";
  signoffs: readonly OwnerReportTestOperatorSignoff[];
  ownerOnly: true;
  previewOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

const ROLES: readonly OwnerReportTestOperatorSignoffRole[] = ["operator", "chief", "captain", "release-review"];

export const OWNER_REPORT_TEST_OPERATOR_SIGNOFF_STANDARD = [
  "Owner report test output must show operator, chief, captain, and release-review signoff for owner preview only.",
  "Signoff is required before any future customer release path but does not approve customer release itself.",
  "Signoff must not approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestOperatorSignoffSet(): OwnerReportTestOperatorSignoffSet {
  return {
    signoffId: `owner-report-test-signoff-${ROLES.length}`,
    status: "owner-preview-signed-off",
    signoffs: ROLES.map((role) => ({
      role,
      status: "signed-off-for-owner-preview",
      requiredBeforeCustomerRelease: true,
      signedForOwnerTestOnly: true,
      customerDeliveryApproved: false,
      reportReleaseApproved: false,
      billingMutationAllowed: false,
      entitlementMutationAllowed: false,
    })),
    ownerOnly: true,
    previewOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
