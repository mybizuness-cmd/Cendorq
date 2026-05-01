import type { CustomerConfirmationEmailPayload } from "./customer-confirmation-email-issuance-runtime";
import {
  recordCustomerEmailDispatchTransition,
  type CustomerEmailDispatchAuditSafeProjection,
} from "./customer-email-dispatch-audit-runtime";
import {
  updateCustomerEmailDispatchQueueState,
  type CustomerEmailDispatchQueueSafeProjection,
  type CustomerEmailDispatchQueueState,
} from "./customer-email-dispatch-queue-runtime";
import {
  prepareCustomerEmailProviderDispatchAttempt,
  type CustomerEmailProviderDispatchAttempt,
} from "./customer-email-provider-dispatch-adapter";

export type CustomerEmailDispatchRunnerInput = {
  queueRecord: CustomerEmailDispatchQueueSafeProjection;
  providerPayload: CustomerConfirmationEmailPayload["providerReadyPayload"];
  providerConfigured: boolean;
  ownerApproved: boolean;
  dryRun?: boolean;
  suppressionActive?: boolean;
  providerEventRefHash?: string | null;
  failureCode?: string | null;
};

export type CustomerEmailDispatchRunnerResult = {
  ok: boolean;
  decision: "ready-for-provider" | "dry-run-ready" | "hold" | "suppress";
  queueId: string;
  queueState: CustomerEmailDispatchQueueState;
  updatedQueue: CustomerEmailDispatchQueueSafeProjection | null;
  attempt: CustomerEmailProviderDispatchAttempt;
  audit: CustomerEmailDispatchAuditSafeProjection;
  providerCallMade: false;
  providerSecretRead: false;
  browserVisible: false;
  customerEmailReturned: false;
  rawTokenReturned: false;
  tokenHashReturned: false;
  confirmationUrlReturned: false;
  providerPayloadReturned: false;
  providerResponseReturned: false;
  localStorageAllowed: false;
  sessionStorageAllowed: false;
  runnerGuards: readonly string[];
};

const RUNNER_GUARDS = [
  "dispatch runner must use provider dispatch adapter before queue mutation",
  "dispatch runner must record an audit transition for every queue mutation decision",
  "dispatch runner must never call an external provider directly",
  "dispatch runner must never read provider secrets directly",
  "dispatch runner must never return raw customer email, raw token, token hash, confirmation URL, provider payload, or provider response to browser-safe output",
  "dispatch runner must only mutate queue state through updateCustomerEmailDispatchQueueState",
  "dispatch runner must preserve Cendorq Support <support@cendorq.com> sender identity",
] as const;

export async function runCustomerEmailDispatchCycle(
  input: CustomerEmailDispatchRunnerInput,
): Promise<CustomerEmailDispatchRunnerResult> {
  const attempt = prepareCustomerEmailProviderDispatchAttempt({
    queueRecord: input.queueRecord,
    providerPayload: input.providerPayload,
    providerConfigured: input.providerConfigured,
    ownerApproved: input.ownerApproved,
    dryRun: input.dryRun,
    suppressionActive: input.suppressionActive,
  });
  const nextState = deriveRunnerNextState(attempt);
  const updatedQueue = await updateCustomerEmailDispatchQueueState({
    queueId: input.queueRecord.queueId,
    expectedState: input.queueRecord.state,
    toState: nextState,
    retryCount: nextState === "failed" ? 1 : input.queueRecord.state === "failed" ? 1 : 0,
    failureReason: nextState === "held" ? attempt.holdReasons.join(",") : cleanFailureCode(input.failureCode),
    suppressionReason: nextState === "suppressed" ? attempt.suppressionReasons.join(",") : null,
  });
  const audit = await recordCustomerEmailDispatchTransition({
    queueRecord: input.queueRecord,
    attempt,
    toState: nextState,
    providerEventRefHash: input.providerEventRefHash,
    failureCode: input.failureCode,
    retryCount: nextState === "failed" ? 1 : 0,
  });

  return {
    ok: attempt.decision === "ready-for-provider" || attempt.decision === "dry-run-ready",
    decision: attempt.decision,
    queueId: input.queueRecord.queueId,
    queueState: updatedQueue?.state ?? input.queueRecord.state,
    updatedQueue,
    attempt,
    audit,
    providerCallMade: false,
    providerSecretRead: false,
    browserVisible: false,
    customerEmailReturned: false,
    rawTokenReturned: false,
    tokenHashReturned: false,
    confirmationUrlReturned: false,
    providerPayloadReturned: false,
    providerResponseReturned: false,
    localStorageAllowed: false,
    sessionStorageAllowed: false,
    runnerGuards: RUNNER_GUARDS,
  };
}

export function getCustomerEmailDispatchRunnerRules() {
  return RUNNER_GUARDS;
}

function deriveRunnerNextState(attempt: CustomerEmailProviderDispatchAttempt): CustomerEmailDispatchQueueState {
  if (attempt.decision === "suppress") return "suppressed";
  if (attempt.decision === "hold") return "held";
  if (attempt.decision === "dry-run-ready") return "queued";
  return "sending";
}

function cleanFailureCode(value: unknown) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 80);
  return cleaned || undefined;
}
