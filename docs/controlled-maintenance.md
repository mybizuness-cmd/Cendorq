# Controlled Maintenance

Controlled maintenance is Cendorq's standard for keeping the platform current, validated, scalable, and protected without uncontrolled AI changes or automatic production mutation.

## Purpose

Maintenance may discover, classify, and queue updates, but production-impacting changes require validation, approval gates, rollback planning, and audit records. Automated checks must prefer evidence, deterministic validators, smoke coverage, primary-source references, and rollback readiness over opaque agent judgment.

## Review streams

Controlled maintenance covers:

- dependency review
- advisory monitoring
- validation registry checks
- smoke-test scheduling
- performance health checks
- schema drift checks
- route drift checks
- content and claim drift checks

Each stream must produce a bounded evidence summary, risk level, validation plan, approval gate, rollback plan, and audit reason before release.

## Safe update queue

The safe update queue may move through these states:

- discovered
- classified
- queued
- validated
- approved
- released
- rolled-back
- deferred

No queued update may mutate production automatically. Release requires validation, approval state, rollback plan, and audit record.

## Hard locks

Controlled maintenance must never allow:

- uncontrolled AI agents changing production code, content, customer records, billing state, support state, reports, or protection posture
- automatic breaking changes that bypass validation, approval, and rollback requirements
- maintenance output exposing raw or private operational material, internal operator material, protected configuration, cross-customer records, or sensitive context
- automated maintenance copy claiming absolute certainty, guaranteed results, or freedom from all responsibility
- silent removal of audit records required for accountability, correction history, access review, or incident reconstruction

## Release rules

Every maintenance release must pass `validate:routes` or identify an approved, audited exception. Every risky update requires a rollback plan before merge. Every customer-facing claim change must preserve truthful, verifiable, bounded language. Every protected route or API change must preserve closed-by-default access, customer ownership, verified access, and safe projection.

## Relationship to continuous evolution

Controlled continuous evolution defines how Cendorq improves after launch. Controlled maintenance defines the operating queue and review streams that keep those improvements safe, bounded, auditable, and release-gated.

## Documentation rule

When controlled maintenance contracts, validators, route-chain wiring, validation registry coverage, docs index coverage, owner manual guidance, or operator runbook guidance change, update this document and validator coverage in the same pull request.