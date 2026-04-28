# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, or customer data.

## Core standards

- `docs/maximum-protection-standard.md` — highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard.
- `docs/command-center-operator-runbook.md` — cockpit maintenance workflow for closed-by-default, metadata-only, server-rendered, registry-covered Command Center panels.

## Required source-of-truth areas

- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Readiness summary: `src/lib/command-center/readiness-summary.ts`
- Database readiness: `src/lib/command-center/database-readiness.ts`
- Auth readiness: `src/lib/command-center/auth-readiness.ts`
- File storage readiness: `src/lib/command-center/file-storage-readiness.ts`
- Billing readiness: `src/lib/command-center/billing-readiness.ts`
- Delivery readiness: `src/lib/command-center/delivery-readiness.ts`
- Automation readiness: `src/lib/command-center/automation-readiness.ts`
- Governance readiness: `src/lib/command-center/governance-readiness.ts`
- Intelligence readiness: `src/lib/command-center/intelligence-readiness.ts`

## Required cockpit validators

These validators must stay wired into `validate:routes`:

- `src/scripts/validate-command-center-security-posture.mjs`
- `src/scripts/validate-command-center-panel-registry.mjs`
- `src/scripts/validate-command-center-panel-safety.mjs`
- `src/scripts/validate-command-center-operator-runbook.mjs`
- `src/scripts/validate-production-smoke-coverage.mjs`

## Maintenance rule

When a new private cockpit panel, source-of-truth module, or validator is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, or scoring weights.
