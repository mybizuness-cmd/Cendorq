# Command Center Billing Readiness

This checklist protects the future billing and subscription layer before checkout, subscription sync, and payment status drive Command Center operations.

## Principle

Billing state can influence operations, but Cendorq must keep the operational source of truth internally.

The billing provider processes transactions. Cendorq owns plan state, lifecycle state, activity history, audit records, and operational follow-up.

## Required server-only configuration

Required server-only configuration:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Do not expose billing values in public output, client code, docs, logs, screenshots, readiness responses, or public APIs.

## Provider direction

Stripe is the expected first billing provider.

Keep the implementation server-side and traceable. Billing events should update protected internal records only after verification.

## Required capabilities

Before billing is wired, the system must support:

- server-side checkout creation
- webhook signature verification
- subscription status sync
- payment status sync
- failure-state tracking
- audit trail

## Before wiring billing

Confirm:

- `subscriptions` exists
- `payments` exists
- `businesses` exists
- `activity_events` exists
- `audit_logs` exists
- access control foundation exists
- production smoke still protects private routes
- readiness endpoint remains protected

## After wiring billing

Confirm:

- public pages never expose billing secrets
- checkout creation is server-side
- webhook events are verified before processing
- failed billing creates internal operational signals
- canceled or past-due subscriptions update private lifecycle state
- audit records are created for important billing changes
- no payment state is trusted from client-only data

## Non-negotiables

- No public billing secrets.
- No unverified billing webhooks.
- No client-only subscription authority.
- No public payment records.
- No direct public billing dashboards.
- No weakening validation to make billing pass.
