import type { AdminCommandCenterAccessProjection } from "./admin-command-center-access-runtime";

export type AdminCommandCenterAuditEventType =
  | "safe-read-reviewed"
  | "mutation-approved"
  | "mutation-denied"
  | "mission-brief-reviewed"
  | "agent-output-reviewed"
  | "provider-config-reviewed"
  | "report-release-reviewed"
  | "launch-readiness-reviewed";

export type AdminCommandCenterAuditEventInput = {
  eventId: string;
  eventType: AdminCommandCenterAuditEventType;
  occurredAt: string;
  actorRole: string;
  area: string;
  action: string;
  access: AdminCommandCenterAccessProjection;
  summary: string;
  evidenceRefs?: readonly string[];
  approvalRefs?: readonly string[];
};

export type AdminCommandCenterAuditSafeProjection = {
  eventId: string;
  eventType: AdminCommandCenterAuditEventType;
  occurredAt: string;
  actorRole: string;
  area: string;
  action: string;
  decision: AdminCommandCenterAccessProjection["decision"];
  reasonCodes: readonly string[];
  summary: string;
  evidenceRefCount: number;
  approvalRefCount: number;
  immutable: true;
  safeProjectionOnly: true;
  noStoreRequired: true;
  rawPayloadStored: false;
  privateEvidenceStored: false;
  privateBillingStored: false;
  internalNotesCustomerVisible: false;
  operatorIdentityCustomerVisible: false;
  browserAuthorityStored: false;
  providerPayloadStored: false;
  providerResponseStored: false;
  unsupportedOutcomePromiseStored: false;
};

export const ADMIN_COMMAND_CENTER_AUDIT_RULES = [
  "admin audit events are immutable safe projections for access decisions, reviewed mutations, mission brief reviews, agent output reviews, provider configuration reviews, report release reviews, and launch readiness reviews",
  "audit events store event id, event type, time, actor role, area, action, access decision, reason codes, safe summary, evidence reference count, and approval reference count",
  "audit events must not store raw payloads, private evidence, private billing material, customer-visible internal notes, customer-visible operator identity, browser authority, provider payloads, provider responses, or unsupported outcome promises",
  "audit events are safe operational records and are not a substitute for owner approval, release-captain approval, or provider configuration approval",
] as const;

export function projectAdminCommandCenterAuditEvent(input: AdminCommandCenterAuditEventInput): AdminCommandCenterAuditSafeProjection {
  return {
    eventId: normalizeRef(input.eventId, "admin-audit-event"),
    eventType: input.eventType,
    occurredAt: normalizeRef(input.occurredAt, "pending-time"),
    actorRole: normalizeRef(input.actorRole, "unknown-role"),
    area: normalizeRef(input.area, "unknown-area"),
    action: normalizeRef(input.action, "unknown-action"),
    decision: input.access.decision,
    reasonCodes: input.access.reasonCodes,
    summary: normalizeSummary(input.summary),
    evidenceRefCount: input.evidenceRefs?.length ?? 0,
    approvalRefCount: input.approvalRefs?.length ?? 0,
    immutable: true,
    safeProjectionOnly: true,
    noStoreRequired: true,
    rawPayloadStored: false,
    privateEvidenceStored: false,
    privateBillingStored: false,
    internalNotesCustomerVisible: false,
    operatorIdentityCustomerVisible: false,
    browserAuthorityStored: false,
    providerPayloadStored: false,
    providerResponseStored: false,
    unsupportedOutcomePromiseStored: false,
  };
}

export function getAdminCommandCenterAuditRules() {
  return ADMIN_COMMAND_CENTER_AUDIT_RULES;
}

function normalizeRef(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 120);
  return cleaned || fallback;
}

function normalizeSummary(value: unknown) {
  if (typeof value !== "string") return "Admin action reviewed through safe audit projection.";
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 240);
  return cleaned || "Admin action reviewed through safe audit projection.";
}
