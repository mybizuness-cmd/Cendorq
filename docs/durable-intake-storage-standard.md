# Durable Intake Storage Standard

This standard protects Free Scan submissions from being treated as durable business records before a real persistence layer exists.

## Current posture

The Free Scan API currently has a protected production boundary and an early runtime file-backed envelope.

That bridge is useful for local development and early verification, but it is not the final durable customer-data system.

## Non-negotiable requirement

Before Cendorq depends on Free Scan submissions as durable business records, the intake backend must use a real persistence layer outside local runtime files.

The durable layer must preserve:

- strict Free Scan validation
- duplicate detection
- score and signal computation
- report snapshot generation
- protected admin reads
- no-store API responses
- production smoke behavior
- no fake smoke submissions
- private/public boundary separation
- server-only secrets
- predictable rollback behavior

## Allowed durable targets

Use a production-grade storage target such as:

- managed Postgres
- managed Redis/KV with persistence guarantees
- managed document storage
- a private CRM or intake system with authenticated server-side API access

Do not use browser storage, public sheets, public forms, public issue trackers, or unprotected webhooks as the final source of record.

## Server-only configuration rule

Durable storage credentials must be server-only environment variables.

They must not use `NEXT_PUBLIC_` prefixes and must never be committed.

## Public API rule

Public `POST /api/free-check` may accept validated intake submissions.

Public `GET /api/free-check` must stay closed in production unless the configured admin header is present.

Public routes must not expose raw submissions, private report indexes, evidence, score internals, customer history, or internal notes.

## Smoke rule

Production smoke may verify:

- public buyer routes
- discovery and trust files
- strict legacy redirects
- `/api/health`
- `OPTIONS /api/free-check`
- protected unauthenticated `GET /api/free-check`

Production smoke must not create fake Free Scan submissions.

## Migration rule

When the durable storage provider is implemented, migrate through a PR that includes:

1. storage adapter code
2. environment example updates with placeholders only
3. validation guard updates
4. documentation updates
5. CI passing route validation, lint, typecheck, and build
6. production smoke after deployment

Do not remove the protected read boundary to make migration easier.

## Completion definition

Durable intake storage is complete only when:

- accepted submissions are written to the durable provider
- protected reads can load from the durable provider
- duplicate detection still works
- report snapshots still build from stored entries
- local development still works without production secrets
- production smoke still passes
- no secrets are committed
