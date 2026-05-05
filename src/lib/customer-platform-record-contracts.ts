export type CustomerAccountStatus = "pending-email-confirmation" | "active" | "locked" | "disabled" | "deleted";
export type CustomerAuthProvider = "email-password" | "google" | "microsoft" | "apple" | "magic-link";
export type CustomerRiskLevel = "low" | "medium" | "high" | "critical";
export type CustomerSessionStatus = "active" | "reauth-required" | "revoked" | "expired" | "locked";
export type CustomerSecurityEventOutcome = "allowed" | "challenged" | "blocked" | "quarantined" | "locked" | "revoked" | "review-required";
export type CustomerPlanKey = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";
export type CustomerEntitlementStatus = "active" | "trialing" | "past-due" | "canceled" | "revoked" | "pending";

export type CustomerAccountRecordContract = {
  recordType: "customer-account";
  customerId: string;
  primaryEmailHash: string;
  emailVerified: boolean;
  status: CustomerAccountStatus;
  authProviders: readonly CustomerAuthProvider[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  welcomeEmailSentAt?: string;
  deletedAt?: string;
  retentionClass: "customer-account" | "delete-requested" | "legal-hold";
};

export type CustomerEmailConfirmationRecordContract = {
  recordType: "customer-email-confirmation";
  confirmationId: string;
  customerId: string;
  emailHash: string;
  tokenHash: string;
  requestedAt: string;
  expiresAt: string;
  consumedAt?: string;
  resendCount: number;
  lastResentAt?: string;
  status: "pending" | "consumed" | "expired" | "revoked";
  redirectPath: "/free-check" | "/dashboard";
};

export type CustomerTrustedDeviceRecordContract = {
  recordType: "customer-trusted-device";
  deviceId: string;
  customerId: string;
  deviceFingerprintHash: string;
  trustStatus: "untrusted" | "trusted" | "challenge-required" | "revoked";
  firstSeenAt: string;
  lastSeenAt: string;
  lastRiskLevel: CustomerRiskLevel;
  revokedAt?: string;
  riskPosture: "risk-based";
};

export type CustomerSessionRecordContract = {
  recordType: "customer-session";
  sessionId: string;
  customerId: string;
  deviceId?: string;
  status: CustomerSessionStatus;
  createdAt: string;
  expiresAt: string;
  lastSeenAt: string;
  rotatedAt?: string;
  revokedAt?: string;
  riskLevel: CustomerRiskLevel;
  riskPosture: "risk-based";
  reauthRequiredFor: readonly string[];
};

export type CustomerDashboardAccessRecordContract = {
  recordType: "customer-dashboard-access";
  accessId: string;
  customerId: string;
  businessIds: readonly string[];
  planKey: CustomerPlanKey;
  allowedRoutes: readonly string[];
  emailVerifiedRequired: true;
  objectOwnershipRequired: true;
  propertyAllowlistRequired: true;
  lastAuthorizedAt?: string;
};

export type CustomerBillingEntitlementRecordContract = {
  recordType: "customer-billing-entitlement";
  entitlementId: string;
  customerId: string;
  businessId?: string;
  planKey: CustomerPlanKey;
  status: CustomerEntitlementStatus;
  billingCustomerIdHash?: string;
  subscriptionIdHash?: string;
  currentPeriodEndsAt?: string;
  invoiceAccessEnabled: boolean;
  checkoutState: "not-started" | "started" | "completed" | "expired" | "failed";
  updatedAt: string;
};

export type CustomerSecurityEventRecordContract = {
  recordType: "customer-security-event";
  eventId: string;
  customerId?: string;
  sessionId?: string;
  deviceId?: string;
  eventType: string;
  riskLevel: CustomerRiskLevel;
  riskPosture: "risk-based";
  outcome: CustomerSecurityEventOutcome;
  occurredAt: string;
  safeMetadataOnly: true;
  rawPayloadStored: false;
  operatorReviewRequired: boolean;
};

export type HostileInputRecordContract = {
  recordType: "hostile-input";
  hostileInputId: string;
  customerId?: string;
  sourceRoute: string;
  category: string;
  decision: "sanitize" | "challenge" | "block" | "quarantine";
  occurredAt: string;
  safeSummary: string;
  rawPayloadStored: false;
  downstreamProcessingAllowed: false;
  operatorReviewRequired: boolean;
};

export type CustomerLockoutRecoveryRecordContract = {
  recordType: "customer-lockout-recovery";
  lockoutId: string;
  customerId: string;
  reason: "credential-risk" | "compromised-device" | "hostile-input" | "billing-abuse" | "operator-action" | "unknown-high-risk";
  lockedAt: string;
  unlockStatus: "locked" | "reviewing" | "restored" | "disabled";
  reauthRequired: true;
  tokenRevocationRequired: true;
  supportPathRequired: true;
  restoredAt?: string;
  operatorReviewId?: string;
};

export const CUSTOMER_PLATFORM_RECORD_CONTRACTS = [
  "customer-account",
  "customer-email-confirmation",
  "customer-trusted-device",
  "customer-session",
  "customer-dashboard-access",
  "customer-billing-entitlement",
  "customer-security-event",
  "hostile-input",
  "customer-lockout-recovery",
] as const;

export const CUSTOMER_PLATFORM_RECORD_GUARDS = [
  "no dashboard access without verified email",
  "no customer object access without object ownership",
  "no billing access without entitlement",
  "no raw hostile input payload storage",
  "no raw security event payload storage",
  "no unsafe redirect after email confirmation",
  "no welcome email duplication",
  "no trusted device without challenge path",
  "no risky session without reauthentication, rotation, revocation, or lockout path",
  "risk-based device, session, and security-event posture required",
] as const;

export function getCustomerPlatformRecordContracts() {
  return {
    contracts: CUSTOMER_PLATFORM_RECORD_CONTRACTS,
    guards: CUSTOMER_PLATFORM_RECORD_GUARDS,
  };
}
