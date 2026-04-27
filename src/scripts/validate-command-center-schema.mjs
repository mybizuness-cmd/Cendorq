import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const schemaPath = "db/migrations/0001_command_center_foundation.sql";

if (!existsSync(join(root, schemaPath))) {
  failures.push(`Missing Command Center schema migration: ${schemaPath}`);
} else {
  const schema = read(schemaPath);

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
      failures.push(`Command Center schema missing table: ${table}`);
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
    if (!schema.includes(phrase)) failures.push(`Command Center schema missing required phrase: ${phrase}`);
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
    if (!schema.includes(index)) failures.push(`Command Center schema missing index: ${index}`);
  }

  for (const forbidden of [
    "NEXT_PUBLIC_DATABASE",
    "NEXT_PUBLIC_POSTGRES",
    "public report index",
    "unprotected webhook",
  ]) {
    if (schema.includes(forbidden)) failures.push(`Command Center schema contains forbidden phrase: ${forbidden}`);
  }
}

if (failures.length) {
  console.error("Command Center schema validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center schema validation passed. Database foundation covers users, businesses, contacts, intake, reports, projects, tasks, files, notes, monthly cycles, subscriptions, payments, activity events, audit logs, indexes, timestamps, and private-source-of-truth constraints.");

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
