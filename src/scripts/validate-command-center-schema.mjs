import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const foundationSchemaPath = "db/migrations/0001_command_center_foundation.sql";
const deliverySchemaPath = "db/migrations/0002_command_center_delivery_automation.sql";
const intelligenceSchemaPath = "db/migrations/0003_command_center_signal_intelligence.sql";
const governanceSchemaPath = "db/migrations/0004_command_center_data_governance.sql";
const accessControlSchemaPath = "db/migrations/0005_command_center_access_control.sql";
const migrationStandardPath = "docs/command-center-migration-operating-standard.md";

validateFoundationSchema();
validateDeliverySchema();
validateIntelligenceSchema();
validateGovernanceSchema();
validateAccessControlSchema();
validateMigrationStandard();

if (failures.length) {
  console.error("Command Center schema validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center schema validation passed. Database foundation covers users, businesses, contacts, intake, reports, projects, tasks, files, notes, monthly cycles, subscriptions, payments, activity events, audit logs, provider-neutral integrations, outbound messages, report deliveries, automation events, private signal classification, evidence records, learning memory, outcome measurements, data governance, consent records, privacy requests, retention actions, backup exports, webhook key rotation, incident records, system checks, access control, role permissions, user overrides, invitations, session events, service access metadata, migration operating safety, indexes, timestamps, and private-source-of-truth constraints.");

function validateFoundationSchema() {
  if (!existsSync(join(root, foundationSchemaPath))) {
    failures.push(`Missing Command Center schema migration: ${foundationSchemaPath}`);
    return;
  }
  const schema = read(foundationSchemaPath);
  for (const table of ["command_center_users", "businesses", "contacts", "intake_submissions", "reports", "projects", "tasks", "command_center_files", "notes", "monthly_cycles", "subscriptions", "payments", "activity_events", "audit_logs"]) {
    if (!schema.includes(`create table if not exists ${table}`)) failures.push(`Command Center foundation schema missing table: ${table}`);
  }
  for (const phrase of ["create extension if not exists pgcrypto", "gen_random_uuid()", "current_plan text not null default 'free_scan'", "report_snapshot jsonb not null default '{}'::jsonb", "project_type text not null check", "storage_provider text not null default 'pending'", "constraint command_center_files_owner_check", "unique (business_id, cycle_month)", "provider text not null default 'stripe'", "old_value jsonb not null default '{}'::jsonb", "new_value jsonb not null default '{}'::jsonb", "create or replace function set_updated_at()", "execute function set_updated_at()"])
    if (!schema.includes(phrase)) failures.push(`Command Center foundation schema missing required phrase: ${phrase}`);
  for (const index of ["businesses_status_idx", "intake_submissions_duplicate_key_idx", "intake_submissions_decision_score_idx", "reports_type_status_idx", "projects_status_priority_idx", "tasks_status_due_idx", "monthly_cycles_business_month_idx", "subscriptions_status_idx", "payments_status_created_idx", "activity_events_business_created_idx", "audit_logs_entity_idx"])
    if (!schema.includes(index)) failures.push(`Command Center foundation schema missing index: ${index}`);
  for (const forbidden of ["NEXT_PUBLIC_DATABASE", "NEXT_PUBLIC_POSTGRES", "public report index", "unprotected webhook"])
    if (schema.includes(forbidden)) failures.push(`Command Center foundation schema contains forbidden phrase: ${forbidden}`);
}

function validateDeliverySchema() {
  if (!existsSync(join(root, deliverySchemaPath))) {
    failures.push(`Missing Command Center delivery automation migration: ${deliverySchemaPath}`);
    return;
  }
  const schema = read(deliverySchemaPath);
  for (const table of ["integration_connections", "outbound_messages", "report_deliveries", "automation_events"])
    if (!schema.includes(`create table if not exists ${table}`)) failures.push(`Command Center delivery schema missing table: ${table}`);
  for (const phrase of ["Provider-neutral by design: Cendorq remains the source of truth.", "email_service", "automation_platform", "go_high_level", "zapier", "outbound_webhook", "server_side_api", "report_delivery", "marketing_sequence", "monthly_update", "provider_message_id", "provider_thread_id", "report_deliveries_report_id_idx", "automation_events_idempotency_unique_idx", "integration_connections_set_updated_at", "outbound_messages_set_updated_at", "report_deliveries_set_updated_at"])
    if (!schema.includes(phrase)) failures.push(`Command Center delivery schema missing required phrase: ${phrase}`);
  for (const forbidden of ["NEXT_PUBLIC_ZAPIER", "NEXT_PUBLIC_GOHIGHLEVEL", "NEXT_PUBLIC_GO_HIGH_LEVEL", "zapier is required", "go high level is required", "ghl is required"])
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) failures.push(`Command Center delivery schema contains forbidden vendor-lock phrase: ${forbidden}`);
}

