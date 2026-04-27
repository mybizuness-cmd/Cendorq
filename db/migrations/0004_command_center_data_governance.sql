-- Cendorq Command Center data governance and operational safety foundation
-- Protects consent, privacy requests, retention, backups, exports, webhook security, incidents, and system checks.
-- Cendorq remains the source of truth; governance records stay private by default.

create table if not exists consent_records (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  intake_submission_id uuid references intake_submissions(id) on delete set null,
  consent_type text not null check (consent_type in ('free_scan_submission', 'report_delivery', 'marketing_email', 'service_updates', 'terms_acceptance', 'privacy_acceptance')),
  status text not null default 'granted' check (status in ('granted', 'revoked', 'expired', 'unknown')),
  source text not null default 'system',
  proof_payload jsonb not null default '{}'::jsonb,
  captured_ip_hash text not null default '',
  captured_user_agent text not null default '',
  captured_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint consent_records_anchor_check check (business_id is not null or contact_id is not null or intake_submission_id is not null)
);

create index if not exists consent_records_contact_type_idx on consent_records (contact_id, consent_type, status);
create index if not exists consent_records_business_type_idx on consent_records (business_id, consent_type, status);

create table if not exists privacy_requests (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  request_type text not null check (request_type in ('access', 'correction', 'deletion', 'export', 'restriction', 'opt_out')),
  status text not null default 'received' check (status in ('received', 'verifying', 'in_progress', 'completed', 'denied', 'canceled')),
  requester_email text not null default '',
  verification_status text not null default 'pending' check (verification_status in ('pending', 'verified', 'failed', 'not_required')),
  request_summary text not null default '',
  resolution_summary text not null default '',
  due_at timestamptz,
  completed_at timestamptz,
  handled_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists privacy_requests_status_due_idx on privacy_requests (status, due_at asc nulls last);
create index if not exists privacy_requests_contact_idx on privacy_requests (contact_id, created_at desc);

create table if not exists data_retention_policies (
  id uuid primary key default gen_random_uuid(),
  policy_key text not null unique,
  entity_type text not null,
  retention_days integer not null check (retention_days > 0),
  action text not null default 'review' check (action in ('review', 'archive', 'delete', 'anonymize')),
  status text not null default 'active' check (status in ('active', 'paused', 'deprecated')),
  description text not null default '',
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists data_retention_policies_entity_status_idx on data_retention_policies (entity_type, status);

create table if not exists data_retention_actions (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid references data_retention_policies(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  business_id uuid references businesses(id) on delete set null,
  action text not null check (action in ('review', 'archive', 'delete', 'anonymize')),
  status text not null default 'queued' check (status in ('queued', 'in_progress', 'completed', 'failed', 'skipped')),
  reason text not null default '',
  scheduled_for timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists data_retention_actions_status_schedule_idx on data_retention_actions (status, scheduled_for asc nulls last);
create index if not exists data_retention_actions_entity_idx on data_retention_actions (entity_type, entity_id);

create table if not exists backup_exports (
  id uuid primary key default gen_random_uuid(),
  export_type text not null check (export_type in ('database_backup', 'client_export', 'report_export', 'audit_export', 'privacy_export', 'migration_snapshot')),
  status text not null default 'queued' check (status in ('queued', 'running', 'completed', 'failed', 'expired')),
  storage_provider text not null default 'pending' check (storage_provider in ('pending', 'vercel_blob', 'cloudflare_r2', 'database_provider', 'manual')),
  storage_key text not null default '',
  checksum_sha256 text not null default '',
  byte_size bigint not null default 0 check (byte_size >= 0),
  requested_by uuid references command_center_users(id) on delete set null,
  business_id uuid references businesses(id) on delete set null,
  expires_at timestamptz,
  completed_at timestamptz,
  failure_reason text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists backup_exports_type_status_idx on backup_exports (export_type, status);
create index if not exists backup_exports_business_idx on backup_exports (business_id, created_at desc);

create table if not exists webhook_security_keys (
  id uuid primary key default gen_random_uuid(),
  integration_connection_id uuid references integration_connections(id) on delete cascade,
  key_label text not null,
  secret_env_name text not null,
  status text not null default 'active' check (status in ('active', 'rotating', 'revoked', 'expired')),
  last_used_at timestamptz,
  rotation_due_at timestamptz,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (integration_connection_id, key_label)
);

create index if not exists webhook_security_keys_status_rotation_idx on webhook_security_keys (status, rotation_due_at asc nulls last);

create table if not exists incident_records (
  id uuid primary key default gen_random_uuid(),
  incident_type text not null check (incident_type in ('production_smoke_failure', 'delivery_failure', 'data_integrity', 'security', 'payment_sync', 'automation_failure', 'database', 'other')),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null default 'open' check (status in ('open', 'investigating', 'mitigated', 'resolved', 'closed')),
  title text not null,
  summary text not null default '',
  impact_summary text not null default '',
  root_cause text not null default '',
  resolution_summary text not null default '',
  business_id uuid references businesses(id) on delete set null,
  owner_user_id uuid references command_center_users(id) on delete set null,
  detected_at timestamptz not null default now(),
  resolved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists incident_records_status_severity_idx on incident_records (status, severity, detected_at desc);
create index if not exists incident_records_business_idx on incident_records (business_id, detected_at desc);

create table if not exists system_checks (
  id uuid primary key default gen_random_uuid(),
  check_key text not null,
  check_type text not null check (check_type in ('smoke', 'database', 'integration', 'delivery', 'security', 'backup', 'automation')),
  status text not null default 'unknown' check (status in ('unknown', 'passing', 'warning', 'failing')),
  summary text not null default '',
  last_checked_at timestamptz,
  next_check_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (check_key)
);

create index if not exists system_checks_status_next_idx on system_checks (status, next_check_at asc nulls last);

create trigger consent_records_set_updated_at before update on consent_records for each row execute function set_updated_at();
create trigger privacy_requests_set_updated_at before update on privacy_requests for each row execute function set_updated_at();
create trigger data_retention_policies_set_updated_at before update on data_retention_policies for each row execute function set_updated_at();
create trigger data_retention_actions_set_updated_at before update on data_retention_actions for each row execute function set_updated_at();
create trigger backup_exports_set_updated_at before update on backup_exports for each row execute function set_updated_at();
create trigger webhook_security_keys_set_updated_at before update on webhook_security_keys for each row execute function set_updated_at();
create trigger incident_records_set_updated_at before update on incident_records for each row execute function set_updated_at();
create trigger system_checks_set_updated_at before update on system_checks for each row execute function set_updated_at();
