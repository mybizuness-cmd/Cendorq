# Command Center Automation Readiness

This checklist protects future scheduled jobs, webhook handling, provider handoffs, follow-up workflows, report delivery automation, and monthly control automation.

## Principle

Automation should only run after the data model, access control, audit trail, and manual operating path are reliable.

Automation must be observable, retry-safe, idempotent, and closed by default.

## Required server-only configuration

Required server-only configuration:

- `AUTOMATION_SIGNING_SECRET`

Do not expose automation values in public output, client code, docs, logs, screenshots, readiness responses, or public APIs.

## Required capabilities

Before live automation is enabled, the system must support:

- server-side execution only
- idempotency keys
- signed inbound events
- retry-safe processing
- failure recording
- operator visibility
- audit trail

## Before wiring automation

Confirm:

- `automation_events` exists
- `integration_connections` exists
- `webhook_security_keys` exists
- `service_access_records` exists
- `system_checks` exists
- `incident_records` exists
- access control foundation exists
- delivery readiness is protected
- readiness endpoint remains protected

## After wiring automation

Confirm:

- every automation action creates a traceable record
- retrying an event cannot duplicate destructive work
- inbound events are verified before processing
- failed automation creates an actionable failure record
- automation cannot overwrite source-of-truth records without server-side validation
- operator-visible status exists for scheduled and event-driven work

## Non-negotiables

- No public automation secrets.
- No client-only automation authority.
- No unverified inbound events.
- No untracked automated record changes.
- No silent automation failures.
- No provider automation as the source of truth.
- No weakening validation to make automation pass.
