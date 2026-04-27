-- Cendorq Command Center foundation schema
-- Target: Postgres-compatible durable storage, recommended Neon Postgres.
-- This migration defines the private operating-system backbone for Free Scan intake,
-- reports, projects, files, monthly control, payments, activity, and audit history.

create extension if not exists pgcrypto;

create table if not exists command_center_users (
  id uuid primary key default gen_random_uuid(),
  external_auth_id text unique,
  email text not null unique,
  display_name text not null default '',
  role text not null default 'owner' check (role in ('owner', 'admin', 'reviewer', 'operator', 'contractor', 'client_viewer')),
  status text not null default 'active' check (status in ('active', 'invited', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website_url text not null default '',
  website_hostname text not null default '',
  business_type text not null default '',
  country text not null default '',
  state_region text not null default '',
  city text not null default '',
  primary_offer text not null default '',
  audience text not null default '',
  status text not null default 'new' check (status in ('new', 'needs_review', 'in_progress', 'waiting_on_client', 'ready_to_send', 'sent', 'active', 'paused', 'completed', 'lost', 'archived')),
  current_plan text not null default 'free_scan' check (current_plan in ('free_scan', 'deep_review', 'build_fix', 'ongoing_control')),
  lifecycle_stage text not null default 'lead' check (lifecycle_stage in ('lead', 'qualified', 'customer', 'active_client', 'past_client', 'archived')),
  source text not null default 'free_check',
  owner_user_id uuid references command_center_users(id) on delete set null,
  last_activity_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists businesses_website_hostname_unique_idx on businesses (website_hostname) where website_hostname <> '';
create index if not exists businesses_status_idx on businesses (status);
create index if not exists businesses_current_plan_idx on businesses (current_plan);
create index if not exists businesses_last_activity_idx on businesses (last_activity_at desc nulls last);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text not null default '',
  title text not null default '',
  is_primary boolean not null default false,
  consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contacts_business_id_idx on contacts (business_id);
create index if not exists contacts_email_idx on contacts (email);

create table if not exists intake_submissions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  source text not null default 'free-check',
  duplicate_key text not null,
  last_submission_hash text not null,
  submission_count integer not null default 1 check (submission_count >= 1),
  payload jsonb not null default '{}'::jsonb,
  normalized_payload jsonb not null default '{}'::jsonb,
  risk_flags jsonb not null default '[]'::jsonb,
  signal_quality integer not null default 0 check (signal_quality between 0 and 100),
  routing_hint text not null default 'scan-only' check (routing_hint in ('scan-only', 'blueprint-candidate', 'infrastructure-review', 'command-review')),
  clarity_score integer not null default 0,
  intent_strength integer not null default 0,
  strongest_pressure text not null default 'mixed',
  score integer not null default 0 check (score between 0 and 100),
  score_tier text not null default 'low' check (score_tier in ('low', 'mid', 'high')),
  decision text not null default 'review' check (decision in ('reject', 'review', 'priority')),
  confidence_level text not null default 'low' check (confidence_level in ('low', 'medium', 'high')),
  data_depth_score integer not null default 0 check (data_depth_score between 0 and 100),
  score_modules jsonb not null default '{}'::jsonb,
  explanation_trace jsonb not null default '[]'::jsonb,
  report_snapshot jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists intake_submissions_duplicate_key_idx on intake_submissions (duplicate_key);
create index if not exists intake_submissions_business_id_idx on intake_submissions (business_id);
create index if not exists intake_submissions_submitted_at_idx on intake_submissions (submitted_at desc);
create index if not exists intake_submissions_decision_score_idx on intake_submissions (decision, score desc);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  intake_submission_id uuid references intake_submissions(id) on delete set null,
  report_type text not null check (report_type in ('free_scan', 'deep_review', 'build_fix', 'ongoing_control_monthly')),
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'in_review', 'ready_to_send', 'sent', 'archived')),
  summary text not null default '',
  snapshot jsonb not null default '{}'::jsonb,
  private_notes text not null default '',
  generated_at timestamptz,
  sent_at timestamptz,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reports_business_id_idx on reports (business_id);
create index if not exists reports_type_status_idx on reports (report_type, status);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  report_id uuid references reports(id) on delete set null,
  project_type text not null check (project_type in ('deep_review', 'build_fix', 'ongoing_control')),
  name text not null,
  status text not null default 'new' check (status in ('new', 'needs_review', 'in_progress', 'waiting_on_client', 'ready_to_send', 'sent', 'active', 'paused', 'completed', 'lost', 'archived')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  owner_user_id uuid references command_center_users(id) on delete set null,
  start_date date,
  target_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_business_id_idx on projects (business_id);
create index if not exists projects_status_priority_idx on projects (status, priority);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  title text not null,
  description text not null default '',
  status text not null default 'new' check (status in ('new', 'needs_review', 'in_progress', 'waiting_on_client', 'ready_to_send', 'sent', 'active', 'paused', 'completed', 'lost', 'archived')),
  task_type text not null default 'general',
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  assigned_user_id uuid references command_center_users(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_project_id_idx on tasks (project_id);
create index if not exists tasks_business_id_idx on tasks (business_id);
create index if not exists tasks_status_due_idx on tasks (status, due_at asc nulls last);

create table if not exists command_center_files (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  report_id uuid references reports(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  task_id uuid references tasks(id) on delete cascade,
  monthly_cycle_id uuid,
  storage_provider text not null default 'pending' check (storage_provider in ('pending', 'vercel_blob', 'cloudflare_r2')),
  storage_key text not null default '',
  file_name text not null,
  content_type text not null default 'application/octet-stream',
  byte_size bigint not null default 0 check (byte_size >= 0),
  file_kind text not null default 'general' check (file_kind in ('general', 'screenshot', 'pdf', 'report_export', 'brand_asset', 'evidence', 'before_after', 'client_upload')),
  visibility text not null default 'private' check (visibility in ('private', 'client_visible')),
  uploaded_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint command_center_files_owner_check check (
    business_id is not null or report_id is not null or project_id is not null or task_id is not null or monthly_cycle_id is not null
  )
);

create index if not exists command_center_files_business_id_idx on command_center_files (business_id);
create index if not exists command_center_files_report_id_idx on command_center_files (report_id);
create index if not exists command_center_files_project_id_idx on command_center_files (project_id);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  report_id uuid references reports(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  task_id uuid references tasks(id) on delete cascade,
  body text not null,
  note_type text not null default 'internal' check (note_type in ('internal', 'client_summary', 'risk', 'decision', 'follow_up')),
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_business_id_idx on notes (business_id);
create index if not exists notes_project_id_idx on notes (project_id);

create table if not exists monthly_cycles (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  cycle_month date not null,
  status text not null default 'new' check (status in ('new', 'needs_review', 'in_progress', 'waiting_on_client', 'ready_to_send', 'sent', 'active', 'paused', 'completed', 'lost', 'archived')),
  goals jsonb not null default '[]'::jsonb,
  completed_items jsonb not null default '[]'::jsonb,
  open_risks jsonb not null default '[]'::jsonb,
  next_recommendations jsonb not null default '[]'::jsonb,
  report_id uuid references reports(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, cycle_month)
);

create index if not exists monthly_cycles_business_month_idx on monthly_cycles (business_id, cycle_month desc);

alter table command_center_files
  drop constraint if exists command_center_files_monthly_cycle_id_fkey;

alter table command_center_files
  add constraint command_center_files_monthly_cycle_id_fkey
  foreign key (monthly_cycle_id) references monthly_cycles(id) on delete cascade;

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_customer_id text not null default '',
  provider_subscription_id text not null default '',
  plan_key text not null check (plan_key in ('deep_review', 'build_fix', 'ongoing_control')),
  status text not null default 'pending' check (status in ('pending', 'trialing', 'active', 'past_due', 'canceled', 'paused', 'incomplete')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists subscriptions_provider_subscription_unique_idx on subscriptions (provider, provider_subscription_id) where provider_subscription_id <> '';
create index if not exists subscriptions_business_id_idx on subscriptions (business_id);
create index if not exists subscriptions_status_idx on subscriptions (status);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_payment_id text not null default '',
  provider_invoice_id text not null default '',
  amount_cents integer not null default 0 check (amount_cents >= 0),
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded', 'canceled')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_business_id_idx on payments (business_id);
create index if not exists payments_status_created_idx on payments (status, created_at desc);

create table if not exists activity_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  intake_submission_id uuid references intake_submissions(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  task_id uuid references tasks(id) on delete set null,
  monthly_cycle_id uuid references monthly_cycles(id) on delete set null,
  event_type text not null,
  title text not null,
  body text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  actor_user_id uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists activity_events_business_created_idx on activity_events (business_id, created_at desc);
create index if not exists activity_events_event_type_idx on activity_events (event_type);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references command_center_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  business_id uuid references businesses(id) on delete set null,
  old_value jsonb not null default '{}'::jsonb,
  new_value jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id, created_at desc);
create index if not exists audit_logs_business_idx on audit_logs (business_id, created_at desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger command_center_users_set_updated_at before update on command_center_users for each row execute function set_updated_at();
create trigger businesses_set_updated_at before update on businesses for each row execute function set_updated_at();
create trigger contacts_set_updated_at before update on contacts for each row execute function set_updated_at();
create trigger intake_submissions_set_updated_at before update on intake_submissions for each row execute function set_updated_at();
create trigger reports_set_updated_at before update on reports for each row execute function set_updated_at();
create trigger projects_set_updated_at before update on projects for each row execute function set_updated_at();
create trigger tasks_set_updated_at before update on tasks for each row execute function set_updated_at();
create trigger command_center_files_set_updated_at before update on command_center_files for each row execute function set_updated_at();
create trigger notes_set_updated_at before update on notes for each row execute function set_updated_at();
create trigger monthly_cycles_set_updated_at before update on monthly_cycles for each row execute function set_updated_at();
create trigger subscriptions_set_updated_at before update on subscriptions for each row execute function set_updated_at();
create trigger payments_set_updated_at before update on payments for each row execute function set_updated_at();
