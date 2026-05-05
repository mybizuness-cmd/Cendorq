# Controlled Maintenance

Controlled maintenance is Cendorq's standard for keeping the platform current, secure, validated, and scalable without uncontrolled AI changes or automatic production mutation.

## Purpose

Controlled maintenance keeps updates planned, reviewed, tested, reversible, and audit-ready. Maintenance can discover, classify, and queue improvements, but production-impacting changes require validation gates, approval gates, rollback planning, and audit records before release.

## Review streams

Controlled maintenance covers:

- dependency review
- security advisory monitoring
- validation registry checks
- smoke-test scheduling
- performance health checks
- schema drift checks
- route drift checks
- content and claim drift checks

Each stream must produce a bounded evidence summary, risk level, validation plan, approval gate, rollback plan, and audit reason before release.

## Safe update queue

The safe update queue may move through discovered, classified, queued, validated, approved, released, rolled-back, or deferred states.

No queued update may change production automatically. No queued update may mutate production automatically. Release requires validation, approval state, rollback plan, and audit record.

## Hard locks

Controlled maintenance must never allow uncontrolled agent changes, validation bypass, approval bypass, rollback bypass, sensitive operational exposure, unsupported outcome claims, or silent audit removal.

## Release rules

Every maintenance release must pass validation or identify an approved, audited exception. Every risky update needs a rollback plan before merge. Customer-facing claim changes must stay truthful, verifiable, and bounded. Protected route and API changes must preserve closed-by-default access, customer ownership, verified access, and safe projection.

## Relationship to continuous evolution

Controlled continuous evolution defines how Cendorq improves after launch. Controlled maintenance defines the operating queue and review streams that keep those improvements safe, bounded, auditable, and release-gated.

## Documentation rule

When controlled maintenance contracts, validators, route-chain wiring, validation registry coverage, docs index coverage, owner manual guidance, or operator runbook guidance change, update this document and validator coverage in the same pull request.