function validateIntelligenceSchema() {
  if (!existsSync(join(root, intelligenceSchemaPath))) {
    failures.push(`Missing Command Center signal intelligence migration: ${intelligenceSchemaPath}`);
    return;
  }
  const schema = read(intelligenceSchemaPath);
  for (const table of ["signal_taxonomies", "signal_tags", "intelligence_classifications", "evidence_records", "intelligence_memory_items", "intelligence_memory_links", "outcome_measurements"])
    if (!schema.includes(`create table if not exists ${table}`)) failures.push(`Command Center intelligence schema missing table: ${table}`);
  for (const phrase of ["private signal intelligence foundation", "must never expose raw intelligence", "buyer_hesitation", "conversion_blocker", "authority_signal", "evidence_excerpt", "client_safe_summary", "evidence_records_type_reliability_idx", "intelligence_memory_items_type_status_idx", "intelligence_memory_links_anchor_check", "outcome_measurements_business_metric_idx", "support_count integer not null default 0", "support_strength integer not null default 0", "signal_taxonomies_set_updated_at", "intelligence_classifications_set_updated_at", "evidence_records_set_updated_at", "intelligence_memory_items_set_updated_at", "outcome_measurements_set_updated_at"])
    if (!schema.includes(phrase)) failures.push(`Command Center intelligence schema missing required phrase: ${phrase}`);
  for (const forbidden of ["public intelligence index", "public evidence index", "NEXT_PUBLIC_LEARNING", "NEXT_PUBLIC_INTELLIGENCE", "publicly expose raw intelligence", "publicly expose prompts"])
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) failures.push(`Command Center intelligence schema contains forbidden public-intelligence phrase: ${forbidden}`);
}

function validateGovernanceSchema() {
  if (!existsSync(join(root, governanceSchemaPath))) {
    failures.push(`Missing Command Center data governance migration: ${governanceSchemaPath}`);
    return;
  }
  const schema = read(governanceSchemaPath);
  for (const table of ["consent_records", "privacy_requests", "data_retention_policies", "data_retention_actions", "backup_exports", "webhook_security_keys", "incident_records", "system_checks"])
    if (!schema.includes(`create table if not exists ${table}`)) failures.push(`Command Center governance schema missing table: ${table}`);
  for (const phrase of ["data governance and operational safety foundation", "governance records stay private by default", "consent_records_anchor_check", "free_scan_submission", "marketing_email", "privacy_requests_status_due_idx", "data_retention_policies_entity_status_idx", "backup_exports_type_status_idx", "webhook_security_keys_status_rotation_idx", "incident_records_status_severity_idx", "system_checks_status_next_idx", "production_smoke_failure", "data_integrity", "database_backup", "migration_snapshot", "checksum_sha256", "secret_env_name text not null", "consent_records_set_updated_at", "privacy_requests_set_updated_at", "backup_exports_set_updated_at", "webhook_security_keys_set_updated_at", "incident_records_set_updated_at", "system_checks_set_updated_at"])
    if (!schema.includes(phrase)) failures.push(`Command Center governance schema missing required phrase: ${phrase}`);
  for (const forbidden of ["NEXT_PUBLIC_SECRET", "NEXT_PUBLIC_WEBHOOK", "public consent index", "public privacy request index", "public backup export"])
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) failures.push(`Command Center governance schema contains forbidden public-governance phrase: ${forbidden}`);
}

function validateAccessControlSchema() {
  if (!existsSync(join(root, accessControlSchemaPath))) {
    failures.push(`Missing Command Center access control migration: ${accessControlSchemaPath}`);
    return;
  }
  const schema = read(accessControlSchemaPath);
  for (const table of ["role_permission_grants", "user_permission_overrides", "command_center_invitations", "command_center_sessions", "access_events", "service_access_records", "access_policy_checks"])
    if (!schema.includes(`create table if not exists ${table}`)) failures.push(`Command Center access control schema missing table: ${table}`);
  for (const phrase of ["access control foundation", "metadata only", "role_permission_grants_role_status_idx", "user_permission_overrides_user_effect_idx", "command_center_invitations_email_status_idx", "command_center_sessions_user_status_idx", "access_events_type_decision_idx", "service_access_records_status_rotation_idx", "access_policy_checks_status_idx", "permission_denied", "service_access_denied", "client_viewer", "secret_env_name text not null default ''", "role_permission_grants_set_updated_at", "user_permission_overrides_set_updated_at", "command_center_invitations_set_updated_at", "command_center_sessions_set_updated_at", "service_access_records_set_updated_at", "access_policy_checks_set_updated_at"])
    if (!schema.includes(phrase)) failures.push(`Command Center access control schema missing required phrase: ${phrase}`);
  for (const forbidden of ["invite_token_hash", "key_hash", "NEXT_PUBLIC_AUTH"])
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) failures.push(`Command Center access control schema contains forbidden credential-storage phrase: ${forbidden}`);
}

function validateMigrationStandard() {
  if (!existsSync(join(root, migrationStandardPath))) {
    failures.push(`Missing Command Center migration operating standard: ${migrationStandardPath}`);
    return;
  }
  const text = read(migrationStandardPath);
  for (const phrase of ["Database migrations are not casual edits.", "ordered", "reviewable", "repeatable", "production-safe", "non-destructive by default", "Current migration set", "0001_command_center_foundation.sql", "0005_command_center_access_control.sql", "Destructive change rule", "Provider rule", "Dashboard dependency rule", "Production migration application should be done through a controlled migration command", "Rollback thinking"])
    if (!text.includes(phrase)) failures.push(`Command Center migration standard missing required phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
