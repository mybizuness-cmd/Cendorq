-- Cendorq Command Center access control foundation
-- Protects private dashboard authorization, invitations, session/security events, and server-side integration access metadata.
-- Identity can be verified by Clerk or another auth provider, while Cendorq keeps authorization state and audit records internally.
-- This schema stores access metadata only. It must not store raw credentials, invite tokens, API keys, or private secrets.

create table if not exists role_permission_grants (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('owner', 'admin', 'reviewer', 'operator', 'contractor', 'client_viewer')),
  permission_key text not null,
  description text not null default '',
  status text not null default 'active' check (status in ('active', 'paused', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role, permission_key)
);

create index if not exists role_permission_grants_role_status_idx on role_permission_grants (role, status);

create table if not exists user_permission_overrides (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references command_center_users(id) on delete cascade,
  permission_key text not null,
  effect text not null check (effect in ('allow', 'deny')),
  reason text not null default '',
  expires_at timestamptz,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, permission_key)
);

create index if not exists user_permission_overrides_user_effect_idx on user_permission_overrides (user_id, effect);

create table if not exists command_center_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null check (role in ('owner', 'admin', 'reviewer', 'operator', 'contractor', 'client_viewer')),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'expired', 'revoked')),
  invite_reference text not null default '',
  invited_by uuid references command_center_users(id) on delete set null,
  accepted_by uuid references command_center_users(id) on delete set null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists command_center_invitations_email_status_idx on command_center_invitations (email, status);
create index if not exists command_center_invitations_expires_idx on command_center_invitations (expires_at asc);

create table if not exists command_center_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references command_center_users(id) on delete cascade,
  external_session_reference text not null default '',
  status text not null default 'active' check (status in ('active', 'revoked', 'expired')),
  ip_fingerprint text not null default '',
  user_agent text not null default '',
  last_seen_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists command_center_sessions_user_status_idx on command_center_sessions (user_id, status);
create index if not exists command_center_sessions_last_seen_idx on command_center_sessions (last_seen_at desc nulls last);

create table if not exists access_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references command_center_users(id) on delete set null,
  session_id uuid references command_center_sessions(id) on delete set null,
  event_type text not null check (event_type in ('login', 'logout', 'invite_sent', 'invite_accepted', 'permission_granted', 'permission_denied', 'role_changed', 'session_revoked', 'service_access_used', 'service_access_denied')),
  resource_type text not null default '',
  resource_id uuid,
  permission_key text not null default '',
  ip_fingerprint text not null default '',
  user_agent text not null default '',
  decision text not null default 'allow' check (decision in ('allow', 'deny', 'observe')),
  reason text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists access_events_user_created_idx on access_events (user_id, created_at desc);
create index if not exists access_events_type_decision_idx on access_events (event_type, decision, created_at desc);

create table if not exists service_access_records (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  status text not null default 'active' check (status in ('active', 'rotating', 'revoked', 'expired')),
  scope text not null default 'integration' check (scope in ('integration', 'automation', 'webhook', 'migration', 'report_delivery')),
  secret_env_name text not null default '',
  last_used_at timestamptz,
  rotation_due_at timestamptz,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_access_records_status_rotation_idx on service_access_records (status, rotation_due_at asc nulls last);

create table if not exists access_policy_checks (
  id uuid primary key default gen_random_uuid(),
  policy_key text not null unique,
  description text not null default '',
  status text not null default 'passing' check (status in ('passing', 'warning', 'failing', 'disabled')),
  last_checked_at timestamptz,
  failure_summary text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists access_policy_checks_status_idx on access_policy_checks (status);

create trigger role_permission_grants_set_updated_at before update on role_permission_grants for each row execute function set_updated_at();
create trigger user_permission_overrides_set_updated_at before update on user_permission_overrides for each row execute function set_updated_at();
create trigger command_center_invitations_set_updated_at before update on command_center_invitations for each row execute function set_updated_at();
create trigger command_center_sessions_set_updated_at before update on command_center_sessions for each row execute function set_updated_at();
create trigger service_access_records_set_updated_at before update on service_access_records for each row execute function set_updated_at();
create trigger access_policy_checks_set_updated_at before update on access_policy_checks for each row execute function set_updated_at();
