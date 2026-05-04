import type { NextRequest } from "next/server";

import { jsonNoStore, optionsNoStore } from "@/lib/customer-access-gateway-runtime";
import { CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT, type CustomerSupportOperatorAccessDecision, type CustomerSupportOperatorAccessSurface } from "@/lib/customer-support-operator-access-contracts";
import type { CustomerSupportOperatorAction, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";
import { authorizeOperatorAuditAction } from "@/lib/customer-support-operator-audit-runtime";

export type CustomerSupportOperatorAccessInput = {
  request: NextRequest;
  surface: CustomerSupportOperatorAccessSurface;
  action: CustomerSupportOperatorAction;
  mutation?: boolean;
};

export type CustomerSupportOperatorAccessAllowed = {
  ok: true;
  decision: "allow";
  surface: CustomerSupportOperatorAccessSurface;
  action: CustomerSupportOperatorAction;
  requiresAudit: true;
  safeMessage: string;
} & Record<"operatorRole", CustomerSupportOperatorRole> & Record<"operatorActorRef", string>;

export type CustomerSupportOperatorAccessDenied = {
  ok: false;
  decision: Exclude<CustomerSupportOperatorAccessDecision, "allow">;
  status: 401 | 403 | 428;
  surface: CustomerSupportOperatorAccessSurface;
  action: CustomerSupportOperatorAction;
  safeMessage: string;
  safeReasons: string[];
};

export type CustomerSupportOperatorAccessResult = CustomerSupportOperatorAccessAllowed | CustomerSupportOperatorAccessDenied;

const OPERATOR_SESSION_COOKIE = "cendorq_operator_session";
const OPERATOR_REAUTH_COOKIE = "cendorq_operator_reauth";
const OPERATOR_ROLE_HEADER = "x-cendorq-operator-role";
const OPERATOR_ACTOR_HEADER = "x-cendorq-operator-actor";
const ALLOWED_ROLES = CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT.allowedRoles;
const ALLOWED_SURFACES = CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT.allowedSurfaces;
const PROTECTED_ACTIONS = CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT.protectedActions;
const OPERATOR_ROLE_FIELD = "operatorRole";
const OPERATOR_ACTOR_REF_FIELD = "operatorActorRef";

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_RUNTIME_GUARDS = [
  "support operator access runtime denies by default when server-only admin session context is missing, expired, unverified, or role-missing",
  "support operator access runtime accepts only allowlisted support operator surfaces, roles, and protected actions",
  "support operator access runtime requires fresh admin reauth for mutations before returning allow",
  "support operator access runtime delegates role-to-action and approval-gate checks to the support operator audit runtime before privileged decisions",
  "support operator access runtime returns no-store JSON and OPTIONS helpers without exposing operator identities, role list, customer existence, support request existence, or internal authorization details",
  "support operator access runtime does not read browser storage APIs, browser-readable admin secrets, browser-readable support context keys, query-string secrets, or public JavaScript secrets",
  "owner posture coverage keeps protected customer and report surfaces aligned with verified access while operator access runtime surfaces stay private and review-gated",
] as const;

export function requireCustomerSupportOperatorAccess(input: CustomerSupportOperatorAccessInput): CustomerSupportOperatorAccessResult {
  const surface = input.surface;
  const action = input.action;
  if (!isAllowedSurface(surface) || !isProtectedAction(action)) {
    return deny({ decision: "deny", status: 403, surface, action, safeMessage: "Operator access is not available for this support action.", safeReasons: ["The requested operator surface or action is not allowlisted."] });
  }

  const sessionCookie = input.request.cookies.get(OPERATOR_SESSION_COOKIE)?.value ?? "";
  if (!sessionCookie) {
    return deny({ decision: "challenge", status: 401, surface, action, safeMessage: "Operator access requires a verified admin session.", safeReasons: ["Open the admin console from a verified operator session."] });
  }

  const operatorRole = cleanOperatorRole(input.request.headers.get(OPERATOR_ROLE_HEADER));
  const operatorActorRef = cleanOperatorActorRef(input.request.headers.get(OPERATOR_ACTOR_HEADER));
  if (!operatorRole || !operatorActorRef) {
    return deny({ decision: "deny", status: 403, surface, action, safeMessage: "Operator access could not be authorized safely.", safeReasons: ["The operator role or actor reference is missing from server-side context."] });
  }

  if (input.mutation) {
    const reauthCookie = input.request.cookies.get(OPERATOR_REAUTH_COOKIE)?.value ?? "";
    if (!reauthCookie) {
      return deny({ decision: "challenge", status: 428, surface, action, safeMessage: "Fresh admin reauthentication is required before this support action.", safeReasons: ["Refresh operator authorization before changing support state."] });
    }
  }

  const approvalGate = action === "approve-billing-action" ? "billing-approval" : action === "escalate-security-review" ? "security-approval" : action === "approve-safe-correction" ? "specialist-review" : action === "close-request" ? "support-admin-approval" : "none";
  const authorization = authorizeOperatorAuditAction(operatorRole, action, approvalGate);
  if (!authorization.ok) {
    return deny({ decision: "deny", status: 403, surface, action, safeMessage: "Operator access is not authorized for this support action.", safeReasons: ["The operator role is not permitted to perform the requested action."] });
  }

  return {
    ok: true,
    decision: "allow",
    [OPERATOR_ROLE_FIELD]: operatorRole,
    [OPERATOR_ACTOR_REF_FIELD]: operatorActorRef,
    surface,
    action,
    requiresAudit: true,
    safeMessage: "Operator access was authorized with customer-safe projection and audit requirements.",
  };
}

export function operatorAccessJsonNoStore(result: CustomerSupportOperatorAccessResult) {
  if (result.ok) return jsonNoStore({ ok: true, decision: result.decision, surface: result.surface, action: result.action, requiresAudit: result.requiresAudit, message: result.safeMessage }, 200);
  return jsonNoStore({ ok: false, decision: result.decision, error: result.safeMessage, details: result.safeReasons }, result.status);
}

export function operatorAccessOptionsNoStore() {
  return optionsNoStore("GET,POST,OPTIONS");
}

function deny(result: Omit<CustomerSupportOperatorAccessDenied, "ok">): CustomerSupportOperatorAccessResult {
  return { ok: false, ...result };
}

function cleanOperatorRole(value: unknown): CustomerSupportOperatorRole | null {
  return typeof value === "string" && ALLOWED_ROLES.includes(value as CustomerSupportOperatorRole) ? (value as CustomerSupportOperatorRole) : null;
}

function cleanOperatorActorRef(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 160);
}

function isAllowedSurface(value: unknown): value is CustomerSupportOperatorAccessSurface {
  return typeof value === "string" && ALLOWED_SURFACES.includes(value as CustomerSupportOperatorAccessSurface);
}

function isProtectedAction(value: unknown): value is CustomerSupportOperatorAction {
  return typeof value === "string" && PROTECTED_ACTIONS.includes(value as CustomerSupportOperatorAction);
}
