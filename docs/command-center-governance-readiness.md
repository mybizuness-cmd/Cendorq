# Command Center Governance Readiness

This checklist protects consent, privacy requests, retention, backups, incidents, and system checks before live operational records are managed in the Command Center.

## Principle

Governance is not an afterthought. It protects trust, recovery, data quality, and operational discipline.

The Command Center must track governance privately without exposing customer records, private evidence, file contents, or internal operating details publicly.

## Required server-only configuration

Required server-only configuration:

- `GOVERNANCE_CONTACT_EMAIL`

Do not expose private governance values in public output, client code, logs, screenshots, readiness responses, or public APIs.

## Required capabilities

Before governance workflows are enabled, the system must support:

- consent tracking
- privacy request handling
- retention review
- backup export tracking
- incident recording
- system check visibility
- audit trail

## Before wiring governance workflows

Confirm:

- `consent_records` exists
- `privacy_requests` exists
- `data_retention_policies` exists
- `data_retention_actions` exists
- `backup_exports` exists
- `incident_records` exists
- `system_checks` exists
- access control foundation exists
- readiness endpoint remains protected

## After wiring governance workflows

Confirm:

- privacy requests are visible only to authorized users
- retention actions are reviewed before destructive action
- backup exports are traceable
- incidents create actionable records
- system checks are operator-visible
- governance activity is audit-tracked

## Non-negotiables

- No public governance records.
- No public backup exports.
- No client-only privacy request authority.
- No silent retention deletion.
- No governance values in public APIs.
- No weakening validation to make governance pass.
