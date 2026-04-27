export type CommandCenterReadinessCategory =
  | "database"
  | "auth"
  | "files"
  | "payments"
  | "delivery"
  | "automation"
  | "governance"
  | "smoke"
  | "operations";

export type CommandCenterReadinessCheck = {
  key: string;
  label: string;
  category: CommandCenterReadinessCategory;
  description: string;
  requiredServerConfig: readonly string[];
  protectedTables: readonly string[];
  status: "planned" | "requires-configuration";
};

export const COMMAND_CENTER_READINESS_CHECKS = [
  {
    key: "durable-postgres",
    label: "Durable Postgres source of truth",
    category: "database",
    description: "Neon or another managed Postgres database must be configured before live Command Center records are stored.",
    requiredServerConfig: ["DATABASE_URL"],
    protectedTables: ["businesses", "contacts", "intake_submissions", "reports", "projects", "tasks"],
    status: "requires-configuration",
  },
  {
    key: "private-auth-provider",
    label: "Private dashboard identity provider",
    category: "auth",
    description: "Clerk or another production identity provider must protect the private dashboard before operational records are shown.",
    requiredServerConfig: ["AUTH_PROVIDER", "AUTH_SECRET"],
    protectedTables: ["command_center_users", "role_permission_grants", "user_permission_overrides", "access_events"],
    status: "planned",
  },
  {
    key: "file-object-storage",
    label: "Private file vault storage",
    category: "files",
    description: "Object storage must be configured for screenshots, PDFs, report exports, brand assets, evidence, and before-after files.",
    requiredServerConfig: ["FILE_STORAGE_PROVIDER", "FILE_STORAGE_SERVER_TOKEN"],
    protectedTables: ["command_center_files", "evidence_records", "backup_exports"],
    status: "planned",
  },
  {
    key: "stripe-billing",
    label: "Payments and subscription sync",
    category: "payments",
    description: "Stripe billing and webhook verification must be configured before payment state drives operational workflows.",
    requiredServerConfig: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
    protectedTables: ["subscriptions", "payments", "activity_events"],
    status: "planned",
  },
  {
    key: "report-delivery-provider",
    label: "Report delivery provider",
    category: "delivery",
    description: "Email, CRM, webhook, or automation delivery should remain provider-neutral while Cendorq keeps report delivery state internally.",
    requiredServerConfig: ["REPORT_DELIVERY_PROVIDER", "REPORT_DELIVERY_SERVER_TOKEN"],
    protectedTables: ["integration_connections", "outbound_messages", "report_deliveries"],
    status: "planned",
  },
  {
    key: "automation-event-security",
    label: "Automation event security",
    category: "automation",
    description: "Inbound and outbound automation events need idempotency, server-side credentials, and signing verification before live workflows run.",
    requiredServerConfig: ["AUTOMATION_SIGNING_SECRET"],
    protectedTables: ["automation_events", "webhook_security_keys", "service_access_records"],
    status: "planned",
  },
  {
    key: "governance-controls",
    label: "Governance and privacy controls",
    category: "governance",
    description: "Consent, privacy requests, retention actions, incident records, and backup exports must be tracked as private operational records.",
    requiredServerConfig: ["GOVERNANCE_CONTACT_EMAIL"],
    protectedTables: ["consent_records", "privacy_requests", "data_retention_actions", "incident_records"],
    status: "planned",
  },
  {
    key: "production-smoke-readiness",
    label: "Production smoke readiness",
    category: "smoke",
    description: "Production smoke must keep checking public routes, discovery files, strict redirects, health, and protected Free Scan read behavior without fake submissions.",
    requiredServerConfig: ["CENDORQ_BASE_URL"],
    protectedTables: ["system_checks", "incident_records"],
    status: "requires-configuration",
  },
  {
    key: "migration-operations",
    label: "Migration operations discipline",
    category: "operations",
    description: "Database migrations must stay ordered, reviewed, non-destructive by default, and applied through an intentional production process.",
    requiredServerConfig: ["DATABASE_MIGRATION_OPERATOR"],
    protectedTables: ["audit_logs", "backup_exports", "system_checks"],
    status: "planned",
  },
] as const satisfies readonly CommandCenterReadinessCheck[];

export function getCommandCenterReadinessChecks() {
  return COMMAND_CENTER_READINESS_CHECKS;
}
