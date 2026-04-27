# Command Center Delivery Readiness

This checklist protects future report delivery, email follow-up, CRM sync, webhook channels, and automation handoff before live sends are enabled.

## Principle

Cendorq remains the source of truth. Delivery tools are channels, not the core system.

Email services, CRM tools, GoHighLevel, Zapier, webhook systems, and automation platforms must remain swappable.

## Required server-only configuration

Required server-only configuration:

- `REPORT_DELIVERY_PROVIDER`
- `REPORT_DELIVERY_SERVER_TOKEN`

Do not expose delivery values in public output, client code, docs, logs, screenshots, readiness responses, or public APIs.

## Provider direction

Acceptable delivery channels:

- email service
- CRM
- automation platform
- webhook

Use the channel that best fits the operation, but keep Cendorq as the internal system of record.

## Required capabilities

Before live report delivery is enabled, the system must support:

- provider-neutral delivery channel
- server-side delivery authorization
- report delivery status tracking
- message failure tracking
- provider reference storage without secret values
- audit trail

## Before wiring delivery

Confirm:

- `integration_connections` exists
- `outbound_messages` exists
- `report_deliveries` exists
- `automation_events` exists
- access control foundation exists
- readiness endpoint remains protected
- production smoke still protects private routes

## After wiring delivery

Confirm:

- reports are sent only through server-side actions
- outbound messages are recorded internally
- delivery failures create actionable records
- provider references are stored without private values
- CRM or automation sync cannot overwrite Cendorq source-of-truth records
- customer-facing delivery does not expose internal scoring or evidence details

## Non-negotiables

- No vendor lock-in as the source of truth.
- No public delivery tokens.
- No client-only send authority.
- No fake report delivery records to make tests pass.
- No public report delivery logs.
- No weakening validation to make delivery pass.
