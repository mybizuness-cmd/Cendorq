import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const foundationSchemaPath = "db/migrations/0001_command_center_foundation.sql";
const deliverySchemaPath = "db/migrations/0002_command_center_delivery_automation.sql";
const intelligenceSchemaPath = "db/migrations/0003_command_center_signal_intelligence.sql";

validateFoundationSchema();
validateDeliverySchema();
validateIntelligenceSchema();

if (failures.length) {
  console.error("Command Center schema validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center schema validation passed. Database foundation covers users, businesses, contacts, intake, reports, projects, tasks, files, notes, monthly cycles, subscriptions, payments, activity events, audit logs, provider-neutral integrations, outbound messages, report deliveries, automation events, private signal classification, evidence records, learning memory, outcome measurements, indexes, timestamps, and private-source-of-truth constraints.");

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

function validateIntelligenceSchema() {
  if (!existsSync(join(root, intelligenceSchemaPath))) {
    failures.push(`Missing Command Center signal intelligence migration: ${intelligenceSchemaPath}`);
    return;
  }

  const schema = read(intelligenceSchemaPath);

  for (const table of [
    "signal_taxonomies",
    "signal_tags",
    "intelligence_classifications",
    "evidence_records",
    "intelligence_memory_items",
    "intelligence_memory_links",
    "outcome_measurements",
  ]) {
    if (!schema.includes(`create table if not exists ${table}`)) {
      failures.push(`Command Center intelligence schema missing table: ${table}`);
    }
  }

  for (const phrase of [
    "private signal intelligence foundation",
    "must never expose raw intelligence",
    "buyer_hesitation",
    "conversion_blocker",
    "authority_signal",
    "evidence_excerpt",
    "client_safe_summary",
    "evidence_records_type_reliability_idx",
    "intelligence_memory_items_type_status_idx",
    "intelligence_memory_links_anchor_check",
    "outcome_measurements_business_metric_idx",
    "support_count integer not null default 0",
    "support_strength integer not null default 0",
    "signal_taxonomies_set_updated_at",
    "intelligence_classifications_set_updated_at",
    "evidence_records_set_updated_at",
    "intelligence_memory_items_set_updated_at",
    "outcome_measurements_set_updated_at",
  ]) {
    if (!schema.includes(phrase)) failures.push(`Command Center intelligence schema missing required phrase: ${phrase}`);
  }

  for (const forbidden of [
    "public intelligence index",
    "public evidence index",
    "NEXT_PUBLIC_LEARNING",
    "NEXT_PUBLIC_INTELLIGENCE",
    "publicly expose raw intelligence",
    "publicly expose prompts",
  ]) {
    if (schema.toLowerCase().includes(forbidden.toLowerCase())) {
      failures.push(`Command Center intelligence schema contains forbidden public-intelligence phrase: ${forbidden}`);
    }
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
