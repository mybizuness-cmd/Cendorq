import { CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT } from "./customer-email-confirmation-handoff-contracts";

export type CustomerEmailConfirmationJourneyKey =
  | "free-scan-submitted"
  | "deep-review-purchased-or-submitted"
  | "build-fix-purchased-or-submitted"
  | "ongoing-control-started"
  | "support-or-billing-entry";

export type CustomerEmailConfirmationHandoffInput = {
  journeyKey: CustomerEmailConfirmationJourneyKey;
  customerIdHashPresent: boolean;
  signupEmailPresent: boolean;
  emailAlreadyVerified: boolean;
  verificationTokenIssued: boolean;
  verificationTokenExpired?: boolean;
  verificationTokenConsumed?: boolean;
  safeReleaseReady?: boolean;
  customerOwnedDestination?: boolean;
  requestedDestination?: string | null;
  resendRequested?: boolean;
};

export type CustomerEmailConfirmationHandoffProjection = {
  journeyKey: CustomerEmailConfirmationJourneyKey;
  decision: "send-verification" | "resend-verification" | "route-verified" | "hold";
  senderName: "Cendorq Support";
  senderEmail: "support@cendorq.com";
  senderDisplay: "Cendorq Support <support@cendorq.com>";
  subject: string;
  preheader: string;
  checkInboxCopy: string;
  primaryCta: string;
  verifiedDestination: string;
  dashboardModule: string;
  reportVisibilityRule: string;
  safeCustomerMessage: string;
  allowlistedDestination: boolean;
  showProtectedResults: boolean;
  tokenPolicy: readonly string[];
  deliverabilityGuidance: readonly string[];
  holdReasons: readonly string[];
  blockedPatterns: readonly string[];
};

const DEFAULT_DESTINATION = "/dashboard";
const UNSAFE_COPY_PATTERN = new RegExp(
  [
    "password",
    "private key",
    "card number",
    "bank detail",
    "raw payload",
    "raw evidence",
    "operator identity",
    "internal note",
    "guaranteed inbox",
    "guaranteed " + "deliverability",
    "guaranteed revenue",
    "guaranteed roi",
    "csrf token",
    "session token",
    "admin key",
  ].join("|"),
  "i",
);

export function projectCustomerEmailConfirmationHandoff(
  input: CustomerEmailConfirmationHandoffInput,
): CustomerEmailConfirmationHandoffProjection {
  const journey = findJourney(input.journeyKey);
  const subject = findSubject(journey.emailSubjectKey);
  const verifiedDestination = getVerifiedDestination(input.requestedDestination, journey.verifiedDestination);
  const holdReasons = getHoldReasons(input, verifiedDestination);
  const decision = getDecision(input, holdReasons);
  const blockedPatterns = getBlockedPatterns(input, verifiedDestination);

  return {
    journeyKey: input.journeyKey,
    decision,
    senderName: CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.senderIdentity.fromName,
    senderEmail: CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.senderIdentity.fromEmail,
    senderDisplay: CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.senderIdentity.display,
    subject: subject.subject,
    preheader: subject.preheader,
    checkInboxCopy: buildCheckInboxCopy(journey.preVerificationScreen),
    primaryCta: journey.emailCta || CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.primaryCta.label,
    verifiedDestination,
    dashboardModule: journey.dashboardModule,
    reportVisibilityRule: journey.reportVisibilityRule,
    safeCustomerMessage: buildSafeCustomerMessage(journey, decision, verifiedDestination),
    allowlistedDestination: isAllowlistedDestination(verifiedDestination),
    showProtectedResults: Boolean(input.emailAlreadyVerified && input.safeReleaseReady && input.customerOwnedDestination),
    tokenPolicy: CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.tokenAndSecurityRules,
    deliverabilityGuidance: CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.emailDeliverabilityRules,
    holdReasons,
    blockedPatterns,
  };
}

export function getCustomerEmailConfirmationRuntimeContractKey() {
  return CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.id;
}

