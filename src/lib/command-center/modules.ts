export type CommandCenterModuleKey =
  | "command-home"
  | "intake-inbox"
  | "clients"
  | "reports"
  | "projects"
  | "tasks"
  | "file-vault"
  | "ongoing-control"
  | "payments"
  | "analytics"
  | "delivery"
  | "automation"
  | "intelligence"
  | "governance"
  | "access-control"
  | "audit-log"
  | "settings";

export type CommandCenterModule = {
  key: CommandCenterModuleKey;
  label: string;
  path: string;
  description: string;
  schemaAnchors: readonly string[];
  requiredPermission: string;
  status: "shell" | "planned";
};

export const COMMAND_CENTER_MODULES = [
  {
    key: "command-home",
    label: "Command Home",
    path: "/command-center",
    description: "Private operating overview for intake, active clients, reports, projects, monthly control, alerts, and system health.",
    schemaAnchors: ["businesses", "activity_events", "system_checks", "incident_records"],
    requiredPermission: "command_center.view",
    status: "shell",
  },
  {
    key: "intake-inbox",
    label: "Intake Inbox",
    path: "/command-center/intake",
    description: "Review Free Scan submissions, routing hints, duplicate signals, scores, risk flags, and next recommended actions.",
    schemaAnchors: ["intake_submissions", "businesses", "contacts", "reports"],
    requiredPermission: "intake.read",
    status: "planned",
  },
  {
    key: "clients",
    label: "Clients",
    path: "/command-center/clients",
    description: "Manage business profiles, contacts, lifecycle stages, plan history, notes, files, and activity timelines.",
    schemaAnchors: ["businesses", "contacts", "notes", "activity_events"],
    requiredPermission: "clients.read",
    status: "planned",
  },
  {
    key: "reports",
    label: "Reports",
    path: "/command-center/reports",
    description: "Control Free Scan, Deep Review, Build Fix, and Ongoing Control report records, snapshots, status, and delivery.",
    schemaAnchors: ["reports", "report_deliveries", "outbound_messages", "evidence_records"],
    requiredPermission: "reports.read",
    status: "planned",
  },
  {
    key: "projects",
    label: "Projects",
    path: "/command-center/projects",
    description: "Operate Deep Review, Build Fix, and Ongoing Control projects with status, ownership, priorities, and timelines.",
    schemaAnchors: ["projects", "tasks", "monthly_cycles", "outcome_measurements"],
    requiredPermission: "projects.read",
    status: "planned",
  },
  {
    key: "tasks",
    label: "Tasks",
    path: "/command-center/tasks",
    description: "Track operational work across reports, fixes, monthly cycles, delivery, client requests, and internal reviews.",
    schemaAnchors: ["tasks", "projects", "activity_events"],
    requiredPermission: "tasks.read",
    status: "planned",
  },
  {
    key: "file-vault",
    label: "File Vault",
    path: "/command-center/files",
    description: "Manage private screenshots, PDFs, report exports, brand assets, evidence, before-after records, and client uploads.",
    schemaAnchors: ["command_center_files", "evidence_records", "backup_exports"],
    requiredPermission: "files.read",
    status: "planned",
  },
  {
    key: "ongoing-control",
    label: "Ongoing Control",
    path: "/command-center/ongoing-control",
    description: "Run monthly cycles, goals, completed items, risks, recommendations, and recurring client-control work.",
    schemaAnchors: ["monthly_cycles", "projects", "reports", "outcome_measurements"],
    requiredPermission: "ongoing_control.read",
    status: "planned",
  },
  {
    key: "payments",
    label: "Payments",
    path: "/command-center/payments",
    description: "Track subscriptions, payments, invoices, failed payments, plan changes, and revenue-stage operational status.",
    schemaAnchors: ["subscriptions", "payments", "activity_events"],
    requiredPermission: "payments.read",
    status: "planned",
  },
  {
    key: "analytics",
    label: "Analytics",
    path: "/command-center/analytics",
    description: "View lead quality, conversion opportunities, common weaknesses, plan candidates, outcomes, and pipeline health.",
    schemaAnchors: ["intake_submissions", "outcome_measurements", "intelligence_classifications", "payments"],
    requiredPermission: "analytics.read",
    status: "planned",
  },
  {
    key: "delivery",
    label: "Delivery",
    path: "/command-center/delivery",
    description: "Control report email delivery, outbound messages, CRM sync state, provider responses, failures, opens, and clicks.",
    schemaAnchors: ["outbound_messages", "report_deliveries", "integration_connections"],
    requiredPermission: "delivery.read",
    status: "planned",
  },
  {
    key: "automation",
    label: "Automation",
    path: "/command-center/automation",
    description: "Monitor automation events, idempotency, webhook channels, follow-ups, monthly jobs, and provider-neutral workflows.",
    schemaAnchors: ["automation_events", "integration_connections", "system_checks"],
    requiredPermission: "automation.read",
    status: "planned",
  },
  {
    key: "intelligence",
    label: "Intelligence",
    path: "/command-center/intelligence",
    description: "Classify patterns, evidence, risks, opportunities, authority signals, learning memory, and outcome-backed insights.",
    schemaAnchors: ["signal_taxonomies", "signal_tags", "intelligence_classifications", "intelligence_memory_items", "intelligence_memory_links"],
    requiredPermission: "intelligence.read",
    status: "planned",
  },
  {
    key: "governance",
    label: "Governance",
    path: "/command-center/governance",
    description: "Manage consent records, privacy requests, retention actions, backup exports, incidents, and system checks.",
    schemaAnchors: ["consent_records", "privacy_requests", "data_retention_actions", "backup_exports", "incident_records"],
    requiredPermission: "governance.read",
    status: "planned",
  },
  {
    key: "access-control",
    label: "Access Control",
    path: "/command-center/access",
    description: "Control roles, permission grants, invitations, sessions, service access metadata, and policy checks.",
    schemaAnchors: ["role_permission_grants", "user_permission_overrides", "command_center_invitations", "command_center_sessions", "access_events"],
    requiredPermission: "access_control.read",
    status: "planned",
  },
  {
    key: "audit-log",
    label: "Audit Log",
    path: "/command-center/audit",
    description: "Inspect operational changes, old and new values, actions, actors, metadata, and entity history.",
    schemaAnchors: ["audit_logs", "access_events", "activity_events"],
    requiredPermission: "audit.read",
    status: "planned",
  },
  {
    key: "settings",
    label: "Settings",
    path: "/command-center/settings",
    description: "Configure private operating preferences, provider metadata, policy checks, and system readiness without exposing secrets.",
    schemaAnchors: ["integration_connections", "access_policy_checks", "system_checks"],
    requiredPermission: "settings.read",
    status: "planned",
  },
] as const satisfies readonly CommandCenterModule[];

export function getCommandCenterModule(path: string) {
  return COMMAND_CENTER_MODULES.find((module) => module.path === path) ?? null;
}
