# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, or customer data.

## Core standards

- `docs/maximum-protection-standard.md` — highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard.
- `docs/command-center-operator-runbook.md` — cockpit maintenance workflow for closed-by-default, metadata-only, server-rendered, registry-covered Command Center panels.

## Required source-of-truth areas

- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Validation registry: `src/lib/command-center/validation-registry.ts`
- Report truth engine: `src/lib/command-center/report-truth-engine.ts`
- Report growth system: `src/lib/command-center/report-growth-system.ts`
- Controlled market learning: `src/lib/command-center/controlled-market-learning.ts`
- Enterprise operating standard: `src/lib/command-center/enterprise-operating-standard.ts`
- Audit defense system: `src/lib/command-center/audit-defense-system.ts`
- Most-pristine system standard: `src/lib/command-center/most-pristine-system-standard.ts`
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
- `src/scripts/validate-command-center-validation-registry.mjs`
- `src/scripts/validate-report-truth-engine.mjs`
- `src/scripts/validate-controlled-market-learning.mjs`
- `src/scripts/validate-enterprise-operating-standard.mjs`
- `src/scripts/validate-audit-defense-system.mjs`
- `src/scripts/validate-most-pristine-system-standard.mjs`
- `src/scripts/validate-command-center-operator-runbook.mjs`
- `src/scripts/validate-command-center-docs-index.mjs`
- `src/scripts/validate-production-smoke-coverage.mjs`

## Maintenance rule

When a new private cockpit panel, source-of-truth module, or validator is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, or non-public quality-review details.
