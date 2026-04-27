-- Cendorq Command Center delivery and automation foundation
-- Provider-neutral by design: Cendorq remains the source of truth.
-- Email platforms, CRM tools, Zapier, GoHighLevel, and webhook automations are optional channels.

create table if not exists integration_connections (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('email_service', 'crm', 'automation_platform', 'zapier', 'go_high_level', 'webhook', 'stripe', 'other')),
  name text not null,
  status text not null default 'planned' check (status in ('planned', 'active', 'paused', 'error', 'disabled')),
  connection_mode text not null default 'server_side_api' check (connection_mode in ('server_side_api', 'outbound_webhook', 'oauth', 'manual_export')),
  secret_env_name text not null default '',
  public_notes text not null default '',
  private_notes text not null default '',
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error_message text not null default '',
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists integration_connections_provider_status_idx on integration_connections (provider, status);

create table if not exists outbound_messages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  integration_connection_id uuid references integration_connections(id) on delete set null,
  message_type text not null check (message_type in ('report_delivery', 'follow_up', 'monthly_update', 'payment_notice', 'internal_notification', 'marketing_sequence')),
  channel text not null check (channel in ('email', 'crm', 'webhook', 'manual')),
  provider text not null default 'email_service',
  recipient_email text not null default '',
  subject text not null default '',
  body_preview text not null default '',
  status text not null default 'queued' check (status in ('draft', 'queued', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'canceled')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  provider_message_id text not null default '',
  provider_thread_id text not null default '',
  scheduled_for timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  failed_at timestamptz,
  failure_reason text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists outbound_messages_business_status_idx on outbound_messages (business_id, status);
create index if not exists outbound_messages_report_idx on outbound_messages (report_id);
create index if not exists outbound_messages_scheduled_idx on outbound_messages (status, scheduled_for asc nulls last);

create table if not exists report_deliveries (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references reports(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  outbound_message_id uuid references outbound_messages(id) on delete set null,
  delivery_channel text not null default 'email' check (delivery_channel in ('email', 'crm', 'webhook', 'manual')),
  status text not null default 'queued' check (status in ('queued', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'canceled')),
  sent_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  failure_reason text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists report_deliveries_report_id_idx on report_deliveries (report_id);
create index if not exists report_deliveries_business_status_idx on report_deliveries (business_id, status);

create table if not exists automation_events (
  id uuid primary key default gen_random_uuid(),
  integration_connection_id uuid references integration_connections(id) on delete set null,
  business_id uuid references businesses(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  task_id uuid references tasks(id) on delete set null,
  event_type text not null,
  direction text not null default 'outbound' check (direction in ('inbound', 'outbound')),
  status text not null default 'queued' check (status in ('queued', 'sent', 'received', 'processed', 'failed', 'ignored')),
  idempotency_key text not null default '',
  payload jsonb not null default '{}'::jsonb,
  response_payload jsonb not null default '{}'::jsonb,
  error_message text not null default '',
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists automation_events_idempotency_unique_idx on automation_events (idempotency_key) where idempotency_key <> '';
create index if not exists automation_events_business_created_idx on automation_events (business_id, created_at desc);
create index if not exists automation_events_status_idx on automation_events (status);

create trigger integration_connections_set_updated_at before update on integration_connections for each row execute function set_updated_at();
create trigger outbound_messages_set_updated_at before update on outbound_messages for each row execute function set_updated_at();
create trigger report_deliveries_set_updated_at before update on report_deliveries for each row execute function set_updated_at();
