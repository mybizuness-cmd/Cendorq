import { ADMIN_COMMAND_CENTER_SAFE_METHODS } from "@/lib/admin-command-center-safe-response";

export type AdminCommandCenterProjectionLink = {
  key: "index" | "summary" | "audit-trail" | "mission-brief" | "agent-findings" | "forecast-escalation";
  label: string;
  href: string;
  projection: string;
  purpose: string;
  methods: typeof ADMIN_COMMAND_CENTER_SAFE_METHODS;
  requiresSafeAccessHelper: true;
  requiresSafeResponseHelper: true;
  requiresSafeOptionsHelper: true;
};

const safeProjectionRouteContract = {
  methods: ADMIN_COMMAND_CENTER_SAFE_METHODS,
  requiresSafeAccessHelper: true,
  requiresSafeResponseHelper: true,
  requiresSafeOptionsHelper: true,
} as const;

export const ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS: readonly AdminCommandCenterProjectionLink[] = [
  {
    key: "index",
    label: "API index",
    href: "/api/admin/command-center",
    projection: "admin-command-center-api-index",
    purpose: "All safe projection endpoints in one read-only index.",
    ...safeProjectionRouteContract,
  },
  {
    key: "summary",
    label: "Summary",
    href: "/api/admin/command-center/summary",
    projection: "admin-command-center-safe-summary",
    purpose: "Foundation, access, mission, findings, forecast, and audit posture.",
    ...safeProjectionRouteContract,
  },
  {
    key: "audit-trail",
    label: "Audit trail",
    href: "/api/admin/command-center/audit",
    projection: "admin-command-center-audit-trail",
    purpose: "Safe audit event projections for operator review.",
    ...safeProjectionRouteContract,
  },
  {
    key: "mission-brief",
    label: "Mission brief",
    href: "/api/admin/command-center/mission-brief",
    projection: "admin-command-center-mission-brief",
    purpose: "Chief-agent brief readiness before dispatch.",
    ...safeProjectionRouteContract,
  },
  {
    key: "agent-findings",
    label: "Agent findings",
    href: "/api/admin/command-center/agent-findings",
    projection: "admin-command-center-agent-findings",
    purpose: "Structured findings posture for agents and scouts.",
    ...safeProjectionRouteContract,
  },
  {
    key: "forecast-escalation",
    label: "Forecast escalation",
    href: "/api/admin/command-center/forecast-escalation",
    projection: "admin-command-center-forecast-escalation",
    purpose: "Expansion, hardening, risk coverage, and escalation posture.",
    ...safeProjectionRouteContract,
  },
] as const;

export const ADMIN_COMMAND_CENTER_SAFE_PROJECTION_BOUNDARIES = [
  "preview-gated command-center access",
  "no-store responses",
  "safe options helper",
  "safe projections only",
  "read-only index",
  "review-only operating posture",
  "separate approval gates for action lanes",
] as const;

export function getAdminCommandCenterSafeProjectionLinks() {
  return ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS;
}

export function getAdminCommandCenterSafeProjectionBoundaries() {
  return ADMIN_COMMAND_CENTER_SAFE_PROJECTION_BOUNDARIES;
}