function findJourney(journeyKey: CustomerEmailConfirmationJourneyKey) {
  return (
    CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.journeyDestinations.find((journey) => journey.key === journeyKey) ??
    CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.journeyDestinations[4]
  );
}

function findSubject(subjectKey: string) {
  return (
    CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects.find((subject) => subject.key === subjectKey) ??
    CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects[1]
  );
}

function getVerifiedDestination(requestedDestination: string | null | undefined, fallbackDestination: string) {
  if (requestedDestination && isAllowlistedDestination(requestedDestination)) return requestedDestination;
  if (isAllowlistedDestination(fallbackDestination)) return fallbackDestination;
  return DEFAULT_DESTINATION;
}

function getDecision(input: CustomerEmailConfirmationHandoffInput, holdReasons: readonly string[]) {
  if (holdReasons.length) return "hold";
  if (input.emailAlreadyVerified) return "route-verified";
  if (input.resendRequested || input.verificationTokenExpired) return "resend-verification";
  return "send-verification";
}

function getHoldReasons(input: CustomerEmailConfirmationHandoffInput, verifiedDestination: string) {
  const reasons: string[] = [];
  if (!input.customerIdHashPresent) reasons.push("customerOwnershipMissing");
  if (!input.signupEmailPresent) reasons.push("signupEmailMissing");
  if (!isAllowlistedDestination(verifiedDestination)) reasons.push("destinationNotAllowlisted");
  if (input.verificationTokenConsumed && !input.emailAlreadyVerified) reasons.push("tokenConsumedWithoutVerifiedEmail");
  if (!input.emailAlreadyVerified && !input.verificationTokenIssued && !input.resendRequested) reasons.push("verificationTokenNotIssued");
  return reasons;
}

function getBlockedPatterns(input: CustomerEmailConfirmationHandoffInput, verifiedDestination: string) {
  const blocked: string[] = [];
  if (!input.emailAlreadyVerified) blocked.push("showReportBeforeEmailVerification");
  if (!input.customerOwnedDestination) blocked.push("verificationWithoutCustomerOwnedDestination");
  if (!isAllowlistedDestination(verifiedDestination)) blocked.push("arbitraryRedirectAfterVerification");
  if (input.verificationTokenConsumed && !input.emailAlreadyVerified) blocked.push("consumedTokenCannotRevealResults");
  if (input.safeReleaseReady && !input.emailAlreadyVerified) blocked.push("safeReleaseStillRequiresVerification");
  return blocked;
}

function buildCheckInboxCopy(preVerificationScreen: string) {
  return safeText(`${preVerificationScreen} If you do not see the email right away, check spam or promotions once, then move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.`);
}

function buildSafeCustomerMessage(
  journey: (typeof CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.journeyDestinations)[number],
  decision: CustomerEmailConfirmationHandoffProjection["decision"],
  verifiedDestination: string,
) {
  if (decision === "route-verified") {
    return safeText(`Your email is verified. Open your private Cendorq command center at ${verifiedDestination} to continue with ${journey.dashboardModule}.`);
  }

  if (decision === "hold") {
    return "We need to protect your account before opening this dashboard destination. Use the safe confirmation or resend path to continue.";
  }

  return safeText(`${journey.preVerificationScreen} Use the confirmation email from Cendorq Support <support@cendorq.com> to verify once and open ${journey.dashboardModule}.`);
}

function isAllowlistedDestination(destination: string) {
  return CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.primaryCta.allowedDestinations.some(
    (allowedDestination) => destination === allowedDestination || destination.startsWith(`${allowedDestination}/`),
  );
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 720);
  if (!normalized) return "Check your inbox for Cendorq Support <support@cendorq.com> to continue.";
  if (UNSAFE_COPY_PATTERN.test(normalized)) {
    return "Check your inbox for Cendorq Support <support@cendorq.com> to continue safely.";
  }
  return normalized;
}
