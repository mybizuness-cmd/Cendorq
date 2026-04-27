-- Cendorq Command Center private signal intelligence foundation
-- This layer turns intake, reports, projects, delivery, and outcomes into classified private knowledge.
-- It must never expose raw intelligence, customer evidence, prompts, scoring internals, or learning memory publicly.

create table if not exists signal_taxonomies (
  id uuid primary key default gen_random_uuid(),
  taxonomy_key text not null unique,
  name text not null,
  description text not null default '',
  status text not null default 'active' check (status in ('active', 'paused', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists signal_tags (
  id uuid primary key default gen_random_uuid(),
  taxonomy_id uuid not null references signal_taxonomies(id) on delete cascade,
  tag_key text not null,
  label text not null,
  description text not null default '',
  weight integer not null default 0,
  status text not null default 'active' check (status in ('active', 'paused', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (taxonomy_id, tag_key)
);

create index if not exists signal_tags_taxonomy_status_idx on signal_tags (taxonomy_id, status);

create table if not exists intelligence_classifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  intake_submission_id uuid references intake_submissions(id) on delete cascade,
  report_id uuid references reports(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  task_id uuid references tasks(id) on delete cascade,
  tag_id uuid references signal_tags(id) on delete set null,
  classification_type text not null check (classification_type in ('weakness', 'strength', 'risk', 'opportunity', 'buyer_hesitation', 'conversion_blocker', 'authority_signal', 'content_gap', 'trust_gap', 'technical_gap', 'market_pattern')),
  label text not null,
  summary text not null default '',
  evidence_excerpt text not null default '',
  confidence integer not null default 0 check (confidence between 0 and 100),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  visibility text not null default 'private' check (visibility in ('private', 'client_safe_summary')),
  source_type text not null default 'system' check (source_type in ('system', 'human_review', 'automation', 'client_input')),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint intelligence_classifications_anchor_check check (
    business_id is not null or intake_submission_id is not null or report_id is not null or project_id is not null or task_id is not null
  )
);

create index if not exists intelligence_classifications_business_idx on intelligence_classifications (business_id, created_at desc);
create index if not exists intelligence_classifications_type_confidence_idx on intelligence_classifications (classification_type, confidence desc);
create index if not exists intelligence_classifications_severity_idx on intelligence_classifications (severity);

create table if not exists evidence_records (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  intake_submission_id uuid references intake_submissions(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  file_id uuid references command_center_files(id) on delete set null,
  evidence_type text not null check (evidence_type in ('website_copy', 'screenshot', 'search_result', 'ai_answer', 'competitor_reference', 'client_note', 'performance_metric', 'manual_observation')),
  title text not null,
  summary text not null default '',
  source_url text not null default '',
  captured_value jsonb not null default '{}'::jsonb,
  reliability text not null default 'unverified' check (reliability in ('unverified', 'reviewed', 'verified', 'deprecated')),
  captured_at timestamptz not null default now(),
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists evidence_records_business_idx on evidence_records (business_id, captured_at desc);
create index if not exists evidence_records_type_reliability_idx on evidence_records (evidence_type, reliability);

create table if not exists intelligence_memory_items (
  id uuid primary key default gen_random_uuid(),
  memory_key text not null unique,
  title text not null,
  summary text not null,
  pattern_type text not null check (pattern_type in ('buyer_hesitation', 'industry_pattern', 'conversion_pattern', 'trust_pattern', 'authority_pattern', 'technical_pattern', 'pricing_pattern', 'delivery_pattern')),
  confidence integer not null default 0 check (confidence between 0 and 100),
  support_count integer not null default 0 check (support_count >= 0),
  status text not null default 'candidate' check (status in ('candidate', 'active', 'watch', 'deprecated')),
  private_notes text not null default '',
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists intelligence_memory_items_type_status_idx on intelligence_memory_items (pattern_type, status);
create index if not exists intelligence_memory_items_confidence_idx on intelligence_memory_items (confidence desc);

create table if not exists intelligence_memory_links (
  id uuid primary key default gen_random_uuid(),
  memory_item_id uuid not null references intelligence_memory_items(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  intake_submission_id uuid references intake_submissions(id) on delete cascade,
  report_id uuid references reports(id) on delete cascade,
  evidence_record_id uuid references evidence_records(id) on delete cascade,
  classification_id uuid references intelligence_classifications(id) on delete cascade,
  support_strength integer not null default 0 check (support_strength between 0 and 100),
  created_at timestamptz not null default now(),
  constraint intelligence_memory_links_anchor_check check (
    business_id is not null or intake_submission_id is not null or report_id is not null or evidence_record_id is not null or classification_id is not null
  )
);

create index if not exists intelligence_memory_links_memory_idx on intelligence_memory_links (memory_item_id);
create index if not exists intelligence_memory_links_business_idx on intelligence_memory_links (business_id);

create table if not exists outcome_measurements (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  monthly_cycle_id uuid references monthly_cycles(id) on delete set null,
  metric_key text not null,
  metric_label text not null,
  before_value numeric,
  after_value numeric,
  text_value text not null default '',
  measurement_unit text not null default '',
  confidence integer not null default 0 check (confidence between 0 and 100),
  measured_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references command_center_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists outcome_measurements_business_metric_idx on outcome_measurements (business_id, metric_key, measured_at desc);
create index if not exists outcome_measurements_project_idx on outcome_measurements (project_id);

create trigger signal_taxonomies_set_updated_at before update on signal_taxonomies for each row execute function set_updated_at();
create trigger signal_tags_set_updated_at before update on signal_tags for each row execute function set_updated_at();
create trigger intelligence_classifications_set_updated_at before update on intelligence_classifications for each row execute function set_updated_at();
create trigger evidence_records_set_updated_at before update on evidence_records for each row execute function set_updated_at();
create trigger intelligence_memory_items_set_updated_at before update on intelligence_memory_items for each row execute function set_updated_at();
create trigger outcome_measurements_set_updated_at before update on outcome_measurements for each row execute function set_updated_at();
