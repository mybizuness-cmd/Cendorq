import {
  CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS,
  CUSTOMER_PLATFORM_HANDOFF_CONTRACT,
  CUSTOMER_PLATFORM_HANDOFF_HARD_LOCKS,
  type CustomerPlatformHandoffSurface,
  type CustomerPlatformHandoffSurfaceKey,
} from "./customer-platform-handoff-contracts";

export type CustomerPlatformHandoffDecision = "project" | "hold" | "recover" | "suppress";

export type CustomerPlatformHandoffRuntimeInput = {
  surfaceKey: CustomerPlatformHandoffSurfaceKey;
  customerOwned?: boolean;
  verifiedAccess?: boolean;
  safeProjectionReady?: boolean;
  currentStateOverride?: string;
  nextActionOverride?: string;
  recoveryPathOverride?: string;
  connectedDestinationOverride?: string;
  privacyPostureOverride?: string;
  duplicateSubmissionRisk?: boolean;
  pendingAsFinalRisk?: boolean;
  unsafeContentDetected?: boolean;
  allowedChannels?: readonly string[];
  suppressionKeyActive?: boolean;
};

export type CustomerPlatformHandoffProjection = {
  surfaceKey: CustomerPlatformHandoffSurfaceKey;
  decision: CustomerPlatformHandoffDecision;
  currentState: string;
  safeNextAction: string;
  recoveryPath: string;
  connectedDestination: string;
  privacyPosture: string;
  requiredGuards: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  recoveryReasons: readonly string[];
  blockedPatterns: readonly string[];
  hardLocks: readonly string[];
};

const SAFE_EMPTY = "Unavailable until a customer-owned safe projection is ready.";

export function projectCustomerPlatformHandoff(input: CustomerPlatformHandoffRuntimeInput): CustomerPlatformHandoffProjection {
  const surface = findSurface(input.surfaceKey);
  const holdReasons = getHoldReasons(input);
  const suppressionReasons = getSuppressionReasons(input);
  const recoveryReasons = getRecoveryReasons(input);
  const decision = chooseDecision({ holdReasons, suppressionReasons, recoveryReasons });

  return sanitizeProjection({
    surfaceKey: surface.key,
    decision,
    currentState: input.currentStateOverride ?? surface.currentState,
    safeNextAction: input.nextActionOverride ?? surface.safeNextAction,
    recoveryPath: input.recoveryPathOverride ?? surface.recoveryPath,
    connectedDestination: input.connectedDestinationOverride ?? surface.connectedDestination,
    privacyPosture: input.privacyPostureOverride ?? surface.privacyPosture,
    requiredGuards: surface.requiredGuards,
    holdReasons,
    suppressionReasons,
    recoveryReasons,
    blockedPatterns: CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS,
    hardLocks: CUSTOMER_PLATFORM_HANDOFF_HARD_LOCKS,
  });
}

export function getCustomerPlatformHandoffSurface(surfaceKey: CustomerPlatformHandoffSurfaceKey): CustomerPlatformHandoffSurface {
  return findSurface(surfaceKey);
}

export function listCustomerPlatformHandoffSurfaces() {
  return CUSTOMER_PLATFORM_HANDOFF_CONTRACT.handoffSurfaces.map((surface) => surface.key);
}

function findSurface(surfaceKey: CustomerPlatformHandoffSurfaceKey): CustomerPlatformHandoffSurface {
  const surface = CUSTOMER_PLATFORM_HANDOFF_CONTRACT.handoffSurfaces.find((item) => item.key === surfaceKey);
  if (!surface) throw new Error(`Unknown customer platform handoff surface: ${surfaceKey}`);
  return surface;
}

function getHoldReasons(input: CustomerPlatformHandoffRuntimeInput) {
  const reasons: string[] = [];
  if (!input.customerOwned) reasons.push("customer ownership is missing");
  if (!input.verifiedAccess) reasons.push("verified access is missing");
  if (!input.safeProjectionReady) reasons.push("safe status projection is missing");
  return reasons;
}

function getSuppressionReasons(input: CustomerPlatformHandoffRuntimeInput) {
  const reasons: string[] = [];
  if (input.suppressionKeyActive) reasons.push("suppression key is active");
  if (input.allowedChannels && input.allowedChannels.length === 0) reasons.push("allowed channels are empty");
  if (input.unsafeContentDetected) reasons.push("unsafe content detected");
  return reasons;
}

function getRecoveryReasons(input: CustomerPlatformHandoffRuntimeInput) {
  const reasons: string[] = [];
  if (input.duplicateSubmissionRisk) reasons.push("duplicate submission risk requires status, notification, dashboard, or support follow-through");
  if (input.pendingAsFinalRisk) reasons.push("pending state cannot be presented as final truth");
  return reasons;
}

function chooseDecision(input: {
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  recoveryReasons: readonly string[];
}): CustomerPlatformHandoffDecision {
  if (input.suppressionReasons.length > 0) return "suppress";
  if (input.holdReasons.length > 0) return "hold";
  if (input.recoveryReasons.length > 0) return "recover";
  return "project";
}

function sanitizeProjection(projection: CustomerPlatformHandoffProjection): CustomerPlatformHandoffProjection {
  return {
    ...projection,
    currentState: safeCustomerString(projection.currentState),
    safeNextAction: safeCustomerString(projection.safeNextAction),
    recoveryPath: safeCustomerString(projection.recoveryPath),
    connectedDestination: safeCustomerString(projection.connectedDestination),
    privacyPosture: safeCustomerString(projection.privacyPosture),
    requiredGuards: projection.requiredGuards.map(safeCustomerString),
    holdReasons: projection.holdReasons.map(safeCustomerString),
    suppressionReasons: projection.suppressionReasons.map(safeCustomerString),
    recoveryReasons: projection.recoveryReasons.map(safeCustomerString),
    blockedPatterns: projection.blockedPatterns.map(safeCustomerString),
    hardLocks: projection.hardLocks.map(safeCustomerString),
  };
}

export function safeCustomerString(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return SAFE_EMPTY;

  const blocked = [
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorIdentity",
    "riskScoringInternals",
    "attackerDetails",
    "system prompt",
    "developer message",
    "sessionToken=",
    "csrfToken=",
    "adminKey=",
    "supportContextKey=",
    "apiKey=",
    "privateKey=",
    "password=",
  ];

  if (blocked.some((pattern) => normalized.includes(pattern))) return SAFE_EMPTY;
  return normalized;
}
