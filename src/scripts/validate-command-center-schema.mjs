import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const foundationSchemaPath = "db/migrations/0001_command_center_foundation.sql";
const deliverySchemaPath = "db/migrations/0002_command_center_delivery_automation.sql";

validateFoundationSchema();
validateDeliverySchema();

if (failures.length) {
  console.error("Command Center schema validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center schema validation passed. Database foundation covers users, businesses, contacts, intake, reports, projects, tasks, files, notes, monthly cycles, subscriptions, payments, activity events, audit logs, provider-neutral integrations, outbound messages, report deliveries, automation events, indexes, timestamps, and private-source-of-truth constraints.");

function validateFoundationSchema() {
  if (!existsSync(join(root, foundationSchemaPath))) {
    failures.push(`Missing Command Center schema migration: ${foundationSchemaPath}`);
    return;
  }

  const schema = read(foundationSchemaPath);

  for (const table of [
    "command_center_users",
    "businesses",
    "contacts",
    "intake_submissions",
    "reports",
    "projects",
    "tasks",
    "command_center_files",
    "notes",
    "monthly_cycles",
    "subscriptions",
    "payments",
    "activity_events",
    "audit_logs",
  ]) {
    if (!schema.includes(`create table if not exists ${table}`)) {
      failures.push(`Command Center foundation schema missing table: ${table}`);
    }
  }

  for (const phrase of [
    "create extension if not exists pgcrypto",
    "gen_random_uuid()",
    "current_plan text not null default 'free_scan'",
    "report_snapshot jsonb not null default '{}'::jsonb",
    "project_type text not null check",
    "storage_provider text not null default 'pending'",
    "constraint command_center_files_owner_check",
    "unique (business_id, cycle_month)",
    "provider text not null default 'stripe'",
    "old_value jsonb not null default '{}'::jsonb",
    "new_value jsonb not null default '{}'::jsonb",
    "create or replace function set_updated_at()",
    "execute function set_updated_at()",
  ]) {
    if (!schema.includes(phrase)) failures.push(`Command Center foundation schema missing required phrase: ${phrase}`);
  }

  for (const index of [
    "businesses_status_idx",
    "intake_submissions_duplicate_key_idx",
    "intake_submissions_decision_score_idx",
    "reports_type_status_idx",
    "projects_status_priority_idx",
    "tasks_status_due_idx",
    "monthly_cycles_business_month_idx",
    "subscriptions_status_idx",
    "payments_status_created_idx",
    "activity_events_business_created_idx",
    "audit_logs_entity_idx",
  ]) {
    if (!schema.includes(index)) failures.push(`Command Center foundation schema missing index: ${index}`);
  }

  for (const forbidden of [
    "NEXT_PUBLIC_DATABASE",
    "NEXT_PUBLIC_POSTGRES",
    "public report index",
    "unprotected webhook",
  ]) {
    if (schema.includes(forbidden)) failures.push(`Command Center foundation schema contains forbidden phrase: ${forbidden}`);
  }
}

function validateDeliverySchema() {
  if (!existsSync(join(root, deliverySchemaPath))) {
    failures.push(`Missing Command Center delivery automation migration: ${deliverySchemaPath}`);
    return;
  }

  const schema = read(deliverySchemaPath);

  for (const table of [
    "integration_connections",
    "outbound_messages",
    "report_deliveries",
    "automation_events",
  ]) {
    if (!schema.includes(`create table if not exists ${table}`)) {
      failures.push(`Command Center delivery schema missing table: ${table}`);
    }
  }

  for (const phrase of [
    "Provider-neutral by design: Cendorq remains the source of truth.",
    "email_service",
    "automation_platform",
    "go_high_level",
    "zapier",
    "outbound_webhook",
    "server_side_api",
    "report_delivery",
    "marketing_sequence",
    "monthly_update",
    "provider_message_id",
    "provider_thread_id",
    "report_deliveries_report_id_idx",
    "automation_events_idempotency_unique_idx",
    "integration_connections_set_updated_at",
    "outbound_messages_set_updated_at",
    "report_deliveries_set_updated_at",
  ]) {
    if (!schema.includes(phrase)) failures.push(`Command Center delivery schema missing required phrase: ${phrase}`);
  }

  for (const forbidden of [
    "NEXT_PUBLIC_ZAPIER",
    "NEXT_PUBLIC_GOHIGHLEVEL",
    "NEXT_PUBLIC_GO_HIGH_LEVEL",
    "zapier is required",
    "go high level is required",
    "ghl is required",
  ]) {
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) {
      failures.push(`Command Center delivery schema contains forbidden vendor-lock phrase: ${forbidden}`);
    }
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
