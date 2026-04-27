# Command Center Implementation Plan

This plan defines the safest build order for turning the protected Command Center foundation into a live internal operating dashboard.

## Principle

Build source of truth first, then access, then read-only visibility, then controlled operations, then automation.

Do not wire live customer data into public surfaces. Do not skip access control. Do not let provider tools become the source of truth.

## Phase 1: Production database connection

Goal: connect the app to a durable Postgres database without exposing data.

Required work:

- Choose the managed Postgres provider.
- Configure server-only database environment values.
- Add a server-only database client.
- Add a migration application command or documented provider-console flow.
- Apply migrations intentionally, not as a page-load side effect.
- Add a safe database health check that does not expose table contents.

Exit criteria:

- migrations are applied in order
- no public database reads exist
- migration safety validation passes
- readiness status can detect database configuration without exposing values

## Phase 2: Private authentication and authorization

Goal: protect Command Center routes with real identity and roles.

Required work:

- Configure the private auth provider.
- Map authenticated users into `command_center_users`.
- Enforce role permissions from `role_permission_grants`.
- Record access decisions in `access_events`.
- Keep the preview-header gate as a temporary bootstrap only until auth is ready.

Exit criteria:

- unauthenticated users cannot view private modules
- unauthorized users cannot view restricted modules
- access decisions are recorded
- no module relies on client-only access checks

## Phase 3: Read-only Command Home

Goal: show safe internal summary data after auth is active.

Required work:

- Display counts for intake, clients, reports, projects, tasks, and incidents.
- Display readiness summary from protected server helpers.
- Display system checks without exposing sensitive values.
- Keep all data server-rendered behind access control.

Exit criteria:

- Command Home shows useful private summary data
- no raw evidence, report body, file content, or private intelligence appears without deeper permission
- route remains noindex and nofollow

## Phase 4: Intake Inbox

Goal: move Free Scan submissions from file-style storage toward durable intake records.

Required work:

- Create database write path for new Free Scan submissions.
- Preserve duplicate handling, scoring, tiers, and protected read behavior.
- Add read-only intake inbox for authorized users.
- Add audit and activity events for intake status changes.

Exit criteria:

- new submissions can be recorded durably
- production unauthenticated intake reads remain blocked
- inbox works only behind Command Center access

## Phase 5: Clients and Reports

Goal: manage client profiles and report workflow from the private dashboard.

Required work:

- Build client list and detail pages.
- Build report list and status pages.
- Link reports to businesses, intakes, files, evidence, and deliveries.
- Keep report bodies and evidence permission-gated.

Exit criteria:

- clients and reports are operationally traceable
- report delivery state is tracked internally
- no public report index exists

## Phase 6: Projects, Tasks, and Ongoing Control

Goal: run paid work through structured internal workflows.

Required work:

- Build project list and project detail pages.
- Add task management.
- Add monthly cycle views for Ongoing Control.
- Track outcomes and activity events.

Exit criteria:

- Deep Review, Build Fix, and Ongoing Control work can be operated privately
- monthly cycles have goals, completed work, risks, and recommendations
- operational history is traceable

## Phase 7: File Vault

Goal: handle private files safely.

Required work:

- Choose object storage provider.
- Add server-only upload flow.
- Link files to business, report, project, task, or monthly cycle records.
- Keep file access signed, permission-checked, and private by default.

Exit criteria:

- files have owners
- file metadata is stored in the database
- private file contents are not public

## Phase 8: Payments and Subscriptions

Goal: sync billing with operations.

Required work:

- Configure Stripe server-side credentials.
- Add webhook verification.
- Sync customers, subscriptions, payments, and failure states.
- Connect payment status to internal business lifecycle and activity events.

Exit criteria:

- payment state is traceable
- failed or canceled billing creates operational signals
- no payment secrets or raw webhook details are exposed publicly

## Phase 9: Report delivery and integrations

Goal: send reports and follow-ups without vendor lock-in.

Required work:

- Choose delivery provider or automation channel.
- Keep integration provider-neutral.
- Track outbound messages and report deliveries.
- Store provider references, not secret values.
- Keep GoHighLevel, Zapier, CRM tools, and email tools as swappable channels.

Exit criteria:

- report delivery status is visible internally
- failures create actionable records
- Cendorq remains the source of truth

## Phase 10: Intelligence and outcomes

Goal: turn accumulated data into private operational leverage.

Required work:

- Add classification workflows for weaknesses, opportunities, risks, buyer hesitations, authority signals, and conversion blockers.
- Link classifications to evidence and outcomes.
- Promote learning memory carefully.
- Keep intelligence private by default.

Exit criteria:

- patterns can be reviewed and reused
- evidence supports intelligence
- outcome measurements improve future recommendations

## Phase 11: Automation

Goal: automate only after the data model and manual controls are reliable.

Required work:

- Add scheduled jobs or automation worker.
- Use idempotency for automation events.
- Record every automation action.
- Add failure records and incident signals.

Exit criteria:

- automation is observable
- automation can be retried safely
- automation failures do not corrupt source-of-truth records

## Non-negotiables

- Source of truth stays in Cendorq.
- Public routes stay buyer-facing.
- Private routes stay closed by default.
- No validation downgrade to make work pass.
- No destructive migrations without a recovery plan.
- No provider lock-in for delivery or automation.
- No secrets, private values, or customer records in public output.
- Every major layer passes CI before merge.
